import type { ShotScene } from "../motion/shotTimeline";

type SceneRule = {
  scene: ShotScene;
  words: readonly string[];
  joined: readonly string[];
};

const sceneRules: readonly SceneRule[] = [
  {
    scene: "draft",
    words: ["gmail", "mail", "email", "jake", "samar"],
    joined: ["gmail", "email"],
  },
  { scene: "note", words: ["note", "notes"], joined: [] },
  { scene: "draft", words: ["write", "draft"], joined: [] },
  {
    scene: "pause",
    words: ["pause", "youtube", "video", "stop"],
    joined: ["youtube"],
  },
];

const englishNumbers: Record<string, number> = {
  one: 1,
  first: 1,
  "1": 1,
  two: 2,
  second: 2,
  "2": 2,
  three: 3,
  third: 3,
  "3": 3,
  four: 4,
  fourth: 4,
  "4": 4,
  five: 5,
  fifth: 5,
  "5": 5,
};

const hindiNumbers: Record<string, number> = {
  ek: 1,
  do: 2,
  teen: 3,
  char: 4,
  paanch: 5,
};

function wordsOf(transcript: string): string[] {
  return transcript
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((word) => word !== "");
}

export function matchScene(transcript: string): ShotScene | null {
  const words = wordsOf(transcript);
  const joined = words.join("");
  const rule = sceneRules.find(
    (candidate) =>
      candidate.words.some((word) => words.includes(word)) ||
      candidate.joined.some((word) => joined.includes(word)),
  );
  return rule?.scene ?? null;
}

export type SpokenChoice =
  | { kind: "pick"; number: number }
  | { kind: "outOfRange" }
  | { kind: "none" };

function firstNumber(
  words: readonly string[],
  numbers: Record<string, number>,
): number | null {
  const found = words.find((word) => numbers[word] !== undefined);
  return found === undefined ? null : (numbers[found] ?? null);
}

export function matchChoice(
  transcript: string,
  optionCount: number,
): SpokenChoice {
  const words = wordsOf(transcript);
  const number =
    firstNumber(words, englishNumbers) ?? firstNumber(words, hindiNumbers);
  if (number === null) return { kind: "none" };
  if (number > optionCount) return { kind: "outOfRange" };
  return { kind: "pick", number };
}
