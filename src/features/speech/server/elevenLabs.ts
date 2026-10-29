import {
  ElevenLabsClient,
  ElevenLabsError,
  ElevenLabsTimeoutError,
} from "@elevenlabs/elevenlabs-js";
import { MAX_COMMAND_TEXT_CHARS } from "@getahoy/protocol";
import { serverEnv } from "@/env/serverEnv";
import { logger } from "@/features/logging/server/logger";
import { COMMAND_KEYTERMS } from "./commandKeyterms";

const MODEL_ID = "scribe_v2";
const TIMEOUT_SECONDS = 10;
const RETRIES = 1;

export type Transcription =
  | { outcome: "heard"; text: string }
  | { outcome: "nothingHeard" }
  | { outcome: "unavailable" };

function providerFailure(error: unknown): string | null {
  if (error instanceof ElevenLabsTimeoutError) return "timeout";
  if (error instanceof ElevenLabsError) {
    return `api error, status ${error.statusCode ?? "none"}`;
  }
  return null;
}

export async function transcribeAudio(audio: File): Promise<Transcription> {
  const client = new ElevenLabsClient({
    apiKey: serverEnv.ELEVENLABS_API_KEY,
  });
  try {
    const response = await client.speechToText.convert(
      {
        modelId: MODEL_ID,
        file: audio,
        keyterms: [...COMMAND_KEYTERMS],
        tagAudioEvents: false,
      },
      { timeoutInSeconds: TIMEOUT_SECONDS, maxRetries: RETRIES },
    );
    const text = "text" in response ? response.text.trim() : "";
    if (text === "") return { outcome: "nothingHeard" };
    return { outcome: "heard", text: text.slice(0, MAX_COMMAND_TEXT_CHARS) };
  } catch (error) {
    const failure = providerFailure(error);
    if (!failure) throw error;
    logger.warn("speech", `ElevenLabs failed: ${failure}`);
    return { outcome: "unavailable" };
  }
}
