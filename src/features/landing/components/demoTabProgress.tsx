import { motion } from "motion/react";

export type TabProgress = {
  fromPercent: number;
  toPercent: number;
  ms: number;
};

const MS_PER_SECOND = 1000;

export function DemoTabProgress({
  progress,
  stepKey,
}: {
  progress: TabProgress | null;
  stepKey: number;
}) {
  if (!progress) return null;
  return (
    <span className="absolute inset-x-4.5 bottom-0 h-0.5 overflow-hidden rounded-full">
      <motion.span
        key={stepKey}
        className="absolute inset-y-0 left-0 rounded-full bg-signal"
        initial={{ width: `${progress.fromPercent}%` }}
        animate={{ width: `${progress.toPercent}%` }}
        transition={{ duration: progress.ms / MS_PER_SECOND, ease: "linear" }}
      />
    </span>
  );
}
