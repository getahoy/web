import { landingCopy } from "../copy/landingCopy";

const trustLines = [
  landingCopy["trust.hold"],
  landingCopy["trust.confirm"],
  landingCopy["trust.audio"],
];

export function FounderNote() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-26 lg:px-12 lg:py-32">
      <div className="mx-auto flex max-w-note flex-col gap-14 lg:gap-18">
        <figure className="flex flex-col gap-7">
          <blockquote className="text-pretty font-display font-normal text-quote italic">
            {landingCopy["founder.quote"]}
          </blockquote>
          <figcaption className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linen font-display text-heard"
            >
              {landingCopy["founder.initial"]}
            </span>
            <span className="font-medium text-button">
              {landingCopy["founder.name"]}
            </span>
          </figcaption>
        </figure>
        <ul
          aria-label={landingCopy["trust.label"]}
          className="grid gap-4 border-rope border-t pt-7 sm:grid-cols-3 sm:gap-8"
        >
          {trustLines.map((line) => (
            <li key={line} className="text-pretty text-body text-driftwood">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
