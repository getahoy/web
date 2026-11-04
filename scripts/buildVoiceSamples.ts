import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { SPEAK_VOICES, type SpeakVoice } from "@getahoy/protocol";
import { serverEnv } from "../src/env/serverEnv.ts";
import {
  pacedText,
  SENTENCE_PAUSE_SECONDS,
  SPEECH_FORMAT,
  SPEECH_MODEL_ID,
  SPEECH_SETTINGS,
  voiceIdFor,
} from "../src/features/speech/server/speechVoices.ts";

const PREVIEW_LINE =
  "Hey there! Your Mac’s all set. So, what are we working on today?";

const OUTPUT_DIRECTORY = join("..", "mobile", "assets", "voice-samples");
const CANDIDATE_DIRECTORY = join("scripts", "out", "voice-candidates");
const JSON_INDENT = 2;

type Pace = { speed: number; pauseSeconds: number };

const CURRENT_PACE: Pace = {
  speed: SPEECH_SETTINGS.speed,
  pauseSeconds: SENTENCE_PAUSE_SECONDS,
};

const PACE_CANDIDATES: Record<string, Pace> = {
  a: { speed: 1, pauseSeconds: 0 },
  b: { speed: 0.95, pauseSeconds: 0.15 },
  c: { speed: 0.9, pauseSeconds: 0.3 },
};

type SampleEntry = {
  voice: SpeakVoice;
  voiceId: string;
  text: string;
  generatedAt: string;
};

async function speak(client: ElevenLabsClient, voiceId: string, pace: Pace) {
  const stream = await client.textToSpeech.stream(voiceId, {
    text: pacedText(PREVIEW_LINE, pace.pauseSeconds),
    modelId: SPEECH_MODEL_ID,
    outputFormat: SPEECH_FORMAT,
    voiceSettings: { speed: pace.speed },
  });
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

function configuredVoiceIds(): [SpeakVoice, string][] {
  return SPEAK_VOICES.flatMap((voice) => {
    const voiceId = voiceIdFor(serverEnv, voice);
    if (voiceId) return [[voice, voiceId]];
    console.log(`${voice}  skipped, no server voice id`);
    return [];
  });
}

async function writeCandidates(client: ElevenLabsClient) {
  await mkdir(CANDIDATE_DIRECTORY, { recursive: true });
  for (const [voice, voiceId] of configuredVoiceIds()) {
    for (const [name, pace] of Object.entries(PACE_CANDIDATES)) {
      const audio = await speak(client, voiceId, pace);
      const fileName = `pace-${name}-${voice}.mp3`;
      await writeFile(join(CANDIDATE_DIRECTORY, fileName), audio);
      console.log(`${fileName}  ${audio.byteLength} bytes`);
    }
  }
}

async function writeSamples(client: ElevenLabsClient) {
  await mkdir(OUTPUT_DIRECTORY, { recursive: true });
  const entries: SampleEntry[] = [];
  for (const [voice, voiceId] of configuredVoiceIds()) {
    const audio = await speak(client, voiceId, CURRENT_PACE);
    await writeFile(join(OUTPUT_DIRECTORY, `${voice}.mp3`), audio);
    const generatedAt = new Date().toISOString();
    entries.push({ voice, voiceId, text: PREVIEW_LINE, generatedAt });
    console.log(`${voice}.mp3  ${audio.byteLength} bytes`);
  }
  const manifest = `${JSON.stringify(entries, null, JSON_INDENT)}\n`;
  await writeFile(join(OUTPUT_DIRECTORY, "manifest.json"), manifest);
}

const client = new ElevenLabsClient({ apiKey: serverEnv.ELEVENLABS_API_KEY });
if (process.argv.includes("--candidates")) {
  await writeCandidates(client);
} else {
  await writeSamples(client);
}
