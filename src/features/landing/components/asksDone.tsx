import { labelOf } from "../copy/choiceOptions";
import { illustrationCopy as copy } from "../copy/illustrationCopy";
import { PhoneDoneCard } from "./phoneDoneCard";

export function AsksDone({ choice }: { choice: number }) {
  const label = labelOf(choice);
  return (
    <>
      <span className="absolute inset-x-5 top-35 text-center font-display text-heard text-ink italic">
        {copy["choice.heard"]}
      </span>
      <PhoneDoneCard
        className="top-50"
        status={copy["choice.status"]}
        message={`${copy["choice.clicked"]} ${label} ${copy["choice.inPages"]}`}
        detail={`${copy["choice.title"]} · ${choice}, ${label}`}
      />
    </>
  );
}
