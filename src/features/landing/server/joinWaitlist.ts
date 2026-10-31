import { randomUUID } from "node:crypto";
import { database } from "@/db/client";
import { waitlistSignup } from "@/db/schema";
import type { WaitlistSource } from "../forms/waitlistRequest";

type JoinOutcome = "saved" | "already_listed";

export async function joinWaitlist(signup: {
  email: string;
  source: WaitlistSource;
}): Promise<JoinOutcome> {
  const inserted = await database
    .insert(waitlistSignup)
    .values({ id: randomUUID(), ...signup })
    .onConflictDoNothing({ target: waitlistSignup.email })
    .returning({ id: waitlistSignup.id });
  return inserted.length > 0 ? "saved" : "already_listed";
}
