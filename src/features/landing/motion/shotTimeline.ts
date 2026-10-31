export type ShotStage = "listening" | "clicking" | "done";

export const shotTimeline: readonly { stage: ShotStage; holdMs: number }[] = [
  { stage: "listening", holdMs: 1500 },
  { stage: "clicking", holdMs: 3700 },
  { stage: "done", holdMs: 3800 },
];

export const RESTING_STEP = shotTimeline.length - 1;
