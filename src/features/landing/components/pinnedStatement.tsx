import { landingCopy } from "../copy/landingCopy";

export function PinnedStatement() {
  const words = landingCopy["statement.text"].split(" ");
  const lastIndex = words.length - 1;
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12">
      <p className="mx-auto max-w-note text-balance text-center font-display font-light text-reveal">
        {words.map((word, index) => (
          <span
            key={`${index}-${word}`}
            className={index === lastIndex ? "italic" : undefined}
          >
            {index === lastIndex ? word : `${word} `}
          </span>
        ))}
      </p>
    </section>
  );
}
