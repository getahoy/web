import { landingCopy } from "../copy/landingCopy";
import type { ShotScene, ShotView } from "../motion/shotTimeline";
import { PhoneDoneCard } from "./phoneDoneCard";
import { PhoneExamples } from "./phoneExamples";
import { PhoneMacCard } from "./phoneMacCard";
import { type MicBarMode, PhoneMicBar } from "./phoneMicBar";
import { shotScenes } from "./shotScenes";

export type PhoneBar = {
  mode: MicBarMode;
  text: string;
  label: string;
  timer: string | null;
};

type PhoneDemoScreenProps = {
  scene: ShotScene;
  view: ShotView;
  heard: string | null;
  noMatch: boolean;
  showExamples: boolean;
  bar: PhoneBar;
  onTapMic: () => void;
};

export function PhoneDemoScreen(props: PhoneDemoScreenProps) {
  const lines = shotScenes[props.scene];
  return (
    <>
      <PhoneMacCard />
      {props.heard ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-5 top-35 line-clamp-3 text-balance text-center font-display text-heard text-ink italic"
        >
          {props.heard}
        </span>
      ) : null}
      {props.view === "done" ? (
        <PhoneDoneCard
          className="top-56"
          status={lines.status}
          message={lines.message}
        />
      ) : null}
      {props.noMatch ? (
        <span className="absolute inset-x-5 top-59 animate-in text-center text-button text-driftwood fade-in">
          {landingCopy["try.noMatch"]}
        </span>
      ) : null}
      {props.showExamples ? (
        <PhoneExamples highlighted={props.noMatch} />
      ) : null}
      {props.bar.mode === "listening" || props.bar.mode === "showListening" ? (
        <span
          aria-hidden="true"
          className="absolute -bottom-2.5 left-1/2 h-37.5 w-75 -translate-x-1/2 animate-breathe rounded-full bg-orb-listen motion-reduce:animate-none"
        />
      ) : null}
      <PhoneMicBar
        {...props.bar}
        size="phone"
        className="absolute inset-x-3 bottom-9 w-auto"
        onTap={props.onTapMic}
      />
    </>
  );
}
