import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  doneStepOf,
  firstStepOf,
  RESTING_STEP,
  type ShotScene,
  shotTimeline,
} from "../motion/shotTimeline";

export function useShotPlayer(inView: boolean) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(RESTING_STEP);
  const [paused, setPaused] = useState(false);
  const current = shotTimeline[step] ?? shotTimeline[RESTING_STEP];

  useEffect(() => {
    if (!reduced) setStep(0);
  }, [reduced]);

  useEffect(() => {
    if (!inView || reduced || paused || !current) return;
    const timer = setTimeout(
      () => setStep((previous) => (previous + 1) % shotTimeline.length),
      current.holdMs,
    );
    return () => clearTimeout(timer);
  }, [inView, reduced, paused, current]);

  const showScene = (scene: ShotScene) => {
    setStep(reduced ? doneStepOf(scene) : firstStepOf(scene));
    setPaused(false);
  };

  return {
    scene: current?.scene ?? "pause",
    stage: current?.stage ?? "done",
    paused,
    showScene,
    togglePaused: () => setPaused((previous) => !previous),
  };
}
