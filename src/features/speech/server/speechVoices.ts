import type { SpeakVoice } from "@getahoy/protocol";
import type { ServerEnv } from "@/env/serverEnv";

// Flash is ElevenLabs' lowest-latency voice model; a small MP3 keeps the first bytes fast.
export const SPEECH_MODEL_ID = "eleven_flash_v2_5";
export const SPEECH_FORMAT = "mp3_22050_32";

export const SPEECH_SETTINGS = { speed: 0.9 };
const SENTENCE_PAUSE = '<break time="0.3s" />';
const SENTENCE_END = /([.!?])\s+(?=\S)/g;

export function pacedText(text: string): string {
  return text.replace(SENTENCE_END, `$1 ${SENTENCE_PAUSE} `);
}

export function voiceIdFor(
  env: ServerEnv,
  voice: SpeakVoice,
): string | undefined {
  return voice === "india"
    ? env.ELEVENLABS_VOICE_INDIA
    : env.ELEVENLABS_VOICE_DEFAULT;
}
