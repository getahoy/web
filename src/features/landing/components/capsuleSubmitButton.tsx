import { ArrowRight, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { waitlistCopy } from "../copy/waitlistCopy";
import { type CapsuleTone, capsuleTones } from "./capsuleTones";

type CapsuleSubmitButtonProps = {
  tone: CapsuleTone;
  busy: boolean;
  joiningVisible: boolean;
};

export function CapsuleSubmitButton(props: CapsuleSubmitButtonProps) {
  const tone = capsuleTones[props.tone];
  return (
    <Button
      type="submit"
      disabled={props.busy}
      className={cn(
        "group h-13 w-full gap-2 rounded-full px-5 font-medium font-text text-button outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-0 active:scale-97 disabled:opacity-100 xs:h-full xs:w-auto",
        tone.button,
        tone.focus,
      )}
    >
      {props.joiningVisible ? (
        <>
          <LoaderCircle
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-4 animate-spin"
          />
          {waitlistCopy["button.joining"]}
        </>
      ) : (
        <>
          {waitlistCopy["button.join"]}
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-4 transition-transform duration-150 group-hover:translate-x-0.75"
          />
        </>
      )}
    </Button>
  );
}
