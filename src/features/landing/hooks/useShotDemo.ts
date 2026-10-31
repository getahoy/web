import { useState } from "react";
import { shotScenes } from "../copy/shotScenes";
import type { ListenOutcome } from "../listening/demoListener";
import { matchScene } from "../listening/matchSpoken";
import { missClips } from "../listening/missClips";
import type { ShotScene } from "../motion/shotTimeline";
import { useDemoListening } from "./useDemoListening";
import { useShotSteps } from "./useShotSteps";
import { useVoiceClips } from "./useVoiceClips";

export function useShotDemo(inView: boolean) {
  const steps = useShotSteps(inView);
  const mic = useDemoListening();
  const voice = useVoiceClips();
  const [heard, setHeard] = useState<string | null>(null);
  const [noMatch, setNoMatch] = useState(false);

  const settle = (outcome: ListenOutcome) => {
    if (outcome.kind !== "heard") {
      voice.play(missClips[outcome.kind]);
      return;
    }
    setHeard(outcome.transcript);
    const scene = matchScene(outcome.transcript);
    if (!scene) {
      setNoMatch(true);
      voice.play("noMatch");
      return;
    }
    voice.playAfter(shotScenes[scene].clip, steps.answer(scene));
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
    voice.stop();
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
