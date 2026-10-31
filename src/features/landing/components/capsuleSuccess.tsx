import { cn } from "cn";
import { Check } from "lucide-react";
import { waitlistCopy } from "../copy/waitlistCopy";
import { type CapsuleTone, capsuleTones } from "./capsuleTones";

export function CapsuleSuccess({ tone }: { tone: CapsuleTone }) {
  const classes = capsuleTones[tone];
  return (
    <p
      className={cn(
        "flex min-h-13 animate-in items-center gap-2.5 rounded-sheet border px-4.5 py-2.5 text-left text-button duration-240 ease-sheet fade-in xs:h-full xs:min-h-0 xs:flex-1 xs:justify-center xs:border-0 xs:bg-transparent xs:px-3.5 xs:py-0",
        classes.success,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex size-5 shrink-0 animate-in items-center justify-center rounded-full duration-360 ease-spring zoom-in-30",
          classes.check,
        )}
      >
        <Check strokeWidth={2} className="size-3" />
      </span>
      <span className="text-balance">{waitlistCopy.success}</span>
    </p>
  );
}
