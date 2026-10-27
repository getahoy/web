import type { AnthropicLanguageModelOptions } from "@ai-sdk/anthropic";
import {
  type InterpretAction,
  interpretResponseSchema,
} from "@getahoy/protocol";
import {
  APICallError,
  generateText,
  NoObjectGeneratedError,
  Output,
  type SystemModelMessage,
} from "ai";
import { logger } from "@/features/logging/server/logger";
import {
  INTERPRET_INSTRUCTIONS,
  installedAppsMessage,
} from "./interpretPrompt";
import { interpretModel } from "./models";

const TIMEOUT_MS = 5000;
const NO_RETRIES = 0;

const cached = {
  anthropic: { cacheControl: { type: "ephemeral" } },
} satisfies { anthropic: AnthropicLanguageModelOptions };

const quick = {
  anthropic: { thinking: { type: "disabled" }, effort: "low" },
} satisfies { anthropic: AnthropicLanguageModelOptions };

function cachedSystem(content: string): SystemModelMessage {
  return { role: "system", content, providerOptions: cached };
}

export type Interpretation =
  | { outcome: "actions"; actions: InterpretAction[] }
  | { outcome: "unavailable" };

function failureKind(error: unknown): string | null {
  if (APICallError.isInstance(error)) {
    return `api error, status ${error.statusCode ?? "none"}`;
  }
  if (NoObjectGeneratedError.isInstance(error)) return "invalid output";
  const timedOut =
    error instanceof Error &&
    (error.name === "TimeoutError" || error.name === "AbortError");
  return timedOut ? "timeout" : null;
}

export async function interpret(
  text: string,
  apps: readonly string[],
): Promise<Interpretation> {
  try {
    const response = await generateText({
      model: interpretModel(),
      output: Output.object({ schema: interpretResponseSchema }),
      timeout: TIMEOUT_MS,
      maxRetries: NO_RETRIES,
      providerOptions: quick,
      instructions: [
        cachedSystem(INTERPRET_INSTRUCTIONS),
        cachedSystem(installedAppsMessage(apps)),
      ],
      prompt: text,
    });
    return { outcome: "actions", actions: response.output.actions };
  } catch (error) {
    const failure = failureKind(error);
    if (!failure) throw error;
    logger.warn("interpret", `Model failed: ${failure}`);
    return { outcome: "unavailable" };
  }
}
