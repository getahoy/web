import { landingCopy } from "../copy/landingCopy";
import { DemoVideoSlot } from "./demoVideoSlot";
import { ProductShotLoop } from "./productShotLoop";

type ProductShotKind = "live" | "video";

const PRODUCT_SHOT: ProductShotKind = "live";

function shotFor(kind: ProductShotKind) {
  switch (kind) {
    case "live":
      return <ProductShotLoop />;
    case "video":
      return <DemoVideoSlot />;
    default: {
      const unhandled: never = kind;
      return unhandled;
    }
  }
}

export function ProductShotSection() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center gap-7 px-5 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-26 lg:gap-10 lg:px-12 lg:pt-24 lg:pb-32">
      <h2 className="font-label text-caption text-driftwood">
        {landingCopy["shot.label"]}
      </h2>
      <p className="sr-only">{landingCopy["shot.description"]}</p>
      <div className="w-full max-w-page">{shotFor(PRODUCT_SHOT)}</div>
    </section>
  );
}
