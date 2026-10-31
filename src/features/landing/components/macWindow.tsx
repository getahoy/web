import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MacWindowProps = {
  header: ReactNode;
  className?: string;
  children: ReactNode;
};

const lights = ["bg-macos-close", "bg-macos-minimize", "bg-macos-zoom"];

export function MacWindow({ header, className, children }: MacWindowProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-window bg-white font-text text-macos-text shadow-window",
        className,
      )}
    >
      <div className="flex h-11 shrink-0 items-center gap-2 border-macos-hairline border-b bg-macos-chrome px-3.5">
        {lights.map((light) => (
          <span
            key={light}
            className={cn("size-2.75 shrink-0 rounded-full", light)}
          />
        ))}
        {header}
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}
