import { illustrationCopy as copy } from "../copy/illustrationCopy";
import type { ShotStage } from "../motion/shotTimeline";
import { MacWindow } from "./macWindow";
import { MailCompose } from "./mailCompose";
import { MailToolbar } from "./mailToolbar";
import { OverlayPill } from "./overlayPill";

type PillContent = { label: string; indicator: "wave" | "none" | "done" };

const pills: Record<ShotStage, PillContent> = {
  listening: { label: copy["overlay.listening"], indicator: "wave" },
  clicking: { label: copy["overlay.clicking"], indicator: "none" },
  done: { label: copy["overlay.done"], indicator: "done" },
};

export function MacMailWindow({ stage }: { stage: ShotStage }) {
  const pill = pills[stage];
  return (
    <MacWindow
      title={copy["mail.title"]}
      detail={copy["mail.detail"]}
      className="w-full max-w-full sm:w-170"
      toolbar={<MailToolbar stage={stage} />}
    >
      <div className="flex flex-col gap-2 px-6 pt-21 pb-5 sm:px-14">
        <span className="font-medium text-body-lg">{copy["mail.subject"]}</span>
        <span className="text-caption text-macos-muted">
          {copy["mail.meta"]}
        </span>
        <p className="mt-2.5 text-macos-body text-micro leading-relaxed">
          {copy["mail.body"]}
        </p>
        <p className="text-macos-body text-micro leading-relaxed">
          {copy["mail.signoff"]}
        </p>
        <span className="mt-1.5 self-start rounded-thumb border border-macos-hairline px-3 py-1.75 text-caption text-macos-body">
          {copy["mail.attachment"]}
        </span>
      </div>
      <MailCompose open={stage === "done" ? "shown" : "hidden"} />
      <OverlayPill
        className="top-15.5"
        label={pill.label}
        indicator={pill.indicator}
        timer="none"
      />
    </MacWindow>
  );
}
