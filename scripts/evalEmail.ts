import { request } from "@getahoy/lib";
import {
  INTERPRET_ACTION_KINDS,
  interpretResponseSchema,
} from "@getahoy/protocol";
import { z } from "zod";
import { EMAIL_CASES, type EmailCase } from "./emailCases.ts";

const evalEnvSchema = z.object({
  EVAL_API_URL: z.url().default("http://localhost:3000"),
  EVAL_EMAIL: z.email(),
  EVAL_PASSWORD: z.string().min(1),
});
const sessionSchema = z.object({ user: z.object({ name: z.string() }) });

const MIN_SUBJECT_WORDS = 2;
const MAX_SUBJECT_WORDS = 7;
const MAX_BODY_WORDS = 130;
const SAMPLES = 3;
const BANNED = ["[", "finds you well", "reach out", "—"];
const EMOJI = /\p{Extended_Pictographic}/u;
const NAMELESS_GREETING = /^(?:Hi|Hello),$/;

type Email = { subject: string; body: string };
type Env = z.infer<typeof evalEnvSchema>;

function words(text: string): string[] {
  return text.split(/\s+/).filter((word) => word !== "");
}

function plain(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shapeProblems({ subject, body }: Email): string[] {
  const found: string[] = [];
  const count = words(subject).length;
  if (count < MIN_SUBJECT_WORDS || count > MAX_SUBJECT_WORDS) {
    found.push(`subject has ${count} words`);
  }
  if (subject.trim().endsWith(".")) found.push("subject ends with a full stop");
  if (words(body).length >= MAX_BODY_WORDS) found.push("body too long");
  for (const banned of BANNED) {
    if (body.toLowerCase().includes(banned)) found.push(`has "${banned}"`);
  }
  if (EMOJI.test(body)) found.push("has an emoji");
  return found;
}

function voiceProblems(body: string, evalCase: EmailCase, sender: string) {
  const found: string[] = [];
  const { dictated, named } = evalCase;
  if (dictated && !plain(body).includes(plain(dictated))) {
    found.push("dictated words missing");
  }
  const lines = body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const greeting = lines[0] ?? "";
  if (named === null && !NAMELESS_GREETING.test(greeting)) {
    found.push(`greeting "${greeting}" without a spoken name`);
  }
  if (named && named !== "unchecked" && !greeting.includes(named)) {
    found.push(`greeting "${greeting}" misses ${named}`);
  }
  if (sender && lines.at(-1) !== sender) {
    found.push("sign-off misses the sender");
  }
  return found;
}

async function signIn(env: Env): Promise<string> {
  const response = await fetch(`${env.EVAL_API_URL}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: env.EVAL_API_URL },
    body: JSON.stringify({
      email: env.EVAL_EMAIL,
      password: env.EVAL_PASSWORD,
    }),
  });
  const token = response.headers.get("set-auth-token");
  if (!token) throw new Error(`Sign in failed with status ${response.status}`);
  return token;
}

async function senderName(apiUrl: string, token: string): Promise<string> {
  const response = await fetch(`${apiUrl}/api/auth/get-session`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const session = sessionSchema.parse(await response.json());
  return session.user.name.trim().split(/\s+/)[0] ?? "";
}

async function emailFor(apiUrl: string, token: string, text: string) {
  const answer = await request({
    url: `${apiUrl}/api/interpret`,
    method: "POST",
    body: { text, apps: [], supports: INTERPRET_ACTION_KINDS },
    headers: { authorization: `Bearer ${token}` },
    schema: interpretResponseSchema,
  });
  if (answer.code === "error") return null;
  const { actions } = answer.data;
  const draft = actions.find((action) => action.kind === "draftEmail");
  return draft ? { subject: draft.subject, body: draft.body } : null;
}

async function main(): Promise<void> {
  const env = evalEnvSchema.parse(process.env);
  const token = await signIn(env);
  const sender = await senderName(env.EVAL_API_URL, token);
  const samples: string[] = [];
  let passed = 0;
  for (const [index, evalCase] of EMAIL_CASES.entries()) {
    const email = await emailFor(env.EVAL_API_URL, token, evalCase.text);
    const found = email
      ? [
          ...shapeProblems(email),
          ...voiceProblems(email.body, evalCase, sender),
        ]
      : ["no draft"];
    if (found.length === 0) passed += 1;
    const mark = found.length === 0 ? "PASS" : "FAIL";
    const number = String(index + 1).padStart(2);
    console.log(`${number} ${mark}  ${evalCase.text}  ${found.join("; ")}`);
    if (email && found.length === 0 && samples.length < SAMPLES) {
      const sample = `> ${evalCase.text}\nSubject: ${email.subject}`;
      samples.push(`${sample}\n${email.body}`);
    }
  }
  const total = `Emails: ${passed}/${EMAIL_CASES.length} passed`;
  console.log(`\n${total}\n\n${samples.join("\n\n")}`);
}

void main();
