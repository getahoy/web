import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  actingStepOf,
  doneStepOf,
  firstStepOf,
  RESTING_STEP,
  type ShotScene,
  shotTimeline,
} from "../motion/shotTimeline";

type HeardLine = { scene: ShotScene; text: string };

export function useShotPlayer(inView: boolean) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(RESTING_STEP);
  const [paused, setPaused] = useState(false);
  const [heard, setHeard] = useState<HeardLine | null>(null);
  const current = shotTimeline[step] ?? shotTimeline[RESTING_STEP];
  const scene = current?.scene ?? "pause";

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

  useEffect(() => {
    if (heard && heard.scene !== scene) setHeard(null);
  }, [heard, scene]);

  const jump = (target: ShotScene, step: number) => {
    setStep(reduced ? doneStepOf(target) : step);
    setPaused(false);
  };

  const playHeard = (target: ShotScene, text: string): number => {
    setHeard({ scene: target, text });
    jump(target, actingStepOf(target));
    return reduced ? 0 : (shotTimeline[actingStepOf(target)]?.holdMs ?? 0);
  };

  return {
    scene,
    stage: current?.stage ?? "done",
    heard: heard?.scene === scene ? heard.text : null,
    paused,
    showScene: (target: ShotScene) => {
      setHeard(null);
      jump(target, firstStepOf(target));
    },
    playHeard,
    togglePaused: () => setPaused((previous) => !previous),
  };
}
