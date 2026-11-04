import {
  ElevenLabsClient,
  ElevenLabsError,
  ElevenLabsTimeoutError,
} from "@elevenlabs/elevenlabs-js";
import {
  MAX_COMMAND_TEXT_CHARS,
  type SpeakVoice,
  type SpeakVoices,
} from "@getahoy/protocol";
import { serverEnv } from "@/env/serverEnv";
import { logger } from "@/features/logging/server/logger";
import { COMMAND_KEYTERMS } from "./commandKeyterms";
import {
  pacedText,
  SPEECH_FORMAT,
  SPEECH_MODEL_ID,
  SPEECH_SETTINGS,
  voiceIdFor,
} from "./speechVoices";

const MODEL_ID = "scribe_v2";
const TIMEOUT_SECONDS = 10;
const RETRIES = 1;
const SPEECH_TIMEOUT_SECONDS = 5;
const NO_RETRIES = 0;

export type Transcription =
  | { outcome: "heard"; text: string }
  | { outcome: "nothingHeard" }
  | { outcome: "unavailable" };

export type SpokenAudio =
  | { outcome: "audio"; stream: ReadableStream<Uint8Array> }
  | { outcome: "noVoice" }
  | { outcome: "unavailable" };

function providerFailure(error: unknown): string | null {
  if (error instanceof ElevenLabsTimeoutError) return "timeout";
  if (error instanceof ElevenLabsError) {
    return `api error, status ${error.statusCode ?? "none"}`;
  }
  return null;
}

function unavailable(error: unknown) {
  const failure = providerFailure(error);
  if (!failure) throw error;
  logger.warn("speech", `ElevenLabs failed: ${failure}`);
  return { outcome: "unavailable" } as const;
}

function client(): ElevenLabsClient {
  return new ElevenLabsClient({ apiKey: serverEnv.ELEVENLABS_API_KEY });
}

export async function transcribeAudio(audio: File): Promise<Transcription> {
  try {
    const response = await client().speechToText.convert(
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
    return unavailable(error);
  }
}

export function configuredVoices(): SpeakVoices {
  return {
    voices: {
      default: voiceIdFor(serverEnv, "default") ?? null,
      india: voiceIdFor(serverEnv, "india") ?? null,
    },
  };
}

export async function speakText(
  text: string,
  voice: SpeakVoice,
): Promise<SpokenAudio> {
  const voiceId = voiceIdFor(serverEnv, voice);
  if (!voiceId) return { outcome: "noVoice" };
  try {
    const stream = await client().textToSpeech.stream(
      voiceId,
      {
        text: pacedText(text),
        modelId: SPEECH_MODEL_ID,
        outputFormat: SPEECH_FORMAT,
        voiceSettings: SPEECH_SETTINGS,
      },
      { timeoutInSeconds: SPEECH_TIMEOUT_SECONDS, maxRetries: NO_RETRIES },
    );
    return { outcome: "audio", stream };
  } catch (error) {
    return unavailable(error);
  }
}
