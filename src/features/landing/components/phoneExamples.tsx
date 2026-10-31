import { cn } from "@/lib/cn";
import { shotExamples } from "../copy/sayExamples";

export function PhoneExamples({ highlighted }: { highlighted: boolean }) {
  return (
    <ul className="absolute inset-x-3.5 bottom-28 flex animate-in flex-col items-center gap-1.5 duration-240 fade-in">
      {shotExamples.map((example) => (
        <li
          key={example}
          className={cn(
            "rounded-full px-3 py-0.75 font-display text-body-lg italic transition-colors duration-240",
            highlighted ? "bg-signal-mist text-ink" : "text-fog",
          )}
        >
          {example}
        </li>
      ))}
    </ul>
  );
}
