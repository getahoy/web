import { illustrationCopy as copy } from "../copy/illustrationCopy";
import { ChoiceTag } from "./choiceTag";

type ChoiceRowProps = {
  number: number;
  label: string;
  selected: boolean;
  onPick: (number: number) => void;
};

export function ChoiceRow({ number, label, selected, onPick }: ChoiceRowProps) {
  return (
    <label className="flex min-h-14.5 w-full cursor-pointer items-center gap-3.5 px-4.5 py-2 transition-colors duration-240 hover:bg-sailcloth has-checked:bg-signal-mist has-focus-visible:outline-2 has-focus-visible:outline-signal has-focus-visible:-outline-offset-2">
      <input
        type="radio"
        name="asks-choice"
        value={number}
        checked={selected}
        readOnly
        onClick={() => onPick(number)}
        className="sr-only"
      />
      <ChoiceTag number={number} surface="phone" selected={selected} />
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="font-medium text-body">{label}</span>
        <span className="text-caption text-driftwood">
          {copy["choice.context"]}
        </span>
      </span>
    </label>
  );
}
