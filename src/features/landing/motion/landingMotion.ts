import { motionDurationMs, motionEasing } from "@getahoy/lib";

const MS_PER_SECOND = 1000;

export const NAV_PILL_AFTER_PX = 80;

export const EASE_ENTER = motionEasing.out;
const REDUCED_FADE_SECONDS = motionDurationMs.fast / MS_PER_SECOND;

export const headlineMotion = {
  riseFromPx: 24,
  durationSeconds: 0.7,
  staggerSeconds: 0.06,
  ease: EASE_ENTER,
  reducedFadeSeconds: REDUCED_FADE_SECONDS,
} as const;

const STATEMENT_ALL_LIT_AT = 0.92;

export function litWordCount(progress: number, totalWords: number): number {
  const share = Math.min(1, Math.max(0, progress) / STATEMENT_ALL_LIT_AT);
  return Math.round(share * totalWords);
}

export const DEMO_IN_VIEW_AMOUNT = 0.3;
