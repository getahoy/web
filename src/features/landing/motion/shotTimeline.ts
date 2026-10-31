export type ShotScene = "pause" | "note" | "draft";
export type ShotStage = "listening" | "acting" | "done";

export const shotSceneOrder: readonly ShotScene[] = ["pause", "note", "draft"];

const stageHolds: readonly { stage: ShotStage; holdMs: number }[] = [
  { stage: "listening", holdMs: 2000 },
  { stage: "acting", holdMs: 1500 },
  { stage: "done", holdMs: 2500 },
];

export const shotTimeline = shotSceneOrder.flatMap((scene) =>
  stageHolds.map((hold) => ({ scene, ...hold })),
);

function stepOf(scene: ShotScene, stage: ShotStage): number {
  return shotTimeline.findIndex(
    (entry) => entry.scene === scene && entry.stage === stage,
  );
}

export const firstStepOf = (scene: ShotScene) => stepOf(scene, "listening");
export const actingStepOf = (scene: ShotScene) => stepOf(scene, "acting");
export const doneStepOf = (scene: ShotScene) => stepOf(scene, "done");

export const RESTING_STEP = doneStepOf("pause");
