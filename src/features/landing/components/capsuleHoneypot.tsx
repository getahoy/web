import type { Ref } from "react";
import { waitlistCopy } from "../copy/waitlistCopy";

export function CapsuleHoneypot({
  inputId,
  ref,
}: {
  inputId: string;
  ref: Ref<HTMLInputElement>;
}) {
  return (
    <div aria-hidden="true" className="sr-only">
      <label htmlFor={inputId}>{waitlistCopy["honeypot.label"]}</label>
      <input
        ref={ref}
        id={inputId}
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
