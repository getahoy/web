import { illustrationCopy as copy } from "../copy/illustrationCopy";
import type { ShotStage } from "../motion/shotTimeline";
import { MacToolbarButton } from "./macToolbarButton";

export function MailToolbar({ stage }: { stage: ShotStage }) {
  return (
    <>
      <MacToolbarButton focus={stage === "clicking" ? "target" : "rest"}>
        {copy["mail.reply"]}
      </MacToolbarButton>
      <MacToolbarButton focus="rest" className="hidden sm:inline">
        {copy["mail.replyAll"]}
      </MacToolbarButton>
      <MacToolbarButton focus="rest">{copy["mail.forward"]}</MacToolbarButton>
      <MacToolbarButton focus="rest" className="hidden sm:inline">
        {copy["mail.archive"]}
      </MacToolbarButton>
    </>
  );
}
