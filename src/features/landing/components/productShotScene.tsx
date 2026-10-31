import type { ShotStage } from "../motion/shotTimeline";
import { MacMailWindow } from "./macMailWindow";
import { PhoneFrame } from "./phoneFrame";
import { PhoneTalkScreen } from "./phoneTalkScreen";

export function ProductShotScene({ stage }: { stage: ShotStage }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none flex select-none flex-col items-center justify-center gap-9 lg:flex-row lg:gap-16"
    >
      <MacMailWindow stage={stage} />
      <PhoneFrame>
        <PhoneTalkScreen stage={stage} />
      </PhoneFrame>
    </div>
  );
}
