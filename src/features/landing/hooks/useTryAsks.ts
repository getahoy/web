import { useState } from "react";
import { landingCopy } from "../copy/landingCopy";
import { type AsksReply, asksReply, pickReply } from "../listening/asksReply";
import { useDemoListening } from "./useDemoListening";
import { useVoiceClips } from "./useVoiceClips";

export function useTryAsks(optionCount: number) {
  const listening = useDemoListening();
  const voice = useVoiceClips();
  const [selected, setSelected] = useState<number | null>(null);
  const [prompting, setPrompting] = useState(false);
  const [message, setMessage] = useState<string>(landingCopy["asks.idle"]);

  const answer = (reply: AsksReply) => {
    if (reply.kind === "pick") setSelected(reply.number);
    setMessage(reply.text);
    void voice.play(reply.clip);
  };

  const start = async () => {
    setSelected(null);
    setPrompting(true);
    setMessage(landingCopy["asks.prompt"]);
    await voice.play("asksPrompt");
    setPrompting(false);
    answer(asksReply(await listening.listen(), optionCount));
  };

  return {
    status: listening.status,
    selected,
    prompting,
    message,
    pick: (number: number) => answer(pickReply(number)),
    start: () => void start(),
    stop: listening.stop,
  };
}
