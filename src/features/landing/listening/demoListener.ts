import { createBrowserSpeechListener } from "./browserSpeechListener";

export type ListenOutcome =
  | { kind: "heard"; transcript: string }
  | { kind: "silence" }
  | { kind: "denied" }
  | { kind: "unavailable" };

export type ListenOptions = {
  signal: AbortSignal;
  onPartial: (transcript: string) => void;
};

export type DemoListener = {
  listen: (options: ListenOptions) => Promise<ListenOutcome>;
};

// The one place that picks how the demo listens. Swap this line for a listener that
// records audio and sends it to a speech service to reach browsers without built-in speech.
export function createDemoListener(): DemoListener | null {
  return createBrowserSpeechListener();
}
