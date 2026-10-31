import { landingCopy } from "../copy/landingCopy";
import { HeroHeadline } from "./heroHeadline";
import { WaitlistCapsule } from "./waitlistCapsule";

export function HeroSection() {
  return (
    <section
      id="top"
      className="-mt-14 flex min-h-svh flex-col items-center justify-center px-5 pt-22 pb-8 text-center sm:px-8 sm:pt-28 sm:pb-14 lg:px-12 lg:pt-30 lg:pb-16"
    >
      <HeroHeadline />
      <p className="mt-7 max-w-subtitle text-pretty text-body-lg text-driftwood">
        {landingCopy["hero.subtitle"]}
      </p>
      <div id="waitlist" className="mt-9 w-full max-w-capsule scroll-mt-24">
        <WaitlistCapsule tone="light" />
      </div>
      <p className="mt-3.5 text-driftwood text-micro">
        {landingCopy["hero.microcopy"]}
      </p>
    </section>
  );
}
