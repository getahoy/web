import type { DemoListener, ListenOutcome } from "./demoListener";

const LANGUAGE = "en-IN";
const MAX_LISTEN_MS = 6000;

type RecognitionAlternative = { transcript: string };
type RecognitionResultEvent = {
  results: ArrayLike<ArrayLike<RecognitionAlternative>>;
};
type RecognitionErrorEvent = { error: string };

type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  onresult: ((event: RecognitionResultEvent) => void) | null;
  onerror: ((event: RecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type RecognitionConstructor = new () => Recognition;

function isRecognitionConstructor(
  candidate: unknown,
): candidate is RecognitionConstructor {
  return typeof candidate === "function";
}

function findRecognition(): RecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const candidate: unknown =
    Reflect.get(window, "SpeechRecognition") ??
    Reflect.get(window, "webkitSpeechRecognition");
  return isRecognitionConstructor(candidate) ? candidate : null;
}

function outcomeOfError(error: string): ListenOutcome {
  if (error === "not-allowed") return { kind: "denied" };
  if (error === "no-speech" || error === "aborted") return { kind: "silence" };
  return { kind: "unavailable" };
}

function listenOnce(
  Recognition: RecognitionConstructor,
  signal: AbortSignal,
): Promise<ListenOutcome> {
  return new Promise((resolve) => {
    const recognition = new Recognition();
    recognition.lang = LANGUAGE;
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
    let outcome: ListenOutcome = { kind: "silence" };
    const timer = setTimeout(() => recognition.stop(), MAX_LISTEN_MS);
    signal.addEventListener("abort", () => recognition.stop(), { once: true });
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim() ?? "";
      if (transcript !== "") outcome = { kind: "heard", transcript };
    };
    recognition.onerror = (event) => {
      outcome = outcomeOfError(event.error);
    };
    recognition.onend = () => {
      clearTimeout(timer);
      resolve(outcome);
    };
    try {
      recognition.start();
    } catch {
      clearTimeout(timer);
      resolve({ kind: "unavailable" });
    }
  });
}

export function createBrowserSpeechListener(): DemoListener | null {
  const Recognition = findRecognition();
  if (!Recognition) return null;
  return { listen: (signal) => listenOnce(Recognition, signal) };
}
