import { cn } from "cn";
import type { ReactNode } from "react";

type MacToolbarButtonProps = {
  focus: "rest" | "target";
  className?: string;
  children: ReactNode;
};

export function MacToolbarButton(props: MacToolbarButtonProps) {
  return (
    <span
      data-focus={props.focus}
      className={cn(
        "relative whitespace-nowrap rounded-control bg-macos-control px-3 py-1.5 text-caption transition-shadow duration-240 ease-enter data-[focus=target]:bg-white data-[focus=target]:ring-2 data-[focus=target]:ring-signal data-[focus=target]:ring-offset-2 data-[focus=target]:ring-offset-macos-chrome",
        props.className,
      )}
    >
      {props.children}
    </span>
  );
}
