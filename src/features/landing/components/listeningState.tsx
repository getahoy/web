import { Mic } from "lucide-react";
import { cn } from "@/lib/cn";
import { landingCopy } from "../copy/landingCopy";
import { focusRing } from "./focusRing";

type ListeningStateProps = {
  hints: readonly string[];
  onStop: () => void;
};

export function ListeningState({ hints, onStop }: ListeningStateProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        aria-hidden="true"
        className="relative flex size-36 items-center justify-center"
      >
        <span className="absolute inset-0 animate-breathe rounded-full bg-orb-listen motion-reduce:animate-none" />
        <span className="relative flex size-14 items-center justify-center rounded-full bg-ink text-white">
          <Mic strokeWidth={1.5} className="size-5" />
        </span>
      </div>
      <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 font-display text-body-lg text-driftwood italic">
        {hints.map((hint) => (
          <li key={hint}>{hint}</li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onStop}
        className={cn(
          "h-9 rounded-full border border-rope bg-paper px-4 font-medium text-micro transition-colors duration-150 hover:bg-linen",
          focusRing,
        )}
      >
        {landingCopy["try.stop"]}
      </button>
    </div>
  );
}
