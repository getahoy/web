import { Mic, MicOff, Square } from "lucide-react";
import { cn } from "@/lib/cn";

export type MicBarMode =
  | "idle"
  | "listening"
  | "showListening"
  | "sending"
  | "blocked";

type PhoneMicBarProps = {
  mode: MicBarMode;
  text: string;
  label: string;
  timer: string | null;
  size: "phone" | "sheet";
  className?: string;
  onTap: () => void;
};

const icons = {
  idle: Mic,
  listening: Square,
  showListening: Mic,
  sending: Mic,
  blocked: MicOff,
};

export function PhoneMicBar(props: PhoneMicBarProps) {
  const Icon = icons[props.mode];
  const lit = props.mode !== "idle" && props.mode !== "blocked";
  const phone = props.size === "phone";
  return (
    <button
      type="button"
      onClick={props.onTap}
      aria-label={props.label}
      aria-disabled={props.mode === "blocked"}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-full bg-ink pl-2 text-left transition-transform duration-150 active:scale-98 aria-disabled:cursor-not-allowed",
        "outline-none focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2",
        phone ? "h-15 pr-4.5" : "min-h-13 pr-4.5",
        props.className,
      )}
    >
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-full bg-paper text-ink",
          phone ? "size-11" : "size-9",
          props.mode === "blocked" && "opacity-40",
        )}
      >
        {props.mode === "idle" ? (
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-mic-pulse rounded-full border-2 border-paper motion-reduce:hidden"
          />
        ) : null}
        <Icon
          aria-hidden="true"
          strokeWidth={1.5}
          className={phone ? "size-5" : "size-4"}
        />
      </span>
      <span
        className={cn(
          "min-w-0 flex-1 font-medium",
          phone ? "truncate text-body-sm" : "text-balance text-micro",
          lit ? "text-sailcloth" : "text-fog",
        )}
      >
        {props.text}
      </span>
      {props.timer ? (
        <span className="font-label text-caption text-fog">{props.timer}</span>
      ) : null}
    </button>
  );
}
