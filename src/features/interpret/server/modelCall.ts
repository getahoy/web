import type { AnthropicLanguageModelOptions } from "@ai-sdk/anthropic";
import {
  APICallError,
  NoObjectGeneratedError,
  type SystemModelMessage,
} from "ai";

export const NO_RETRIES = 0;

// An hour outlasts a quiet spell, so the first command after a break is not a cold, slow call.
const cached = {
  anthropic: { cacheControl: { type: "ephemeral", ttl: "1h" } },
} satisfies { anthropic: AnthropicLanguageModelOptions };

export const quick = {
  anthropic: { thinking: { type: "disabled" }, effort: "low" },
} satisfies { anthropic: AnthropicLanguageModelOptions };

export function cachedSystem(content: string): SystemModelMessage {
  return { role: "system", content, providerOptions: cached };
}

export function failureKind(error: unknown): string | null {
  if (APICallError.isInstance(error)) {
    return `api error, status ${error.statusCode ?? "none"}`;
  }
  if (NoObjectGeneratedError.isInstance(error)) return "invalid output";
  const timedOut =
    error instanceof Error &&
    (error.name === "TimeoutError" || error.name === "AbortError");
  return timedOut ? "timeout" : null;
}
