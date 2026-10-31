import { clickedLine, labelOf } from "../copy/choiceOptions";
import { illustrationCopy as copy } from "../copy/illustrationCopy";
import type { AsksPhase } from "../hooks/useAsksLoop";
import type { MicStatus } from "../hooks/useDemoListening";
import { demoTimer, micTimer, quote } from "../listening/spokenText";
import { micBarState, type PhoneBar } from "./micBarState";

type AsksState = {
  phase: AsksPhase;
  choice: number;
  userTurn: boolean;
  heard: string | null;
  micStatus: MicStatus;
  micLive: string;
  micSeconds: number;
};

export type AsksPill = {
  label: string;
  indicator: "none" | "wave" | "done";
  timer: "none" | "draining";
};

function heardLine(state: AsksState): string | null {
  if (state.userTurn) return state.heard ? quote(state.heard) : null;
  return state.phase === "chosen" ? quote(copy["choice.autoHeard"]) : null;
}

function bar(state: AsksState): PhoneBar {
  const start = copy["choice.start"];
  if (state.micStatus === "blocked") {
    const label = copy["choice.unavailable"];
    return micBarState("blocked", copy["choice.barBlocked"], label);
  }
  if (state.micStatus === "listening") {
    const live = state.micLive;
    const text = live === "" ? copy["bar.listening"] : quote(live);
    const timer = micTimer(state.micSeconds);
    return micBarState("listening", text, copy["bar.stop"], timer);
  }
  if (state.phase === "listening") {
    const text = copy["bar.listening"];
    return micBarState("showListening", text, start, demoTimer);
  }
  const heard = heardLine(state);
  if (state.phase === "chosen" && heard) {
    return micBarState("sending", heard, start);
  }
  return micBarState("idle", copy["choice.bar"], start);
}

const pillState = (
  label: string,
  indicator: AsksPill["indicator"],
  timer: AsksPill["timer"] = "none",
): AsksPill => ({ label, indicator, timer });

function pill(state: AsksState): AsksPill {
  if (state.micStatus === "listening" || state.phase === "listening") {
    return pillState(copy["overlay.listening"], "wave");
  }
  if (state.phase === "chosen") {
    const label = `${copy["choice.clicking"]} ${labelOf(state.choice)}`;
    return pillState(label, "none");
  }
  if (state.phase === "done") {
    return pillState(clickedLine(state.choice), "done");
  }
  return pillState(copy["overlay.choose"], "none", "draining");
}

export function asksView(state: AsksState) {
  const chosen = state.phase === "chosen" || state.phase === "done";
  return {
    bar: bar(state),
    pill: pill(state),
    picked: chosen ? state.choice : null,
  };
}
