import { type FormEvent, useRef, useState } from "react";
import {
  type CapsuleNotice,
  NO_NOTICE,
  waitlistNotice,
} from "../errors/waitlistNotice";
import {
  type WaitlistSource,
  waitlistEmailSchema,
} from "../forms/waitlistRequest";
import { useJoinWaitlist } from "./useJoinWaitlist";
import { useSpinnerVisible } from "./useSpinnerVisible";

export function useWaitlistCapsule(source: WaitlistSource) {
  const { pending, join } = useJoinWaitlist();
  const joiningVisible = useSpinnerVisible(pending);
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState<CapsuleNotice>(NO_NOTICE);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const changeEmail = (next: string) => {
    setEmail(next);
    if (notice.kind === "invalid") setNotice(NO_NOTICE);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending || notice.kind === "joined") return;
    if (!waitlistEmailSchema.safeParse(email).success) {
      setNotice({ kind: "invalid" });
      return;
    }
    setNotice(NO_NOTICE);
    const company = honeypotRef.current?.value ?? "";
    const outcome = await join({ email, source, company });
    setNotice(
      outcome.code === "success"
        ? { kind: "joined" }
        : waitlistNotice(outcome.error),
    );
  };

  const showsResult = !joiningVisible;
  return {
    email,
    notice: showsResult ? notice : NO_NOTICE,
    joined: showsResult && notice.kind === "joined",
    busy: pending || joiningVisible,
    joiningVisible,
    honeypotRef,
    changeEmail,
    submit,
  };
}
