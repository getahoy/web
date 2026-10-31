import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { DEFAULT_CHOICE } from "../components/choiceOptions";

export type AsksPhase = "idle" | "listening" | "chosen" | "done";

const holds: Record<AsksPhase, number> = {
  idle: 2400,
  listening: 1600,
  chosen: 1000,
  done: 2600,
};

const nextPhase: Record<AsksPhase, AsksPhase> = {
  idle: "listening",
  listening: "chosen",
  chosen: "done",
  done: "idle",
};

export function useAsksLoop(active: boolean) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<AsksPhase>("idle");
  const [choice, setChoice] = useState(DEFAULT_CHOICE);
  const [userTurn, setUserTurn] = useState(false);

  useEffect(() => {
    if (reduced || !active) return;
    if (userTurn && (phase === "idle" || phase === "listening")) return;
    const timer = setTimeout(() => {
      const next = nextPhase[phase];
      if (next === "idle") {
        setChoice(DEFAULT_CHOICE);
        setUserTurn(false);
      }
      setPhase(next);
    }, holds[phase]);
    return () => clearTimeout(timer);
  }, [reduced, active, phase, userTurn]);

  return {
    phase,
    choice,
    userTurn,
    hold: (held: AsksPhase) => {
      setUserTurn(true);
      setPhase(held);
    },
    choose: (number: number) => {
      setUserTurn(true);
      setChoice(number);
      setPhase(reduced ? "done" : "chosen");
    },
  };
}
