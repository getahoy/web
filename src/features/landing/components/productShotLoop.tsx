import { RESTING_STAGE } from "../motion/shotTimeline";
import { ProductShotScene } from "./productShotScene";

export function ProductShotLoop() {
  return <ProductShotScene stage={RESTING_STAGE} />;
}
