import {
  type InterpretAction,
  MAX_EMAIL_BODY_CHARS,
  MAX_EMAIL_SUBJECT_CHARS,
} from "@getahoy/protocol";
import { generateText, Output } from "ai";
import { z } from "zod";
import { logger } from "@/features/logging/server/logger";
import { EMAIL_INSTRUCTIONS } from "./emailPrompt";
import { cachedSystem, failureKind, NO_RETRIES, quick } from "./modelCall";
import { emailModel } from "./models";
import { withSpokenGreeting } from "./spokenGreeting";

const TIMEOUT_MS = 4000;
// The Mac stops waiting for the whole answer after 7 s, so the email step only gets what is left.
const ANSWER_BUDGET_MS = 6500;

const emailSchema = z.object({
  subject: z.string().min(1).max(MAX_EMAIL_SUBJECT_CHARS),
  body: z.string().min(1).max(MAX_EMAIL_BODY_CHARS),
});

type Draft = Extract<InterpretAction, { kind: "draftEmail" }>;
type EmailContext = { text: string; sender: string; answerStartedAt: number };

function emailRequest(draft: Draft, { text, sender }: EmailContext): string {
  const to = draft.to ?? "";
  return `<request>${text}</request><to>${to}</to><sender>${sender}</sender>`;
}

function elapsed(startedAt: number): number {
  return Math.round(performance.now() - startedAt);
}

// The interpret step's rough subject and body stay when this step fails, so a draft always opens.
async function composeEmail(
  draft: Draft,
  context: EmailContext,
): Promise<Draft> {
  const startedAt = performance.now();
  const timeout = Math.min(
    TIMEOUT_MS,
    ANSWER_BUDGET_MS - elapsed(context.answerStartedAt),
  );
  try {
    const response = await generateText({
      model: emailModel(),
      output: Output.object({ schema: emailSchema }),
      timeout,
      maxRetries: NO_RETRIES,
      providerOptions: quick,
      instructions: [cachedSystem(EMAIL_INSTRUCTIONS)],
      prompt: emailRequest(draft, context),
    });
    logger.info("email", `composed in ${elapsed(startedAt)} ms`);
    const { subject, body } = response.output;
    return { ...draft, subject, body: withSpokenGreeting(body, context.text) };
  } catch (error) {
    const reason = failureKind(error) ?? "error";
    logger.warn("email", `fallback: ${reason} in ${elapsed(startedAt)} ms`);
    return draft;
  }
}

export function composeEmails(
  actions: InterpretAction[],
  context: EmailContext,
): Promise<InterpretAction[]> {
  const composed = actions.map((action) => {
    if (action.kind !== "draftEmail") return action;
    return composeEmail(action, context);
  });
  return Promise.all(composed);
}
