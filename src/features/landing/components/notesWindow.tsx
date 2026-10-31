import { cn } from "@/lib/cn";
import { illustrationCopy as copy } from "../copy/illustrationCopy";
import type { ShotStage } from "../motion/shotTimeline";
import { MacWindow } from "./macWindow";

const savedNotes = ["w-3/4", "w-1/2", "w-2/3", "w-3/5"];
const openNoteLines = ["w-2/3", "w-5/6", "w-3/4", "w-1/2"];

export function NotesWindow({ stage }: { stage: ShotStage }) {
  const created = stage === "done";
  return (
    <MacWindow title={copy["notes.title"]} className="w-full">
      <div className="grid aspect-4/3 grid-cols-3 sm:aspect-video">
        <div className="flex flex-col gap-1 border-macos-hairline border-r bg-macos-chrome p-2 sm:p-3">
          {created ? (
            <span className="animate-in truncate rounded-control bg-macos-control px-2.5 py-2 font-medium text-caption duration-240 ease-enter fade-in slide-in-from-top-1">
              {copy["notes.new"]}
            </span>
          ) : null}
          {savedNotes.map((width) => (
            <span key={width} className="flex flex-col gap-1.5 px-2.5 py-2">
              <span
                className={cn("h-2 rounded-full bg-macos-control", width)}
              />
              <span className="h-1.5 w-1/2 rounded-full bg-macos-hairline" />
            </span>
          ))}
        </div>
        <div className="col-span-2 flex flex-col gap-3 px-5 pt-18 sm:px-8">
          {created ? (
            <>
              <span className="text-center text-caption text-macos-muted">
                {copy["notes.today"]}
              </span>
              <span className="h-5 w-px bg-macos-text" />
            </>
          ) : (
            openNoteLines.map((width) => (
              <span
                key={width}
                className={cn("h-2.5 rounded-full bg-macos-hairline", width)}
              />
            ))
          )}
        </div>
      </div>
    </MacWindow>
  );
}
