import { cn } from "cn";
import { landingCopy } from "../copy/landingCopy";

type WordmarkSize = "nav" | "footer";

const sizes: Record<WordmarkSize, { pennant: string; name: string }> = {
  nav: { pennant: "h-3.5 w-4.5", name: "text-wordmark" },
  footer: { pennant: "h-3.75 w-5", name: "text-heard" },
};

export function Wordmark({ size }: { size: WordmarkSize }) {
  const { pennant, name } = sizes[size];
  return (
    <span className="flex items-center gap-2">
      <svg aria-hidden="true" viewBox="0 0 26 20" className={pennant}>
        <path
          d="M2 1.5H24L16.5 10L24 18.5H2Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span className={cn("font-display font-normal", name)}>
        {landingCopy["wordmark.name"]}
      </span>
    </span>
  );
}
