import { macAppCopy as copy } from "../copy/macAppCopy";

export function GmailDraft() {
  return (
    <div className="absolute right-3 bottom-0 flex w-60 animate-in flex-col rounded-t-thumb bg-white text-caption shadow-window duration-240 ease-enter fade-in slide-in-from-bottom-3 sm:right-4 sm:w-75">
      <span className="flex h-9 items-center rounded-t-thumb bg-linen px-3.5 font-medium">
        {copy["draft.title"]}
      </span>
      <span className="border-macos-hairline border-b px-3.5 py-2 text-macos-muted">
        {copy["draft.toLabel"]}
        <span className="ml-1.5 rounded-full bg-linen px-2 py-0.5 text-macos-text">
          {copy["draft.to"]}
        </span>
      </span>
      <span className="border-macos-hairline border-b px-3.5 py-2">
        {copy["draft.subject"]}
      </span>
      <span className="flex h-20 items-start gap-px px-3.5 py-2.5">
        {copy["draft.body"]}
        <span className="mt-0.5 h-4 w-px bg-macos-text" />
      </span>
    </div>
  );
}
