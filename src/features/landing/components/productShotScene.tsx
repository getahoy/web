import type { ShotScene, ShotStage } from "../motion/shotTimeline";
import { PhoneFrame } from "./phoneFrame";
import { PhoneTalkScreen } from "./phoneTalkScreen";
import { ShotMac } from "./shotMac";

type ProductShotSceneProps = {
  scene: ShotScene;
  stage: ShotStage;
  heard: string | null;
};

export function ProductShotScene({
  scene,
  stage,
  heard,
}: ProductShotSceneProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none flex select-none flex-col items-center justify-center gap-9 lg:flex-row lg:gap-16"
    >
      <ShotMac scene={scene} stage={stage} />
      <PhoneFrame>
        <PhoneTalkScreen scene={scene} stage={stage} heard={heard} />
      </PhoneFrame>
    </div>
  );
}
