import type { Ref } from "react";
import type { AsksPhase } from "../hooks/useAsksLoop";
import { AsksDone } from "./asksDone";
import type { AsksPill } from "./asksView";
import { ChoiceSheet } from "./choiceSheet";
import { MacChoiceWindow } from "./macChoiceWindow";
import type { PhoneBar } from "./phoneDemoScreen";
import { PhoneFrame } from "./phoneFrame";
import { PhoneMacCard } from "./phoneMacCard";

type AsksDevicesProps = {
  ref: Ref<HTMLDivElement>;
  phase: AsksPhase;
  choice: number;
  picked: number | null;
  pill: AsksPill;
  bar: PhoneBar;
  onPick: (number: number) => void;
  onTapMic: () => void;
};

export function AsksDevices(props: AsksDevicesProps) {
  return (
    <div
      ref={props.ref}
      className="flex w-full flex-col items-center justify-center gap-12 lg:flex-row lg:gap-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none w-full max-w-150 select-none lg:w-auto"
      >
        <MacChoiceWindow
          phase={props.phase}
          picked={props.picked}
          pill={props.pill}
        />
      </div>
      <PhoneFrame>
        <PhoneMacCard />
        {props.phase === "done" ? (
          <AsksDone choice={props.choice} />
        ) : (
          <ChoiceSheet
            picked={props.picked}
            bar={props.bar}
            onPick={props.onPick}
            onTapMic={props.onTapMic}
          />
        )}
      </PhoneFrame>
    </div>
  );
}
