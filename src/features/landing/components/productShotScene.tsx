import type { ShotScene, ShotStage } from "../motion/shotTimeline";
import { PhoneFrame } from "./phoneFrame";
import { PhoneTalkScreen } from "./phoneTalkScreen";
import { ShotBrowser } from "./shotBrowser";

type ProductShotSceneProps = { scene: ShotScene; stage: ShotStage };

export function ProductShotScene({ scene, stage }: ProductShotSceneProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none flex select-none flex-col items-center justify-center gap-9 lg:flex-row lg:gap-16"
    >
      <ShotBrowser scene={scene} stage={stage} />
      <PhoneFrame>
        <PhoneTalkScreen scene={scene} stage={stage} />
      </PhoneFrame>
    </div>
  );
}
