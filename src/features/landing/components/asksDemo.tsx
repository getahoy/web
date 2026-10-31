"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { illustrationCopy as copy } from "../copy/illustrationCopy";
import { useAsksDemo } from "../hooks/useAsksDemo";
import { SHOT_IN_VIEW_AMOUNT } from "../motion/landingMotion";
import { AsksDevices } from "./asksDevices";
import { asksView } from "./asksView";
import { labelOf } from "./choiceOptions";
import { DemoFooter } from "./demoFooter";
import { asksExamples } from "./sayExamples";

export function AsksDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const inView = useInView(demoRef, { amount: SHOT_IN_VIEW_AMOUNT });
  const demo = useAsksDemo(inView);
  const { loop, mic } = demo;
  const shown = asksView({
    ...loop,
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
        announcement={
          answered
            ? `${copy["choice.clickedPrefix"]} ${labelOf(loop.choice)}.`
            : ""
        }
      />
    </div>
  );
}
