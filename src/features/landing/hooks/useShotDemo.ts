import { useState } from "react";
import type { VoiceClip } from "../copy/demoVoiceCopy";
import type { ListenOutcome } from "../listening/demoListener";
import { listeningMisses } from "../listening/listeningMisses";
import { matchScene } from "../listening/matchSpoken";
import type { ShotScene } from "../motion/shotTimeline";
import { useDemoListening } from "./useDemoListening";
import { useShotSteps } from "./useShotSteps";
import { useVoiceClips } from "./useVoiceClips";

const sceneClips: Record<ShotScene, VoiceClip> = {
  pause: "paused",
  note: "newNote",
  draft: "drafted",
};

export function useShotDemo(inView: boolean) {
  const steps = useShotSteps(inView);
  const mic = useDemoListening();
  const voice = useVoiceClips();
  const [heard, setHeard] = useState<string | null>(null);
  const [noMatch, setNoMatch] = useState(false);

  const settle = (outcome: ListenOutcome) => {
    if (outcome.kind !== "heard") {
      void voice.play(listeningMisses[outcome.kind].clip);
      return;
    }
    setHeard(outcome.transcript);
    const scene = matchScene(outcome.transcript);
    if (!scene) {
      setNoMatch(true);
      void voice.play("noMatch");
      return;
    }
    voice.playAfter(sceneClips[scene], steps.answer(scene));
  };

  const tapMic = () => {
    if (mic.status === "listening") return mic.stop();
    if (mic.status !== "ready") return;
    voice.unlock();
    setHeard(null);
    setNoMatch(false);
    steps.rest();
    void mic.listen().then(settle);
  };

  const clearAnd = (next: () => void) => {
    mic.stop();
    setHeard(null);
    setNoMatch(false);
    next();
  };

  return {
    steps,
    mic,
    heard,
    noMatch,
    tapMic,
    pick: (scene: ShotScene) => clearAnd(() => steps.autoFrom(scene)),
    togglePlaying: () => clearAnd(steps.togglePlaying),
  };
}
