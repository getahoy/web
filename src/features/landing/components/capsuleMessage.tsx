import { cn } from "@/lib/cn";
import { waitlistCopy } from "../copy/waitlistCopy";
import type { CapsuleNotice } from "../errors/waitlistNotice";
import { type CapsuleTone, capsuleTones } from "./capsuleTones";

type CapsuleMessageProps = {
  id: string;
  tone: CapsuleTone;
  notice: CapsuleNotice;
};

export function CapsuleMessage({ id, tone, notice }: CapsuleMessageProps) {
  const classes = capsuleTones[tone];
  const visible = notice.kind === "invalid" || notice.kind === "failed";
  return (
    <p
      id={id}
      aria-live="polite"
      className={cn("px-5 text-center text-micro", visible && "mt-2")}
    >
      {notice.kind === "invalid" ? (
        <span className={classes.error}>
          {waitlistCopy["error.invalidEmail"]}
        </span>
      ) : null}
      {notice.kind === "failed" ? (
        <span className={classes.note}>
          {notice.message}{" "}
          <button
            type="submit"
            className={cn(
              "rounded-sm font-medium underline underline-offset-4 outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
              classes.focus,
            )}
          >
            {waitlistCopy.retry}
          </button>
        </span>
      ) : null}
      {notice.kind === "joined" ? (
        <span className="sr-only">{waitlistCopy.success}</span>
      ) : null}
    </p>
  );
}
