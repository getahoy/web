import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { BrowserTab, type BrowserTabState } from "./browserTab";
import { TrafficLights } from "./trafficLights";

export type BrowserTabSpec = { label: string; state: BrowserTabState };

type BrowserWindowProps = {
  tabs: readonly BrowserTabSpec[];
  position: "front" | "behind";
  className?: string;
  children: ReactNode;
};

export function BrowserWindow(props: BrowserWindowProps) {
  return (
    <div
      data-position={props.position}
      className={cn(
        "relative overflow-hidden rounded-window bg-white font-text text-macos-text shadow-window transition-[scale,opacity] duration-480 ease-sheet data-[position=behind]:scale-97 data-[position=behind]:opacity-70",
        props.className,
      )}
    >
      <div className="flex h-12 items-center gap-4 border-macos-hairline border-b bg-macos-chrome px-4">
        <TrafficLights />
        <span className="flex min-w-0 items-center gap-1.5">
          {props.tabs.map((tab) => (
            <BrowserTab key={tab.label} label={tab.label} state={tab.state} />
          ))}
        </span>
      </div>
      {props.children}
    </div>
  );
}
