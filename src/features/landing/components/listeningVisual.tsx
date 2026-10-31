import { Mic } from "lucide-react";
import { landingCopy } from "../copy/landingCopy";

export function ListeningVisual() {
  return (
    <div className="flex flex-col items-center gap-17">
      <span className="font-display text-driftwood text-heard italic">
        {landingCopy["how.step1.heard"]}
      </span>
      <div className="relative flex size-28 items-center justify-center">
        <span className="absolute size-58 rounded-full bg-signal-mist" />
        <span className="relative flex size-28 scale-106 items-center justify-center rounded-full bg-ink text-white">
          <Mic strokeWidth={1.5} className="size-8.5" />
        </span>
      </div>
      <span className="font-label text-micro tabular-nums">
        {landingCopy["how.step1.caption"]}
      </span>
    </div>
  );
}
