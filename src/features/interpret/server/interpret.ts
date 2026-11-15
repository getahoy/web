import {
  type InterpretAction,
  interpretResponseSchema,
} from "@getahoy/protocol";
import { generateText, Output } from "ai";
import { logger } from "@/features/logging/server/logger";
import {
  INTERPRET_INSTRUCTIONS,
  installedAppsMessage,
} from "./interpretPrompt";
import { cachedSystem, failureKind, NO_RETRIES, quick } from "./modelCall";
import { interpretModel } from "./models";

const TIMEOUT_MS = 5000;

export type Interpretation =
  | { outcome: "actions"; actions: InterpretAction[] }
  | { outcome: "unavailable" };

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
