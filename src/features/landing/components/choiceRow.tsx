import { cn } from "@/lib/cn";
import { illustrationCopy as copy } from "../copy/illustrationCopy";
import { landingCopy } from "../copy/landingCopy";
import { ChoiceTag } from "./choiceTag";

type ChoiceRowProps = {
  number: number;
  label: string;
  selected: boolean;
  onPick: (number: number) => void;
};

export function ChoiceRow({ number, label, selected, onPick }: ChoiceRowProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${landingCopy["asks.pick"]} ${number}, ${label}`}
      onClick={() => onPick(number)}
      className={cn(
        "flex h-14 w-full items-center gap-3 px-4 text-left transition-colors duration-150 hover:bg-sailcloth aria-pressed:bg-signal-mist",
        "outline-none focus-visible:outline-2 focus-visible:outline-signal focus-visible:-outline-offset-2",
      )}
    >
      <ChoiceTag number={number} surface="phone" selected={selected} />
      <span className="flex min-w-0 flex-col">
        <span className="font-medium text-button">{label}</span>
        <span className="text-driftwood text-tiny">
          {copy["choice.context"]}
        </span>
      </span>
    </button>
  );
}
