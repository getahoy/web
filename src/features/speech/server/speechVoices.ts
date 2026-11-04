import type { SpeakVoice } from "@getahoy/protocol";
import type { ServerEnv } from "@/env/serverEnv";

// Flash is ElevenLabs' lowest-latency voice model; a small MP3 keeps the first bytes fast.
export const SPEECH_MODEL_ID = "eleven_flash_v2_5";
export const SPEECH_FORMAT = "mp3_22050_32";

export const SPEECH_SETTINGS = { speed: 0.9 };
export const SENTENCE_PAUSE_SECONDS = 0.3;
const SENTENCE_END = /([.!?])\s+(?=\S)/g;

export function pacedText(
  text: string,
  pauseSeconds = SENTENCE_PAUSE_SECONDS,
): string {
  if (pauseSeconds === 0) return text;
  return text.replace(SENTENCE_END, `$1 <break time="${pauseSeconds}s" /> `);
}

export function voiceIdFor(
  env: ServerEnv,
  voice: SpeakVoice,
): string | undefined {
  return voice === "india"
    ? env.ELEVENLABS_VOICE_INDIA
    : env.ELEVENLABS_VOICE_DEFAULT;
}
