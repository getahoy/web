import { cn } from "@/lib/cn";
import { choiceOptions } from "../copy/choiceOptions";
import { illustrationCopy as copy } from "../copy/illustrationCopy";
import type { AsksPhase } from "../hooks/useAsksLoop";
import { actingRing } from "./actingRing";
import type { AsksPill } from "./asksView";
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
  const header = (
    <>
      <span className="ml-3 font-medium text-micro">
        {copy["report.title"]}
      </span>
      <span className="truncate text-caption text-macos-muted">
        {saved ? copy["report.saved"] : copy["report.edited"]}
      </span>
    </>
  );
  return (
    <MacWindow className="w-full lg:w-150" header={header}>
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
        className="top-20"
        label={pill.label}
        indicator={pill.indicator}
        timer={pill.timer}
      />
    </MacWindow>
  );
}
