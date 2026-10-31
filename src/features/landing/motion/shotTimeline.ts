export type ShotScene = "pause" | "note" | "draft";
export type ShotStage = "listening" | "acting" | "done";
export type ShotView = ShotStage | "rest";

export const shotSceneOrder: readonly ShotScene[] = ["pause", "note", "draft"];

const stageHolds: readonly { stage: ShotStage; holdMs: number }[] = [
  { stage: "listening", holdMs: 2000 },
  { stage: "acting", holdMs: 1500 },
  { stage: "done", holdMs: 2500 },
];

export const SCENE_MS = stageHolds.reduce((sum, hold) => sum + hold.holdMs, 0);
export const ANSWER_LINGER_MS = 2000;

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

export function sceneOffsetMs(step: number): number {
  const stageIndex = step % stageHolds.length;
  return stageHolds
    .slice(0, stageIndex)
    .reduce((sum, hold) => sum + hold.holdMs, 0);
}
