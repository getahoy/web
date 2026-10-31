import { illustrationCopy as copy } from "../copy/illustrationCopy";
import { landingCopy } from "../copy/landingCopy";
import { shotScenes } from "../copy/shotScenes";
import type { MicStatus } from "../hooks/useDemoListening";
import type { ShotMode } from "../hooks/useShotSteps";
import { demoTimer, micTimer, quote } from "../listening/spokenText";
import {
  SCENE_MS,
  type ShotScene,
  type ShotStage,
  type ShotView,
  sceneOffsetMs,
  shotTimeline,
} from "../motion/shotTimeline";
import type { TabProgress } from "./demoTabProgress";
import { micBarState, type PhoneBar } from "./micBarState";

const PERCENT = 100;

type ShotDemoState = {
  step: number;
  scene: ShotScene;
  stage: ShotStage;
  mode: ShotMode;
  playing: boolean;
  micStatus: MicStatus;
  micLive: string;
  micSeconds: number;
  heard: string | null;
  noMatch: boolean;
};

function heardLine(state: ShotDemoState, view: ShotView): string | null {
  if (state.micStatus === "listening") {
    return state.micLive === "" ? null : quote(state.micLive);
  }
  if (state.heard && (state.noMatch || state.mode === "answer")) {
    return quote(state.heard);
  }
  return view === "rest" ? null : shotScenes[state.scene].heard;
}

function bar(state: ShotDemoState, view: ShotView): PhoneBar {
  const start = copy["bar.start"];
  const listening = copy["bar.listening"];
  if (state.micStatus === "listening") {
    const timer = micTimer(state.micSeconds);
    return micBarState("listening", listening, copy["bar.stop"], timer);
  }
  if (state.micStatus === "blocked") {
    const label = copy["bar.unavailable"];
    return micBarState("blocked", copy["bar.blocked"], label);
  }
  if (view === "listening") {
    return micBarState("showListening", listening, start, demoTimer);
  }
  if (view === "acting") {
    return micBarState("sending", copy["bar.sending"], start);
  }
  return micBarState("idle", copy["bar.idle"], start);
}

function progress(state: ShotDemoState, view: ShotView): TabProgress | null {
  if (state.mode !== "auto" || view === "rest") return null;
  const offset = sceneOffsetMs(state.step);
  const hold = shotTimeline[state.step]?.holdMs ?? 0;
  const fromPercent = (offset / SCENE_MS) * PERCENT;
  if (!state.playing) return { fromPercent, toPercent: fromPercent, ms: 0 };
  const toPercent = ((offset + hold) / SCENE_MS) * PERCENT;
  return { fromPercent, toPercent, ms: hold };
}

export type ShotDemoShown = ReturnType<typeof shotDemoView>;

function announcement(state: ShotDemoState, view: ShotView): string {
  if (state.noMatch) return landingCopy["try.noMatch"];
  const answered = state.mode === "answer" && view === "done";
  return answered ? shotScenes[state.scene].message : "";
}

export function shotDemoView(state: ShotDemoState) {
  const listening = state.micStatus === "listening";
  const view: ShotView =
    listening || state.mode === "idle" ? "rest" : state.stage;
  return {
    announcement: announcement(state, view),
    view,
    heard: heardLine(state, view),
    bar: bar(state, view),
    progress: progress(state, view),
    showExamples: state.mode === "idle" && !listening,
    tryHint:
      !listening && state.micStatus !== "blocked" && state.mode !== "answer",
    privacyVisible: listening || (state.mode === "answer" && view !== "done"),
  };
}
