import { demoVoiceCopy, type VoiceClip } from "../copy/demoVoiceCopy";
import { landingCopy } from "../copy/landingCopy";
import type { ListenOutcome } from "./demoListener";
import { listeningMisses } from "./listeningMisses";
import { matchChoice } from "./matchSpoken";

export type AsksReply =
  | { kind: "pick"; number: number; clip: VoiceClip; text: string }
  | { kind: "say"; clip: VoiceClip; text: string };

const clickClips: readonly VoiceClip[] = [
  "clickedSave",
  "clickedSaveAs",
  "clickedSaveToFiles",
];

export function pickReply(number: number): AsksReply {
  const clip = clickClips[number - 1] ?? "clickedSave";
  return { kind: "pick", number, clip, text: demoVoiceCopy[clip] };
}

export function asksReply(
  outcome: ListenOutcome,
  optionCount: number,
): AsksReply {
  if (outcome.kind !== "heard") {
    const miss = listeningMisses[outcome.kind];
    return { kind: "say", clip: miss.clip, text: miss.message };
  }
  const choice = matchChoice(outcome.transcript, optionCount);
  switch (choice.kind) {
    case "pick":
      return pickReply(choice.number);
    case "outOfRange":
      return {
        kind: "say",
        clip: "onlyThree",
        text: landingCopy["asks.onlyThree"],
      };
    case "none":
      return {
        kind: "say",
        clip: "sayNumber",
        text: landingCopy["asks.sayNumber"],
      };
    default: {
      const unhandled: never = choice;
      return unhandled;
    }
  }
}
