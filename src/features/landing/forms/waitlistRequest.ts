import { z } from "zod";
import { waitlistCopy } from "../copy/waitlistCopy";

export const WAITLIST_PATH = "/api/waitlist";
export const WAITLIST_SOURCES = ["hero", "cta"] as const;
export const MAXIMUM_EMAIL_LENGTH = 254;
const MAXIMUM_HONEYPOT_LENGTH = 200;

const invalidEmail = { error: waitlistCopy["error.invalidEmail"] };

export const waitlistEmailSchema = z
  .string(invalidEmail)
  .trim()
  .toLowerCase()
  .max(MAXIMUM_EMAIL_LENGTH, invalidEmail)
  .pipe(z.email(invalidEmail));

export const waitlistRequestSchema = z.object({
  email: waitlistEmailSchema,
  source: z.enum(WAITLIST_SOURCES),
  company: z.string().max(MAXIMUM_HONEYPOT_LENGTH).optional(),
});

export type WaitlistSource = (typeof WAITLIST_SOURCES)[number];
export type WaitlistRequest = z.input<typeof waitlistRequestSchema>;

export const waitlistReplySchema = z.object({ joined: z.literal(true) });

export type WaitlistReply = z.infer<typeof waitlistReplySchema>;
