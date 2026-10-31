import type { VoiceClip } from "../copy/demoVoiceCopy";
import type { ListenOutcome } from "./demoListener";
import { listeningMisses } from "./listeningMisses";
import { matchChoice } from "./matchSpoken";

export type AsksAnswer =
  | { kind: "pick"; number: number }
  | { kind: "miss"; clip: VoiceClip };

export function asksAnswer(
  outcome: ListenOutcome,
  optionCount: number,
): AsksAnswer {
  if (outcome.kind !== "heard") {
    return { kind: "miss", clip: listeningMisses[outcome.kind].clip };
  }
  const spoken = matchChoice(outcome.transcript, optionCount);
  switch (spoken.kind) {
    case "pick":
      return { kind: "pick", number: spoken.number };
    case "outOfRange":
      return { kind: "miss", clip: "onlyThree" };
    case "none":
      return { kind: "miss", clip: "sayNumber" };
    default: {
      const unhandled: never = spoken;
      return unhandled;
    }
  }
}
