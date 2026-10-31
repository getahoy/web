import { useState } from "react";
import { choiceOptions, clipOf } from "../copy/choiceOptions";
import { asksAnswer } from "../listening/asksAnswer";
import type { ListenOutcome } from "../listening/demoListener";
import { useAsksLoop } from "./useAsksLoop";
import { useDemoListening } from "./useDemoListening";
import { useVoiceClips } from "./useVoiceClips";

export function useAsksDemo(active: boolean) {
  const loop = useAsksLoop(active);
  const mic = useDemoListening();
  const voice = useVoiceClips();
  const [heard, setHeard] = useState<string | null>(null);

  const choose = (number: number) => {
    loop.choose(number);
    const clip = clipOf(number);
    if (clip) voice.play(clip);
  };

  const settle = (outcome: ListenOutcome) => {
    if (outcome.kind === "heard") setHeard(outcome.transcript);
    const answer = asksAnswer(outcome, choiceOptions.length);
    if (answer.kind === "pick") return choose(answer.number);
    loop.hold("idle");
    voice.play(answer.clip);
  };

  const tapMic = () => {
    if (mic.status === "listening") return mic.stop();
    if (mic.status !== "ready") return;
    voice.unlock();
    setHeard(null);
    loop.hold("listening");
    void mic.listen().then(settle);
  };

  return {
    loop,
    mic,
    heard,
    tapMic,
    pick: (number: number) => {
      setHeard(null);
      choose(number);
    },
  };
}
