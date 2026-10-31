import { Mic } from "lucide-react";
import { cn } from "@/lib/cn";
import { landingCopy } from "../copy/landingCopy";
import type { ListeningStatus } from "../hooks/useDemoListening";
import { focusRing } from "./focusRing";
import { ListeningState } from "./listeningState";

type VoiceTryPanelProps = {
  startLabel: string;
  hints: readonly string[];
  status: ListeningStatus;
  busy: boolean;
  message: string | null;
  onStart: () => void;
  onStop: () => void;
};

export function VoiceTryPanel(props: VoiceTryPanelProps) {
  const canListen = props.status === "ready" || props.status === "listening";
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {props.status === "listening" ? (
        <ListeningState hints={props.hints} onStop={props.onStop} />
      ) : null}
      {props.status === "ready" ? (
        <button
          type="button"
          disabled={props.busy}
          onClick={props.onStart}
          className={cn(
            "flex h-12 items-center gap-2 rounded-full bg-ink px-5 font-medium text-button text-white transition-transform duration-150 active:scale-97 disabled:opacity-60",
            focusRing,
          )}
        >
          <Mic aria-hidden="true" strokeWidth={1.5} className="size-4" />
          {props.startLabel}
        </button>
      ) : null}
      <p aria-live="polite" className="min-h-5 text-driftwood text-micro">
        {props.status === "listening"
          ? landingCopy["try.listening"]
          : props.message}
      </p>
      {canListen ? (
        <p className="max-w-subtitle text-balance text-caption text-driftwood">
          {landingCopy["try.privacy"]}
        </p>
      ) : null}
    </div>
  );
}
