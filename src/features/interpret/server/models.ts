import { createAnthropic } from "@ai-sdk/anthropic";
import { createProviderRegistry } from "ai";
import { serverEnv } from "@/env/serverEnv";

const registry = createProviderRegistry({
  anthropic: createAnthropic({ apiKey: serverEnv.ANTHROPIC_API_KEY }),
});

export const MODELS = ["anthropic:claude-haiku-5-5"] as const;

export type ModelId = (typeof MODELS)[number];

export const DEFAULT_MODEL: ModelId = "anthropic:claude-haiku-5-5";

export function interpretModel() {
  return registry.languageModel(DEFAULT_MODEL);
}
