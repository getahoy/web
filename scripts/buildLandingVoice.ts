import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import {
  demoVoiceCopy,
  VOICE_CLIP_DIRECTORY,
} from "../src/features/landing/copy/demoVoiceCopy.ts";

const voiceEnvSchema = z.object({
  VOICE_API_URL: z.url().default("http://localhost:3000"),
  EVAL_EMAIL: z.email(),
  EVAL_PASSWORD: z.string().min(1),
});

type VoiceEnv = z.infer<typeof voiceEnvSchema>;

const OUTPUT_DIRECTORY = join("public", VOICE_CLIP_DIRECTORY);

async function signIn(env: VoiceEnv): Promise<string> {
  const response = await fetch(`${env.VOICE_API_URL}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: env.VOICE_API_URL },
    body: JSON.stringify({
      email: env.EVAL_EMAIL,
      password: env.EVAL_PASSWORD,
    }),
  });
  const token = response.headers.get("set-auth-token");
  if (!token) throw new Error(`Sign in failed with status ${response.status}`);
  return token;
}

async function speak(env: VoiceEnv, token: string, text: string) {
  const response = await fetch(`${env.VOICE_API_URL}/api/speak`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ text, voice: "default" }),
  });
  const contentType = response.headers.get("content-type") ?? "";
  if (!response.ok || !contentType.startsWith("audio/")) {
    const detail = await response.text();
    throw new Error(
      `Speak failed (${response.status}) for "${text}": ${detail}`,
    );
  }
  return new Uint8Array(await response.arrayBuffer());
}

async function main() {
  const env = voiceEnvSchema.parse(process.env);
  const token = await signIn(env);
  await mkdir(OUTPUT_DIRECTORY, { recursive: true });
  const only = process.argv.slice(2);
  const clips = Object.entries(demoVoiceCopy).filter(
    ([clip]) => only.length === 0 || only.includes(clip),
  );
  for (const [clip, text] of clips) {
    const audio = await speak(env, token, text);
    await writeFile(join(OUTPUT_DIRECTORY, `${clip}.mp3`), audio);
    console.log(`${clip}.mp3  ${audio.byteLength} bytes`);
  }
}

await main();
