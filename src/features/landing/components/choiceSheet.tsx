import { illustrationCopy as copy } from "../copy/illustrationCopy";
import { choiceOptions } from "./choiceOptions";
import { ChoiceRow } from "./choiceRow";
import type { PhoneBar } from "./phoneDemoScreen";
import { PhoneMicBar } from "./phoneMicBar";

type ChoiceSheetProps = {
  picked: number | null;
  bar: PhoneBar;
  onPick: (number: number) => void;
  onTapMic: () => void;
};

export function ChoiceSheet({
  picked,
  bar,
  onPick,
  onTapMic,
}: ChoiceSheetProps) {
  const orb = bar.mode === "listening" || bar.mode === "showListening";
  return (
    <div className="absolute inset-x-0 bottom-0 flex flex-col rounded-t-sheet bg-paper pb-7.5 shadow-float">
      <div aria-hidden="true" className="flex justify-center pt-2">
        <span className="h-1.25 w-9 rounded-full bg-ink/20" />
      </div>
      <div className="flex flex-col gap-1 px-4.5 pt-3.5 pb-2">
        <span className="font-display text-title">{copy["choice.title"]}</span>
        <span className="font-display text-body text-driftwood italic">
          {copy["choice.heard"]}
        </span>
      </div>
      <fieldset className="flex flex-col">
        <legend className="sr-only">{copy["choice.title"]}</legend>
        {choiceOptions.map((option) => (
          <ChoiceRow
            key={option.number}
            number={option.number}
            label={option.label}
            selected={picked === option.number}
            onPick={onPick}
          />
        ))}
      </fieldset>
      <div className="relative mx-3 mt-2.5">
        {orb ? (
          <span
            aria-hidden="true"
            className="absolute -bottom-7.5 left-1/2 h-27.5 w-65 -translate-x-1/2 animate-breathe rounded-full bg-orb-listen motion-reduce:animate-none"
          />
        ) : null}
        <PhoneMicBar
          {...bar}
          size="sheet"
          className="relative"
          onTap={onTapMic}
        />
      </div>
    </div>
  );
}
