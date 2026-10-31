import { SquarePen } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { macAppCopy as copy } from "../copy/macAppCopy";
import { actingRing } from "./actingRing";
import { TrafficLights } from "./trafficLights";

type ShotWindowProps = {
  chrome: { kind: "browser"; url: string } | { kind: "notes"; acting: boolean };
  children: ReactNode;
};

export function ShotWindow({ chrome, children }: ShotWindowProps) {
  return (
    <div className="relative flex aspect-window w-full flex-col overflow-hidden rounded-window bg-white font-text text-macos-text shadow-window lg:w-160">
      <div className="flex h-11 shrink-0 items-center gap-2 border-macos-hairline border-b bg-macos-chrome px-3.5">
        <TrafficLights />
        {chrome.kind === "browser" ? (
          <>
            <span className="mx-auto flex h-6.5 w-1/2 max-w-70 items-center justify-center truncate rounded-control bg-macos-control text-caption text-macos-body">
              {chrome.url}
            </span>
            <span className="w-14" />
          </>
        ) : (
          <>
            <span className="ml-3 font-medium text-micro">
              {copy["notes.title"]}
            </span>
            <span
              data-acting={chrome.acting}
              className={cn(
                "ml-auto flex h-7 w-7.5 items-center justify-center rounded-control text-macos-body",
                actingRing,
              )}
            >
              <SquarePen strokeWidth={1.5} className="size-4" />
            </span>
          </>
        )}
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}
