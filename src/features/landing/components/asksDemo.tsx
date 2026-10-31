"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { clickedLine } from "../copy/choiceOptions";
import { asksExamples } from "../copy/sayExamples";
import { useAsksDemo } from "../hooks/useAsksDemo";
import { DEMO_IN_VIEW_AMOUNT } from "../motion/landingMotion";
import { AsksDevices } from "./asksDevices";
import { asksView } from "./asksView";
import { DemoFooter } from "./demoFooter";

export function AsksDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const inView = useInView(demoRef, { amount: DEMO_IN_VIEW_AMOUNT });
  const demo = useAsksDemo(inView);
  const { loop, mic } = demo;
  const shown = asksView({
    phase: loop.phase,
    choice: loop.choice,
    userTurn: loop.userTurn,
    heard: demo.heard,
    micStatus: mic.status,
    micLive: mic.live,
    micSeconds: mic.seconds,
  });
  const answered = loop.userTurn && loop.phase === "done";

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <AsksDevices
        ref={demoRef}
        phase={loop.phase}
        choice={loop.choice}
        picked={shown.picked}
        pill={shown.pill}
        bar={shown.bar}
        onPick={demo.pick}
        onTapMic={demo.tapMic}
      />
      <DemoFooter
        examples={mic.status === "blocked" ? null : asksExamples}
        privacyVisible={mic.status === "listening"}
        announcement={answered ? clickedLine(loop.choice) : ""}
      />
    </div>
  );
}
