"use client";

import { cn } from "cn";
import { useId } from "react";
import type { WaitlistSource } from "../forms/waitlistRequest";
import { useWaitlistCapsule } from "../hooks/useWaitlistCapsule";
import { CapsuleFields } from "./capsuleFields";
import { CapsuleHoneypot } from "./capsuleHoneypot";
import { CapsuleMessage } from "./capsuleMessage";
import { CapsuleSuccess } from "./capsuleSuccess";
import { type CapsuleTone, capsuleTones } from "./capsuleTones";

type WaitlistCapsuleProps = { tone: CapsuleTone; source: WaitlistSource };

export function WaitlistCapsule({ tone, source }: WaitlistCapsuleProps) {
  const inputId = useId();
  const honeypotId = useId();
  const messageId = useId();
  const capsule = useWaitlistCapsule(source);
  const invalid = capsule.notice.kind === "invalid";
  const classes = capsuleTones[tone];

  return (
    <form noValidate onSubmit={capsule.submit}>
      <div
        className={cn(
          "flex flex-col gap-2 font-text xs:h-14 xs:flex-row xs:items-center xs:rounded-full xs:border xs:p-1.25 xs:transition-[border-color,box-shadow] xs:duration-150 sm:h-15",
          invalid ? classes.shellInvalid : classes.shell,
        )}
      >
        {capsule.joined ? (
          <CapsuleSuccess tone={tone} />
        ) : (
          <CapsuleFields
            tone={tone}
            inputId={inputId}
            messageId={messageId}
            email={capsule.email}
            invalid={invalid}
            busy={capsule.busy}
            joiningVisible={capsule.joiningVisible}
            onEmailChange={capsule.changeEmail}
          />
        )}
      </div>
      <CapsuleHoneypot inputId={honeypotId} ref={capsule.honeypotRef} />
      <CapsuleMessage id={messageId} tone={tone} notice={capsule.notice} />
    </form>
  );
}
