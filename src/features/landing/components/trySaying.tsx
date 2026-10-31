import { landingCopy } from "../copy/landingCopy";

export function TrySaying({ examples }: { examples: readonly string[] }) {
  return (
    <div className="flex animate-in flex-col items-center gap-2.5 text-center duration-240 fade-in">
      <span className="font-label text-driftwood text-eyebrow uppercase tracking-eyebrow">
        {landingCopy["say.label"]}
      </span>
      <ul className="flex flex-wrap justify-center gap-2">
        {examples.map((example) => (
          <li
            key={example}
            className="rounded-full border border-rope bg-paper px-3.5 py-1.5 font-display text-body italic"
          >
            {example}
          </li>
        ))}
      </ul>
    </div>
  );
}
