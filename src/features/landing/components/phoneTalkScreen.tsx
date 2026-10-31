import { Mic } from "lucide-react";
import { illustrationCopy as copy } from "../copy/illustrationCopy";
import type { ShotScene, ShotStage } from "../motion/shotTimeline";
import { PhoneMacCard } from "./phoneMacCard";
import { PhoneReplyCard } from "./phoneReplyCard";
import { shotScenes } from "./shotScenes";

const captions: Record<ShotStage, string> = {
  listening: copy["phone.listening"],
  acting: copy["phone.sending"],
  done: copy["phone.idle"],
};

type PhoneTalkScreenProps = {
  scene: ShotScene;
  stage: ShotStage;
  heard: string | null;
};

export function PhoneTalkScreen({ scene, stage, heard }: PhoneTalkScreenProps) {
  const lines = shotScenes[scene];
  const heardLine =
    heard === null
      ? lines.heard
      : `${copy["heard.open"]}${heard}${copy["heard.close"]}`;
  return (
    <>
      <PhoneMacCard />
      {stage === "done" ? (
        <PhoneReplyCard
          heard={heardLine}
          status={lines.status}
          message={lines.message}
        />
      ) : (
        <span
          key={scene}
          className="absolute inset-x-4 top-37.5 line-clamp-3 animate-in text-balance text-center font-display text-driftwood text-heard italic duration-240 fade-in"
        >
          {heardLine}
        </span>
      )}
      <div className="absolute inset-x-0 bottom-11.5 flex flex-col items-center gap-4">
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
