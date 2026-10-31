import { cn } from "@/lib/cn";
import { focusRing } from "./focusRing";
import type { PhoneBar } from "./micBarState";
import { MicDisc } from "./micDisc";

export type MicBarMode =
  | "idle"
  | "listening"
  | "showListening"
  | "sending"
  | "blocked";

type PhoneMicBarProps = {
  bar: PhoneBar;
  size: "phone" | "sheet";
  className?: string;
  onTap: () => void;
};

const sizes = {
  phone: {
    bar: "h-15",
    disc: "size-11",
    icon: "size-5",
    text: "truncate text-body-sm",
    orb: "-bottom-11.5 h-37.5 w-75",
  },
  sheet: {
    bar: "min-h-13",
    disc: "size-9",
    icon: "size-4",
    text: "text-balance text-micro",
    orb: "-bottom-7.5 h-27.5 w-65",
  },
};

export function PhoneMicBar({ bar, size, className, onTap }: PhoneMicBarProps) {
  const look = sizes[size];
  const hearing = bar.mode === "listening" || bar.mode === "showListening";
  const lit = hearing || bar.mode === "sending";
  return (
    <div className={cn("relative", className)}>
      {hearing ? (
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-1/2 -translate-x-1/2 animate-breathe rounded-full bg-orb-listen motion-reduce:animate-none",
            look.orb,
          )}
        />
      ) : null}
      <button
        type="button"
        onClick={onTap}
        aria-label={bar.label}
        aria-disabled={bar.mode === "blocked"}
        className={cn(
          "relative flex w-full items-center gap-2.5 rounded-full bg-ink pr-4.5 pl-2 text-left transition-transform duration-150 active:scale-98 aria-disabled:cursor-not-allowed",
          focusRing,
          look.bar,
        )}
      >
        <MicDisc mode={bar.mode} disc={look.disc} icon={look.icon} />
        <span
          className={cn(
            "min-w-0 flex-1 font-medium",
            look.text,
            lit ? "text-sailcloth" : "text-fog",
          )}
        >
          {bar.text}
        </span>
        {bar.timer ? (
          <span className="font-label text-caption text-fog">{bar.timer}</span>
        ) : null}
      </button>
    </div>
  );
}
