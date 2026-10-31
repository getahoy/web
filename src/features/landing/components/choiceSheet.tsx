import { choiceOptions } from "../copy/choiceOptions";
import { illustrationCopy as copy } from "../copy/illustrationCopy";
import { ChoiceRow } from "./choiceRow";
import type { PhoneBar } from "./micBarState";
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
      <PhoneMicBar
        bar={bar}
        size="sheet"
        className="mx-3 mt-2.5"
        onTap={onTapMic}
      />
    </div>
  );
}
