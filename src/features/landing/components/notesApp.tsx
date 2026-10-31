import { cn } from "@/lib/cn";
import { macAppCopy as copy, savedNotes } from "../copy/macAppCopy";
import type { ShotView } from "../motion/shotTimeline";

export function NotesApp({ view }: { view: ShotView }) {
  const created = view === "done";
  return (
    <div className="absolute inset-0 flex">
      <div className="flex w-1/3 shrink-0 flex-col gap-0.5 border-macos-hairline border-r bg-macos-chrome px-2 py-2.5">
        {created ? (
          <div className="flex animate-in flex-col gap-0.5 rounded-control bg-signal-mist px-2.5 py-2 duration-240 ease-enter fade-in slide-in-from-bottom-2">
            <span className="font-medium text-micro">{copy["notes.new"]}</span>
            <span className="truncate text-driftwood text-eyebrow">
              {copy["notes.newDetail"]}
            </span>
          </div>
        ) : null}
        {savedNotes.map((note, index) => (
          <div
            key={note.title}
            className={cn(
              "flex flex-col gap-0.5 rounded-control px-2.5 py-2",
              index === 0 && !created && "bg-linen",
            )}
          >
            <span className="font-medium text-micro">{note.title}</span>
            <span className="truncate text-eyebrow text-macos-muted">
              {note.detail}
            </span>
          </div>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 px-5 py-6 sm:px-7.5">
        <span className="self-center text-eyebrow text-macos-muted">
          {created ? copy["notes.newDate"] : copy["notes.oldDate"]}
        </span>
        {created ? (
          <span className="mt-1 h-4 w-px bg-macos-text" />
        ) : (
          <>
            <span className="font-medium text-body-lg">
              {copy["notes.openTitle"]}
            </span>
            {[
              copy["notes.line1"],
              copy["notes.line2"],
              copy["notes.line3"],
            ].map((line) => (
              <span key={line} className="text-macos-body text-micro">
                {line}
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
