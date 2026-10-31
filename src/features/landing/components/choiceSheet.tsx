import { illustrationCopy as copy } from "../copy/illustrationCopy";
import { choiceOptions } from "./choiceOptions";
import { ChoiceRow } from "./choiceRow";

type ChoiceSheetProps = {
  selected: number | null;
  onPick: (number: number) => void;
};

export function ChoiceSheet({ selected, onPick }: ChoiceSheetProps) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end bg-night/28">
      <div className="flex flex-col overflow-hidden rounded-t-sheet bg-paper shadow-float">
        <div aria-hidden="true" className="relative h-0.5 bg-rope">
          <span className="absolute inset-y-0 left-0 w-3/5 bg-signal" />
        </div>
        <div aria-hidden="true" className="flex justify-center pt-2">
          <span className="h-1.25 w-9 rounded-full bg-ink/20" />
        </div>
        <div className="flex flex-col gap-1 px-4 pt-3 pb-1">
          <span className="font-display text-title">
            {copy["choice.title"]}
          </span>
          <span className="text-driftwood text-micro">
            {copy["choice.subtitle"]}
          </span>
        </div>
        {choiceOptions.map((option) => (
          <ChoiceRow
            key={option.number}
            number={option.number}
            label={option.label}
            selected={selected === option.number}
            onPick={onPick}
          />
        ))}
        <div
          aria-hidden="true"
          className="flex items-center gap-2.5 px-4 pt-2 pb-7"
        >
          <span className="flex h-8 items-center rounded-full border border-rope px-3 font-medium text-caption">
            {copy["choice.none"]}
          </span>
          <span className="text-caption text-fog">{copy["choice.hint"]}</span>
        </div>
      </div>
    </div>
  );
}
