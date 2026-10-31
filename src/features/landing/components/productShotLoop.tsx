"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SHOT_IN_VIEW_AMOUNT } from "../motion/landingMotion";
import { RESTING_STEP, shotTimeline } from "../motion/shotTimeline";
import { ProductShotScene } from "./productShotScene";

export function ProductShotLoop() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef, { amount: SHOT_IN_VIEW_AMOUNT });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(RESTING_STEP);
  const current = shotTimeline[step] ?? shotTimeline[RESTING_STEP];

  useEffect(() => {
    if (!reduced) setStep(0);
  }, [reduced]);

  useEffect(() => {
    if (!inView || reduced || !current) return;
    const timer = setTimeout(
      () => setStep((previous) => (previous + 1) % shotTimeline.length),
      current.holdMs,
    );
    return () => clearTimeout(timer);
  }, [inView, reduced, current]);

  return (
    <div ref={sceneRef}>
      <ProductShotScene stage={current?.stage ?? "done"} />
    </div>
  );
}
