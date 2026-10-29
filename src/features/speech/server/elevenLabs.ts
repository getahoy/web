import {
  ElevenLabsClient,
  ElevenLabsError,
  ElevenLabsTimeoutError,
} from "@elevenlabs/elevenlabs-js";
import { MAX_COMMAND_TEXT_CHARS, type SpeakVoice } from "@getahoy/protocol";
import { serverEnv } from "@/env/serverEnv";
import { logger } from "@/features/logging/server/logger";
import { COMMAND_KEYTERMS } from "./commandKeyterms";

const MODEL_ID = "scribe_v2";
const TIMEOUT_SECONDS = 10;
const RETRIES = 1;
// Flash is ElevenLabs' lowest-latency voice model; a small MP3 keeps the first bytes fast.
const SPEECH_MODEL_ID = "eleven_flash_v2_5";
const SPEECH_FORMAT = "mp3_22050_32";
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

function voiceIdFor(voice: SpeakVoice): string | undefined {
  return voice === "india"
    ? serverEnv.ELEVENLABS_VOICE_INDIA
    : serverEnv.ELEVENLABS_VOICE_DEFAULT;
}

export async function speakText(
  text: string,
  voice: SpeakVoice,
): Promise<SpokenAudio> {
  const voiceId = voiceIdFor(voice);
  if (!voiceId) return { outcome: "noVoice" };
  try {
    const stream = await client().textToSpeech.stream(
      voiceId,
      { text, modelId: SPEECH_MODEL_ID, outputFormat: SPEECH_FORMAT },
      { timeoutInSeconds: SPEECH_TIMEOUT_SECONDS, maxRetries: NO_RETRIES },
    );
    return { outcome: "audio", stream };
  } catch (error) {
    return unavailable(error);
  }
}
