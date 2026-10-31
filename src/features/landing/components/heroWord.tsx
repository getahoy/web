"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { headlineMotion } from "../motion/landingMotion";

export function HeroWord({
  order,
  children,
}: {
  order: number;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  const transition = reduced
    ? { duration: headlineMotion.reducedFadeSeconds }
    : {
        duration: headlineMotion.durationSeconds,
        ease: headlineMotion.ease,
        delay: order * headlineMotion.staggerSeconds,
      };
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: headlineMotion.riseFromPx }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      {children}
    </motion.span>
  );
}
