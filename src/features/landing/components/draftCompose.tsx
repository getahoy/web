import { illustrationCopy as copy } from "../copy/illustrationCopy";

export function DraftCompose() {
  return (
    <div className="absolute right-3 bottom-3 flex w-56 animate-in flex-col overflow-hidden rounded-thumb border border-macos-hairline bg-white text-caption shadow-window duration-240 ease-enter fade-in slide-in-from-bottom-2 sm:right-6 sm:bottom-6 sm:w-80">
      <span className="bg-macos-chrome px-3 py-2 font-medium">
        {copy["compose.title"]}
      </span>
      <span className="border-macos-hairline border-b px-3 py-1.5 text-macos-muted">
        {copy["compose.toLabel"]}{" "}
        <span className="text-macos-text">{copy["compose.to"]}</span>
      </span>
      <span className="border-macos-hairline border-b px-3 py-1.5">
        {copy["compose.subject"]}
      </span>
      <span className="px-3 py-2.5 text-macos-body">
        {copy["compose.body"]}
      </span>
      <span className="px-3 pb-3">
        <span className="inline-flex rounded-full bg-macos-control px-3 py-1 font-medium">
          {copy["compose.send"]}
        </span>
      </span>
    </div>
  );
}
