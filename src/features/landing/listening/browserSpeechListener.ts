import type {
  DemoListener,
  ListenOptions,
  ListenOutcome,
} from "./demoListener";

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

function joinedTranscript(event: RecognitionResultEvent): string {
  return Array.from(event.results, (result) => result[0]?.transcript ?? "")
    .join("")
    .trim();
}

function listenOnce(
  Recognition: RecognitionConstructor,
  options: ListenOptions,
): Promise<ListenOutcome> {
  return new Promise((resolve) => {
    const recognition = new Recognition();
    recognition.lang = LANGUAGE;
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
    let heard = "";
    let failure: ListenOutcome | null = null;
    const timer = setTimeout(() => recognition.stop(), MAX_LISTEN_MS);
    const stop = () => recognition.stop();
    options.signal.addEventListener("abort", stop, { once: true });
    recognition.onresult = (event) => {
      heard = joinedTranscript(event);
      options.onPartial(heard);
    };
    recognition.onerror = (event) => {
      failure = outcomeOfError(event.error);
    };
    recognition.onend = () => {
      clearTimeout(timer);
      if (heard !== "") resolve({ kind: "heard", transcript: heard });
      else resolve(failure ?? { kind: "silence" });
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
  return { listen: (options) => listenOnce(Recognition, options) };
}
