import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import {
  PROMPT_LINES,
  SENTENCE_PAUSE_SECONDS,
  SPEAK_VOICES,
  SPEECH_SPEED,
  type SpeakVoice,
  VOICE_PREVIEW_LINE,
} from "@getahoy/protocol";
import { z } from "zod";
import { serverEnv } from "../src/env/serverEnv.ts";
import {
  pacedText,
  SPEECH_FORMAT,
  SPEECH_MODEL_ID,
  voiceIdFor,
} from "../src/features/speech/server/speechVoices.ts";

const OUTPUT_DIRECTORY = join("..", "mobile", "assets", "voice-samples");
const CANDIDATE_DIRECTORY = join("scripts", "out", "voice-candidates");
const JSON_INDENT = 2;

type Pace = { speed: number; pauseSeconds: number };

const CURRENT_PACE: Pace = {
  speed: SPEECH_SPEED,
  pauseSeconds: SENTENCE_PAUSE_SECONDS,
};

const PACE_CANDIDATES: Record<string, Pace> = {
  a: { speed: 1, pauseSeconds: 0 },
  b: { speed: 0.95, pauseSeconds: 0.15 },
  c: { speed: 0.9, pauseSeconds: 0.3 },
};

type Clip = "sample" | keyof typeof PROMPT_LINES;

type SampleEntry = {
  voice: SpeakVoice;
  clip: Clip;
  voiceId: string;
  text: string;
  generatedAt: string;
};

async function speak(
  client: ElevenLabsClient,
  voiceId: string,
  pace: Pace,
  line = VOICE_PREVIEW_LINE,
) {
  const stream = await client.textToSpeech.stream(voiceId, {
    text: pacedText(line, pace.pauseSeconds),
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

const MANIFEST = join(OUTPUT_DIRECTORY, "manifest.json");

const fileFor = (voice: SpeakVoice, clip: Clip) =>
  clip === "sample" ? `${voice}.mp3` : `${voice}-${clip}.mp3`;

async function record(
  client: ElevenLabsClient,
  clips: readonly [Clip, string][],
): Promise<SampleEntry[]> {
  await mkdir(OUTPUT_DIRECTORY, { recursive: true });
  const entries: SampleEntry[] = [];
  for (const [voice, voiceId] of configuredVoiceIds()) {
    for (const [clip, text] of clips) {
      const audio = await speak(client, voiceId, CURRENT_PACE, text);
      await writeFile(join(OUTPUT_DIRECTORY, fileFor(voice, clip)), audio);
      const generatedAt = new Date().toISOString();
      entries.push({ voice, clip, voiceId, text, generatedAt });
      console.log(`${fileFor(voice, clip)}  ${audio.byteLength} bytes`);
    }
  }
  return entries;
}

const storedSchema = z.array(
  z.object({
    voice: z.enum(SPEAK_VOICES),
    clip: z.enum(["sample", "whichOne", "confirm"]).default("sample"),
    voiceId: z.string(),
    text: z.string(),
    generatedAt: z.string(),
  }),
);

async function keptEntries(dropped: readonly Clip[]): Promise<SampleEntry[]> {
  const text = await readFile(MANIFEST, "utf8").catch(() => "[]");
  const stored = storedSchema.parse(JSON.parse(text));
  return stored.filter((entry) => !dropped.includes(entry.clip));
}

async function writeClips(client: ElevenLabsClient, clips: [Clip, string][]) {
  const kept = await keptEntries(clips.map(([clip]) => clip));
  const entries = [...kept, ...(await record(client, clips))];
  const manifest = `${JSON.stringify(entries, null, JSON_INDENT)}\n`;
  await writeFile(MANIFEST, manifest);
}

const client = new ElevenLabsClient({ apiKey: serverEnv.ELEVENLABS_API_KEY });
if (process.argv.includes("--candidates")) {
  await writeCandidates(client);
} else if (process.argv.includes("--prompts")) {
  await writeClips(client, [
    ["whichOne", PROMPT_LINES.whichOne],
    ["confirm", PROMPT_LINES.confirm],
  ]);
} else {
  await writeClips(client, [["sample", VOICE_PREVIEW_LINE]]);
}
