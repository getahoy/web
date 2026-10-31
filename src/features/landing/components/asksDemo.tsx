"use client";

import { landingCopy } from "../copy/landingCopy";
import { useTryAsks } from "../hooks/useTryAsks";
import { choiceOptions } from "./choiceOptions";
import { ChoiceSheet } from "./choiceSheet";
import { MacChoiceWindow } from "./macChoiceWindow";
import { PhoneFrame } from "./phoneFrame";
import { VoiceTryPanel } from "./voiceTryPanel";

const hints = [
  landingCopy["asks.hint.1"],
  landingCopy["asks.hint.2"],
  landingCopy["asks.hint.3"],
];

export function AsksDemo() {
  const asks = useTryAsks(choiceOptions.length);
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex w-full flex-col items-center justify-center gap-14 lg:flex-row lg:gap-24">
        <div
          aria-hidden="true"
          className="pointer-events-none w-full select-none sm:w-auto"
        >
          <MacChoiceWindow selected={asks.selected} />
        </div>
        <PhoneFrame>
          <ChoiceSheet selected={asks.selected} onPick={asks.pick} />
        </PhoneFrame>
      </div>
      <VoiceTryPanel
        startLabel={landingCopy["asks.try"]}
        hints={hints}
        status={asks.status}
        busy={asks.prompting}
        message={asks.message}
        onStart={asks.start}
        onStop={asks.stop}
      />
    </div>
  );
}
