"use client";

import { cn } from "cn";
import { useId, useState } from "react";
import { CapsuleFields } from "./capsuleFields";
import { CapsuleMessage } from "./capsuleMessage";
import { type CapsuleTone, capsuleTones } from "./capsuleTones";

type WaitlistCapsuleProps = { tone: CapsuleTone };

export function WaitlistCapsule({ tone }: WaitlistCapsuleProps) {
  const inputId = useId();
  const messageId = useId();
  const [email, setEmail] = useState("");

  return (
    <form noValidate onSubmit={(event) => event.preventDefault()}>
      <div
        className={cn(
          "flex flex-col gap-2 font-text xs:h-14 xs:flex-row xs:items-center xs:rounded-full xs:border xs:p-1.25 xs:transition-[border-color,box-shadow] xs:duration-150 sm:h-15",
          capsuleTones[tone].shell,
        )}
      >
        <CapsuleFields
          tone={tone}
          inputId={inputId}
          messageId={messageId}
          email={email}
          invalid={false}
          busy={false}
          joiningVisible={false}
          onEmailChange={setEmail}
        />
      </div>
      <CapsuleMessage id={messageId} tone={tone} notice={{ kind: "none" }} />
    </form>
  );
}
