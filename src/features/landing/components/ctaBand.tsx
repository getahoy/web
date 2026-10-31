import { landingCopy } from "../copy/landingCopy";
import { WaitlistCapsule } from "./waitlistCapsule";

export function CtaBand() {
  return (
    <section className="flex flex-col items-center gap-8 bg-night px-5 py-20 text-center text-sailcloth sm:px-8 sm:py-26 lg:px-12 lg:py-32">
      <h2 className="font-display font-light text-heading">
        {landingCopy["cta.lead"]} <em>{landingCopy["cta.italic"]}</em>
      </h2>
      <div className="flex w-full max-w-capsule flex-col items-center gap-3.5">
        <div className="w-full">
          <WaitlistCapsule tone="night" />
        </div>
        <p className="text-micro text-night-driftwood">
          {landingCopy["hero.microcopy"]}
        </p>
      </div>
    </section>
  );
}
