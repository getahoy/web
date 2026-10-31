import { Mic, MicOff, Square } from "lucide-react";
import { cn } from "@/lib/cn";
import type { MicBarMode } from "./phoneMicBar";

const icons = {
  idle: Mic,
  listening: Square,
  showListening: Mic,
  sending: Mic,
  blocked: MicOff,
};

type MicDiscProps = { mode: MicBarMode; disc: string; icon: string };

export function MicDisc({ mode, disc, icon }: MicDiscProps) {
  const Icon = icons[mode];
  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full bg-paper text-ink",
        disc,
        mode === "blocked" && "opacity-40",
      )}
    >
      {mode === "idle" ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-mic-pulse rounded-full border-2 border-paper motion-reduce:hidden"
        />
      ) : null}
      <Icon aria-hidden="true" strokeWidth={1.5} className={icon} />
    </span>
  );
}
