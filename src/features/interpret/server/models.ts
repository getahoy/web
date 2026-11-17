import { createAnthropic } from "@ai-sdk/anthropic";
import { createProviderRegistry } from "ai";
import { serverEnv } from "@/env/serverEnv";

const registry = createProviderRegistry({
  anthropic: createAnthropic({ apiKey: serverEnv.ANTHROPIC_API_KEY }),
});

const MODEL = "anthropic:claude-haiku-5-5";

export function languageModel() {
  return registry.languageModel(MODEL);
}
