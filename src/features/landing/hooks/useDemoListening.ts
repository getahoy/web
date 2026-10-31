import { useEffect, useRef, useState } from "react";
import {
  createDemoListener,
  type DemoListener,
  type ListenOutcome,
} from "../listening/demoListener";

export type ListeningStatus = "checking" | "ready" | "listening" | "off";

export function useDemoListening() {
  const listenerRef = useRef<DemoListener | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [status, setStatus] = useState<ListeningStatus>("checking");

  useEffect(() => {
    listenerRef.current = createDemoListener();
    setStatus(listenerRef.current ? "ready" : "off");
    return () => abortRef.current?.abort();
  }, []);

  const listen = async (): Promise<ListenOutcome> => {
    const listener = listenerRef.current;
    if (!listener) return { kind: "unavailable" };
    const controller = new AbortController();
    abortRef.current = controller;
    setStatus("listening");
    const outcome = await listener.listen(controller.signal);
    const lost = outcome.kind === "denied" || outcome.kind === "unavailable";
    setStatus(lost ? "off" : "ready");
    return outcome;
  };

  const stop = () => abortRef.current?.abort();

  return { status, listen, stop };
}
