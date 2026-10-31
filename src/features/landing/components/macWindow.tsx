import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MacWindowProps = {
  title: string;
  detail?: string;
  toolbar?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function MacWindow(props: MacWindowProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-window bg-white font-text text-macos-text shadow-window",
        props.className,
      )}
    >
      <div className="flex h-12 items-center gap-2 border-macos-hairline border-b bg-macos-chrome px-4">
        <span className="size-2.75 shrink-0 rounded-full bg-macos-close" />
        <span className="size-2.75 shrink-0 rounded-full bg-macos-minimize" />
        <span className="size-2.75 shrink-0 rounded-full bg-macos-zoom" />
        <span className="ml-3 font-medium text-micro">{props.title}</span>
        {props.detail ? (
          <span className="truncate text-caption text-macos-muted">
            {props.detail}
          </span>
        ) : null}
        {props.toolbar ? (
          <span className="ml-auto flex items-center gap-2">
            {props.toolbar}
          </span>
        ) : null}
      </div>
      {props.children}
    </div>
  );
}
