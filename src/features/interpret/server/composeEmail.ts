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

const TIMEOUT_MS = 4000;

const emailSchema = z.object({
  subject: z.string().min(1).max(MAX_EMAIL_SUBJECT_CHARS),
  body: z.string().min(1).max(MAX_EMAIL_BODY_CHARS),
});

type Draft = Extract<InterpretAction, { kind: "draftEmail" }>;

function emailRequest(draft: Draft, text: string, sender: string): string {
  const to = draft.to ?? "";
  return `<request>${text}</request><to>${to}</to><sender>${sender}</sender>`;
}

function elapsed(startedAt: number): number {
  return Math.round(performance.now() - startedAt);
}

// The interpret step's rough subject and body stay when this step fails, so a draft always opens.
async function composeEmail(
  draft: Draft,
  text: string,
  sender: string,
): Promise<Draft> {
  const startedAt = performance.now();
  try {
    const response = await generateText({
      model: emailModel(),
      output: Output.object({ schema: emailSchema }),
      timeout: TIMEOUT_MS,
      maxRetries: NO_RETRIES,
      providerOptions: quick,
      instructions: [cachedSystem(EMAIL_INSTRUCTIONS)],
      prompt: emailRequest(draft, text, sender),
    });
    logger.info("email", `composed in ${elapsed(startedAt)} ms`);
    return { ...draft, ...response.output };
  } catch (error) {
    const reason = failureKind(error) ?? "error";
    logger.warn("email", `fallback: ${reason} in ${elapsed(startedAt)} ms`);
    return draft;
  }
}

export function composeEmails(
  actions: InterpretAction[],
  text: string,
  sender: string,
): Promise<InterpretAction[]> {
  const composed = actions.map((action) => {
    if (action.kind !== "draftEmail") return action;
    return composeEmail(action, text, sender);
  });
  return Promise.all(composed);
}
