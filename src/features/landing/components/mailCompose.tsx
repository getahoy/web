import { illustrationCopy as copy } from "../copy/illustrationCopy";

export function MailCompose({ open }: { open: "shown" | "hidden" }) {
  return (
    <div
      data-open={open}
      className="mx-3.5 mb-3.5 flex translate-y-2 flex-col rounded-thumb border border-macos-hairline bg-white text-caption opacity-0 transition-[opacity,translate] duration-240 ease-enter data-[open=shown]:translate-y-0 data-[open=shown]:opacity-100 sm:mx-6 sm:mb-6"
    >
      <div className="border-macos-hairline border-b px-3.5 py-2.25 text-macos-muted">
        {copy["mail.to"]}{" "}
        <span className="text-macos-text">{copy["mail.recipient"]}</span>
      </div>
      <div className="border-macos-hairline border-b px-3.5 py-2.25">
        {copy["mail.replySubject"]}
      </div>
      <div className="flex h-11 items-center px-3.5">
        <span className="h-4 w-px bg-macos-text" />
      </div>
    </div>
  );
}
