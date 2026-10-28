import { request } from "@getahoy/lib";
import {
  type InterpretAction,
  interpretResponseSchema,
} from "@getahoy/protocol";
import { z } from "zod";
import { EVAL_APPS, EVAL_CASES, type EvalCase } from "./interpretCases.ts";
import { HELD_OUT_CASES } from "./interpretHeldOut.ts";

const evalEnvSchema = z.object({
  EVAL_API_URL: z.url().default("http://localhost:3000"),
  EVAL_EMAIL: z.email(),
  EVAL_PASSWORD: z.string().min(1),
});

const PHRASE_WIDTH = 34;
const EXPECTED_WIDTH = 44;
const TIME_WIDTH = 5;

type Outcome = { passed: boolean; got: string; elapsedMs: number };

function plain(text: string): string {
  return text
    .toLowerCase()
    .replace(/[!?,.;:"“”‘’']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function inBrowser(browser: string | null): string {
  return browser ? ` in ${browser}` : "";
}

function describe(action: InterpretAction): string {
  switch (action.kind) {
    case "open":
    case "quit":
    case "hide":
    case "switch":
      return `${action.kind} ${action.app}`;
    case "search":
      return `search "${action.query}"${inBrowser(action.browser)}`;
    case "openSite":
      return `site ${action.host}${inBrowser(action.browser)}`;
    case "keys":
      return `keys ${[...action.modifiers].sort().join("+")}+${action.key}`;
    case "type":
      return `type "${action.text}"`;
    case "closeTab":
    case "switchTab":
      return `${action.kind} ${action.match} in ${action.browser ?? "any"}`;
    case "draftEmail":
      return `draft to ${action.to ?? "nobody"} via ${action.via}${inBrowser(action.browser)}`;
    default: {
      const unhandled: never = action;
      return unhandled;
    }
  }
}

function describeAll(actions: readonly InterpretAction[]): string {
  return actions.length === 0 ? "none" : actions.map(describe).join(", ");
}

function sameActions(
  got: readonly InterpretAction[],
  want: readonly InterpretAction[],
): boolean {
  const key = (action: InterpretAction) => plain(describe(action));
  return (
    got.length === want.length &&
    got.every((action, index) => {
      const wanted = want[index];
      return wanted !== undefined && key(action) === key(wanted);
    })
  );
}

function fit(text: string, width: number): string {
  if (text.length <= width) return text.padEnd(width);
  return `${text.slice(0, width - 1)}…`;
}

async function signIn(env: z.infer<typeof evalEnvSchema>): Promise<string> {
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

async function runCase(
  apiUrl: string,
  token: string,
  evalCase: EvalCase,
): Promise<Outcome> {
  const startedAt = performance.now();
  const answer = await request({
    url: `${apiUrl}/api/interpret`,
    method: "POST",
    body: { text: evalCase.text, apps: EVAL_APPS },
    headers: { authorization: `Bearer ${token}` },
    schema: interpretResponseSchema,
  });
  const elapsedMs = Math.round(performance.now() - startedAt);
  if (answer.code === "error") {
    return { passed: false, got: `error ${answer.error.kind}`, elapsedMs };
  }
  const { actions } = answer.data;
  const passed = evalCase.accept.some((want) => sameActions(actions, want));
  return { passed, got: describeAll(actions), elapsedMs };
}

function printRow(index: number, evalCase: EvalCase, outcome: Outcome) {
  const expected = evalCase.accept.map(describeAll).join(" | ");
  const mark = outcome.passed ? "PASS" : "FAIL";
  const time = String(outcome.elapsedMs).padStart(TIME_WIDTH);
  const number = String(index + 1).padStart(2);
  const phrase = fit(evalCase.text, PHRASE_WIDTH);
  console.log(
    `${number} ${mark} ${time} ms  ${phrase}  ${fit(expected, EXPECTED_WIDTH)}  ${outcome.got}`,
  );
}

type CaseSet = { name: string; cases: readonly EvalCase[] };

async function runSet(apiUrl: string, token: string, set: CaseSet) {
  console.log(`\n${set.name}`);
  const outcomes: Outcome[] = [];
  for (const [index, evalCase] of set.cases.entries()) {
    const outcome = await runCase(apiUrl, token, evalCase);
    outcomes.push(outcome);
    printRow(index, evalCase, outcome);
  }
  const passed = outcomes.filter((outcome) => outcome.passed).length;
  const totalMs = outcomes.reduce((sum, outcome) => sum + outcome.elapsedMs, 0);
  const averageMs = Math.round(totalMs / outcomes.length);
  return `${set.name}: ${passed}/${outcomes.length} passed, average ${averageMs} ms`;
}

async function main(): Promise<void> {
  const env = evalEnvSchema.parse(process.env);
  const token = await signIn(env);
  const sets: CaseSet[] = [
    { name: "Tuning set", cases: EVAL_CASES },
    { name: "Held-out set", cases: HELD_OUT_CASES },
  ];
  const totals: string[] = [];
  for (const set of sets) {
    totals.push(await runSet(env.EVAL_API_URL, token, set));
  }
  console.log(`\n${totals.join("\n")}`);
}

void main();
