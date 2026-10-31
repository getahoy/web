import { landingCopy } from "../copy/landingCopy";

export function DemoVideoSlot() {
  return (
    <figure
      aria-label={landingCopy["shot.video"]}
      className="aspect-video w-full overflow-hidden rounded-card bg-linen shadow-float"
    />
  );
}
