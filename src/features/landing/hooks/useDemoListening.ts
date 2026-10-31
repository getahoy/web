import { useEffect, useRef, useState } from "react";
import {
  createDemoListener,
  type DemoListener,
  type ListenOutcome,
} from "../listening/demoListener";

export type MicStatus = "checking" | "ready" | "listening" | "blocked";

const TICK_MS = 1000;

export function useDemoListening() {
  const listenerRef = useRef<DemoListener | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [status, setStatus] = useState<MicStatus>("checking");
  const [live, setLive] = useState("");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    listenerRef.current = createDemoListener();
    setStatus(listenerRef.current ? "ready" : "blocked");
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    if (status !== "listening") return;
    const timer = setInterval(() => setSeconds((past) => past + 1), TICK_MS);
    return () => clearInterval(timer);
  }, [status]);

  const listen = async (): Promise<ListenOutcome> => {
    const listener = listenerRef.current;
    if (!listener) return { kind: "unavailable" };
    const controller = new AbortController();
    abortRef.current = controller;
    setLive("");
    setSeconds(0);
    setStatus("listening");
    const outcome = await listener.listen({
      signal: controller.signal,
      onPartial: setLive,
    });
    const lost = outcome.kind === "denied" || outcome.kind === "unavailable";
    setStatus(lost ? "blocked" : "ready");
    return outcome;
  };

  const stop = () => abortRef.current?.abort();

  return { status, live, seconds, listen, stop };
}
