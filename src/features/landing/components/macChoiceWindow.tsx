import { cn } from "@/lib/cn";
import { illustrationCopy as copy } from "../copy/illustrationCopy";
import type { AsksPhase } from "../hooks/useAsksLoop";
import { actingRing } from "./actingRing";
import type { AsksPill } from "./asksView";
import { choiceOptions } from "./choiceOptions";
import { ChoiceTag } from "./choiceTag";
import { MacWindow } from "./macWindow";
import { OverlayPill } from "./overlayPill";

type MacChoiceWindowProps = {
  phase: AsksPhase;
  picked: number | null;
  pill: AsksPill;
};

export function MacChoiceWindow({ phase, picked, pill }: MacChoiceWindowProps) {
  const saved = phase === "done";
  return (
    <MacWindow
      title={copy["report.title"]}
      detail={saved ? copy["report.saved"] : copy["report.edited"]}
      className="w-full max-w-full lg:w-150"
    >
      <div className="flex gap-7 border-macos-hairline border-b px-5.5 pt-7.5 pb-4">
        {choiceOptions.map((option) => (
          <span
            key={option.number}
            data-acting={phase === "chosen" && picked === option.number}
            className={cn(
              "relative whitespace-nowrap rounded-control bg-macos-control px-3 py-1.5 text-micro",
              actingRing,
            )}
          >
            {option.label}
            {saved ? null : (
              <ChoiceTag
                number={option.number}
                surface="screen"
                selected={picked === option.number}
                className="absolute -top-3.5 -left-2.75"
              />
            )}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2.5 px-10 pt-19 pb-7.5">
        <span className="text-eyebrow text-macos-muted uppercase">
          {copy["report.eyebrow"]}
        </span>
        <span className="font-medium text-heard">{copy["report.title"]}</span>
        <p className="text-macos-body text-micro leading-relaxed">
          {copy["report.body"]}
        </p>
        <p className="text-macos-body text-micro leading-relaxed">
          {copy["report.bodyMore"]}
        </p>
      </div>
      <OverlayPill
        className="top-31"
        label={pill.label}
        indicator={pill.indicator}
        timer={pill.timer}
      />
    </MacWindow>
  );
}
