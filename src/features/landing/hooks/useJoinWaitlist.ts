import { type RequestResult, request } from "@getahoy/lib";
import { useState } from "react";
import {
  WAITLIST_PATH,
  type WaitlistReply,
  type WaitlistRequest,
  waitlistReplySchema,
} from "../forms/waitlistRequest";

export function useJoinWaitlist() {
  const [pending, setPending] = useState(false);

  const join = async (
    body: WaitlistRequest,
  ): Promise<RequestResult<WaitlistReply>> => {
    setPending(true);
    const outcome = await request({
      url: WAITLIST_PATH,
      method: "POST",
      body,
      schema: waitlistReplySchema,
    });
    setPending(false);
    return outcome;
  };

  return { pending, join };
}
