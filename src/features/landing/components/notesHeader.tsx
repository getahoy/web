import { SquarePen } from "lucide-react";
import { cn } from "@/lib/cn";
import { macAppCopy as copy } from "../copy/macAppCopy";
import { actingRing } from "./actingRing";

export function NotesHeader({ acting }: { acting: boolean }) {
  return (
    <>
      <span className="ml-3 font-medium text-micro">{copy["notes.title"]}</span>
      <span
        data-acting={acting}
        className={cn(
          "ml-auto flex h-7 w-7.5 items-center justify-center rounded-control text-macos-body",
          actingRing,
        )}
      >
        <SquarePen strokeWidth={1.5} className="size-4" />
      </span>
    </>
  );
}
