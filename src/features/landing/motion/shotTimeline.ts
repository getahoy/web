export type ShotScene = "pause" | "closeTab" | "draft";
export type ShotStage = "listening" | "acting" | "done";

const sceneOrder: readonly ShotScene[] = ["pause", "closeTab", "draft"];

const stageHolds: readonly { stage: ShotStage; holdMs: number }[] = [
  { stage: "listening", holdMs: 1200 },
  { stage: "acting", holdMs: 1100 },
  { stage: "done", holdMs: 1700 },
];

export const shotTimeline = sceneOrder.flatMap((scene) =>
  stageHolds.map((hold) => ({ scene, ...hold })),
);

export const RESTING_STEP = stageHolds.length - 1;
