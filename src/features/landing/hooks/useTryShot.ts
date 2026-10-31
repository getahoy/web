import { useState } from "react";
import type { VoiceClip } from "../copy/demoVoiceCopy";
import { landingCopy } from "../copy/landingCopy";
import type { ListenOutcome } from "../listening/demoListener";
import { listeningMisses } from "../listening/listeningMisses";
import { matchScene } from "../listening/matchSpoken";
import type { ShotScene } from "../motion/shotTimeline";
import { useDemoListening } from "./useDemoListening";
import { useVoiceClips } from "./useVoiceClips";

const sceneClips: Record<ShotScene, VoiceClip> = {
  pause: "paused",
  note: "newNote",
  draft: "drafted",
};

type PlayHeard = (scene: ShotScene, transcript: string) => number;

export function useTryShot(playHeard: PlayHeard) {
  const listening = useDemoListening();
  const voice = useVoiceClips();
  const [message, setMessage] = useState<string | null>(null);

  const settle = (outcome: ListenOutcome) => {
    if (outcome.kind !== "heard") {
      const miss = listeningMisses[outcome.kind];
      setMessage(miss.message);
      void voice.play(miss.clip);
      return;
    }
    const scene = matchScene(outcome.transcript);
    if (!scene) {
      setMessage(landingCopy["try.noMatch"]);
      void voice.play("noMatch");
      return;
    }
    voice.playAfter(sceneClips[scene], playHeard(scene, outcome.transcript));
  };

  const start = () => {
    setMessage(null);
    voice.unlock();
    void listening.listen().then(settle);
  };

  return {
    status: listening.status,
    message,
    start,
    stop: listening.stop,
  };
}
