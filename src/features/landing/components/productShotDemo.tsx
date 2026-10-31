"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { landingCopy } from "../copy/landingCopy";
import { useShotDemo } from "../hooks/useShotDemo";
import { SHOT_IN_VIEW_AMOUNT } from "../motion/landingMotion";
import { DemoFooter } from "./demoFooter";
import { DemoTabs } from "./demoTabs";
import { shotExamples } from "./sayExamples";
import { shotDemoView } from "./shotDemoView";
import { ShotDevices } from "./shotDevices";
import { shotScenes } from "./shotScenes";

export function ProductShotDemo() {
  const devicesRef = useRef<HTMLDivElement>(null);
  const inView = useInView(devicesRef, { amount: SHOT_IN_VIEW_AMOUNT });
  const demo = useShotDemo(inView);
  const { steps, mic } = demo;
  const shown = shotDemoView({
    ...steps,
    micStatus: mic.status,
    micLive: mic.live,
    micSeconds: mic.seconds,
    heard: demo.heard,
    noMatch: demo.noMatch,
  });
  const answered = steps.mode === "answer" && shown.view === "done";
  const announcement = demo.noMatch
    ? landingCopy["try.noMatch"]
    : answered
      ? shotScenes[steps.scene].message
      : "";

  return (
    <div className="flex w-full flex-col items-center gap-8 lg:gap-12">
      <DemoTabs
        scene={steps.scene}
        playing={steps.playing}
        progress={shown.progress}
        stepKey={steps.step}
        onPick={demo.pick}
        onTogglePlaying={demo.togglePlaying}
      />
      <ShotDevices
        ref={devicesRef}
        scene={steps.scene}
        shown={shown}
        noMatch={demo.noMatch}
        micListening={mic.status === "listening"}
        onTapMic={demo.tapMic}
      />
      <DemoFooter
        examples={mic.status === "blocked" ? null : shotExamples}
        privacyVisible={shown.privacyVisible}
        announcement={announcement}
      />
    </div>
  );
}
