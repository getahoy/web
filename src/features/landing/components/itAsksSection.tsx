import { landingCopy } from "../copy/landingCopy";
import { AsksDemo } from "./asksDemo";

export function ItAsksSection() {
  return (
    <section className="px-5 py-26 sm:px-8 sm:py-34 lg:px-12 lg:py-44">
      <div className="mx-auto flex max-w-page flex-col items-center gap-16 lg:gap-24">
        <div className="flex max-w-statement flex-col items-center gap-5 text-center">
          <h2 className="text-balance font-display font-light text-heading">
            {landingCopy["asks.lead"]} <em>{landingCopy["asks.italic"]}</em>
          </h2>
          <p className="text-pretty text-body-lg text-driftwood">
            {landingCopy["asks.body"]}
          </p>
        </div>
        <p className="sr-only">{landingCopy["asks.description"]}</p>
        <AsksDemo />
      </div>
    </section>
  );
}
