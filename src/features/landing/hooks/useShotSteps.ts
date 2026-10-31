import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  ANSWER_LINGER_MS,
  actingStepOf,
  doneStepOf,
  firstStepOf,
  RESTING_STEP,
  type ShotScene,
  shotTimeline,
} from "../motion/shotTimeline";

export type ShotMode = "auto" | "answer" | "idle";

export function useShotSteps(inView: boolean) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(RESTING_STEP);
  const [mode, setMode] = useState<ShotMode>("auto");
  const [playing, setPlaying] = useState(true);
  const current = shotTimeline[step] ?? shotTimeline[RESTING_STEP];

  useEffect(() => {
    if (!reduced) setStep(0);
  }, [reduced]);

  useEffect(() => {
    if (!current || reduced || !inView) return;
    if (mode === "idle" || (mode === "auto" && !playing)) return;
    const answerEnds = mode === "answer" && current.stage === "done";
    const timer = setTimeout(
      () => {
        if (answerEnds) return setMode("idle");
        setStep((previous) => (previous + 1) % shotTimeline.length);
      },
      current.holdMs + (answerEnds ? ANSWER_LINGER_MS : 0),
    );
    return () => clearTimeout(timer);
  }, [current, reduced, inView, mode, playing]);

  const autoFrom = (scene: ShotScene) => {
    setMode("auto");
    setPlaying(true);
    setStep(reduced ? doneStepOf(scene) : firstStepOf(scene));
  };

  const answer = (scene: ShotScene): number => {
    setMode("answer");
    setStep(reduced ? doneStepOf(scene) : actingStepOf(scene));
    return reduced ? 0 : (shotTimeline[actingStepOf(scene)]?.holdMs ?? 0);
  };

  const togglePlaying = () => {
    if (mode !== "auto") return autoFrom(current?.scene ?? "pause");
    setPlaying((previous) => !previous);
  };

  return {
    step,
    scene: current?.scene ?? "pause",
    stage: current?.stage ?? "done",
    mode,
    playing: mode === "auto" && playing,
    autoFrom,
    answer,
    rest: () => setMode("idle"),
    togglePlaying,
  };
}
