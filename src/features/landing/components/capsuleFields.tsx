import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/cn";
import { waitlistCopy } from "../copy/waitlistCopy";
import { CapsuleSubmitButton } from "./capsuleSubmitButton";
import { type CapsuleTone, capsuleTones } from "./capsuleTones";

type CapsuleFieldsProps = {
  tone: CapsuleTone;
  inputId: string;
  messageId: string;
  email: string;
  invalid: boolean;
  busy: boolean;
  joiningVisible: boolean;
  onEmailChange: (email: string) => void;
};

export function CapsuleFields(props: CapsuleFieldsProps) {
  return (
    <>
      <Label htmlFor={props.inputId} className="sr-only">
        {waitlistCopy["field.label"]}
      </Label>
      <Input
        id={props.inputId}
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder={waitlistCopy["field.placeholder"]}
        value={props.email}
        onChange={(event) => props.onEmailChange(event.target.value)}
        readOnly={props.busy}
        aria-invalid={props.invalid}
        aria-describedby={props.messageId}
        className={cn(
          "h-13 rounded-full px-5 font-text text-body md:text-body focus-visible:ring-4 aria-invalid:ring-0 xs:h-full xs:min-w-0 xs:flex-1 xs:border-0 xs:bg-transparent xs:pr-2 xs:pl-4 xs:focus-visible:ring-0",
          capsuleTones[props.tone].input,
        )}
      />
      <CapsuleSubmitButton
        tone={props.tone}
        busy={props.busy}
        joiningVisible={props.joiningVisible}
      />
    </>
  );
}
