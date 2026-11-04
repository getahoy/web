import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { SPEAK_VOICES, type SpeakVoice } from "@getahoy/protocol";
import { serverEnv } from "../src/env/serverEnv.ts";
import {
  pacedText,
  SPEECH_FORMAT,
  SPEECH_MODEL_ID,
  SPEECH_SETTINGS,
  voiceIdFor,
} from "../src/features/speech/server/speechVoices.ts";

const PREVIEW_LINE =
  "Hey there! Your Mac’s all set. So, what are we working on today?";

const OUTPUT_DIRECTORY = join("..", "mobile", "assets", "voice-samples");
const JSON_INDENT = 2;

type SampleEntry = {
  voice: SpeakVoice;
  voiceId: string;
  text: string;
  generatedAt: string;
};

async function speak(client: ElevenLabsClient, voiceId: string) {
  const stream = await client.textToSpeech.stream(voiceId, {
    text: pacedText(PREVIEW_LINE),
    modelId: SPEECH_MODEL_ID,
    outputFormat: SPEECH_FORMAT,
    voiceSettings: SPEECH_SETTINGS,
  });
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function main() {
  const client = new ElevenLabsClient({ apiKey: serverEnv.ELEVENLABS_API_KEY });
  await mkdir(OUTPUT_DIRECTORY, { recursive: true });
  const entries: SampleEntry[] = [];
  for (const voice of SPEAK_VOICES) {
    const voiceId = voiceIdFor(serverEnv, voice);
    if (!voiceId) {
      console.log(`${voice}  skipped, no server voice id`);
      continue;
    }
    const audio = await speak(client, voiceId);
    await writeFile(join(OUTPUT_DIRECTORY, `${voice}.mp3`), audio);
    const generatedAt = new Date().toISOString();
    entries.push({ voice, voiceId, text: PREVIEW_LINE, generatedAt });
    console.log(`${voice}.mp3  ${audio.byteLength} bytes`);
  }
  const manifest = `${JSON.stringify(entries, null, JSON_INDENT)}\n`;
  await writeFile(join(OUTPUT_DIRECTORY, "manifest.json"), manifest);
}

await main();
