import { illustrationCopy as copy } from "../copy/illustrationCopy";
import type { MicStatus } from "../hooks/useDemoListening";
import type { ShotMode } from "../hooks/useShotSteps";
import { micTimer, quoted } from "../listening/micTimer";
import {
  SCENE_MS,
  type ShotScene,
  type ShotStage,
  type ShotView,
  sceneOffsetMs,
  shotTimeline,
} from "../motion/shotTimeline";
import type { TabProgress } from "./demoTabProgress";
import { micBarState } from "./micBarState";
import type { PhoneBar } from "./phoneDemoScreen";
import { shotScenes } from "./shotScenes";

const PERCENT = 100;
const SHOWN_SECONDS = 1;

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

const quote = (text: string) =>
  quoted(copy["heard.open"], text, copy["heard.close"]);

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
    const timer = micTimer(SHOWN_SECONDS);
    return micBarState("showListening", listening, start, timer);
  }
  const sending = view === "acting";
  if (sending) return micBarState("sending", copy["bar.sending"], start);
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

export function shotDemoView(state: ShotDemoState) {
  const listening = state.micStatus === "listening";
  const view: ShotView =
    listening || state.mode === "idle" ? "rest" : state.stage;
  return {
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
