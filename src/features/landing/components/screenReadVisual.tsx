import { illustrationCopy as copy } from "../copy/illustrationCopy";
import { MacToolbarButton } from "./macToolbarButton";
import { MacWindow } from "./macWindow";

export function ScreenReadVisual() {
  return (
    <MacWindow
      title={copy["mail.title"]}
      className="w-full max-w-140"
      toolbar={
        <>
          <MacToolbarButton focus="target">
            {copy["mail.reply"]}
          </MacToolbarButton>
          <MacToolbarButton focus="rest" className="hidden xs:inline">
            {copy["mail.replyAll"]}
          </MacToolbarButton>
          <MacToolbarButton focus="rest" className="hidden sm:inline">
            {copy["mail.forward"]}
          </MacToolbarButton>
        </>
      }
    >
      <div className="flex flex-col gap-2 px-7 pt-6 pb-7.5">
        <span className="font-medium text-body">{copy["mail.subject"]}</span>
        <span className="text-caption text-macos-muted">
          {copy["mail.meta"]}
        </span>
        <p className="mt-2 text-macos-body text-micro leading-relaxed">
          {copy["mail.body"]}
        </p>
        <p className="text-macos-body text-micro leading-relaxed">
          {copy["mail.signoff"]}
        </p>
      </div>
    </MacWindow>
  );
}
