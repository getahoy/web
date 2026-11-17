import {
  type InterpretAction,
  interpretResponseSchema,
} from "@getahoy/protocol";
import { generateText, Output, type SystemModelMessage } from "ai";
import { logger } from "@/features/logging/server/logger";
import {
  INTERPRET_INSTRUCTIONS,
  installedAppsMessage,
  screenMessage,
} from "./interpretPrompt";
import { cachedSystem, failureKind, NO_RETRIES, quick } from "./modelCall";
import { languageModel } from "./models";

const TIMEOUT_MS = 5000;
// Enough for several actions with placeholder drafts; a long answer would only be slow.
const MAX_OUTPUT_TOKENS = 300;

export type Interpretation =
  | { outcome: "actions"; actions: InterpretAction[] }
  | { outcome: "unavailable" };

export async function interpret(
  text: string,
  apps: readonly string[],
  screen: readonly string[],
): Promise<Interpretation> {
  const onScreen = { role: "system", content: screenMessage(screen) } as const;
  const controls: SystemModelMessage[] = screen.length > 0 ? [onScreen] : [];
  const startedAt = performance.now();
  const took = () => Math.round(performance.now() - startedAt);
  try {
    const response = await generateText({
      model: languageModel(),
      output: Output.object({ schema: interpretResponseSchema }),
      timeout: TIMEOUT_MS,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      maxRetries: NO_RETRIES,
      providerOptions: quick,
      instructions: [
        cachedSystem(INTERPRET_INSTRUCTIONS),
        cachedSystem(installedAppsMessage(apps)),
        ...controls,
      ],
      prompt: text,
    });
    logger.info("interpret", `answered in ${took()} ms`);
    return { outcome: "actions", actions: response.output.actions };
  } catch (error) {
    const failure = failureKind(error);
    if (!failure) throw error;
    logger.warn("interpret", `Model failed: ${failure} in ${took()} ms`);
    return { outcome: "unavailable" };
  }
}
