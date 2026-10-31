import { Mic } from "lucide-react";
import { illustrationCopy as copy } from "../copy/illustrationCopy";
import type { ShotStage } from "../motion/shotTimeline";
import { PhoneMacCard } from "./phoneMacCard";
import { PhoneReplyCard } from "./phoneReplyCard";

const captions: Record<ShotStage, string> = {
  listening: copy["phone.listening"],
  clicking: copy["phone.sending"],
  done: copy["phone.idle"],
};

export function PhoneTalkScreen({ stage }: { stage: ShotStage }) {
  return (
    <>
      <PhoneMacCard />
      {stage === "done" ? (
        <PhoneReplyCard />
      ) : (
        <span className="absolute inset-x-4 top-37.5 animate-in text-center font-display text-driftwood text-heard italic duration-240 fade-in">
          {copy["phone.heard"]}
        </span>
      )}
      <div className="absolute inset-x-0 bottom-11.5 flex flex-col items-center gap-2.5">
        <span
          data-stage={stage}
          className="flex size-17 items-center justify-center rounded-full bg-ink text-white ring-signal-mist transition-[scale,box-shadow] duration-240 ease-spring data-[stage=listening]:scale-106 data-[stage=listening]:ring-14"
        >
          <Mic strokeWidth={1.5} className="size-5.5" />
        </span>
        <span className="font-label text-tiny">{captions[stage]}</span>
      </div>
    </>
  );
}
