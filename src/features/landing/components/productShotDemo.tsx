"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { shotExamples } from "../copy/sayExamples";
import { useShotDemo } from "../hooks/useShotDemo";
import { DEMO_IN_VIEW_AMOUNT } from "../motion/landingMotion";
import { DemoFooter } from "./demoFooter";
import { DemoTabs } from "./demoTabs";
import { shotDemoView } from "./shotDemoView";
import { ShotDevices } from "./shotDevices";

export function ProductShotDemo() {
  const devicesRef = useRef<HTMLDivElement>(null);
  const inView = useInView(devicesRef, { amount: DEMO_IN_VIEW_AMOUNT });
  const demo = useShotDemo(inView);
  const { steps, mic } = demo;
  const shown = shotDemoView({
    step: steps.step,
    scene: steps.scene,
    stage: steps.stage,
    mode: steps.mode,
    playing: steps.playing,
    micStatus: mic.status,
    micLive: mic.live,
    micSeconds: mic.seconds,
    heard: demo.heard,
    noMatch: demo.noMatch,
  });

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
        announcement={shown.announcement}
      />
    </div>
  );
}
