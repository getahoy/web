import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import { macAppCopy as copy, upNextVideos } from "../copy/macAppCopy";
import type { ShotView } from "../motion/shotTimeline";
import { actingRing } from "./actingRing";

const PLAYING_AT = "4:12";
const PAUSED_AT = "4:15";

export function YoutubePage({ view }: { view: ShotView }) {
  const paused = view === "done";
  const ControlIcon = paused ? Play : Pause;
  return (
    <div className="absolute inset-0 flex gap-5 p-4 sm:p-5">
      <div className="flex w-full flex-col gap-2.5 sm:w-3/5">
        <div
          data-acting={view === "acting"}
          className={cn(
            "relative aspect-video w-full overflow-hidden rounded-thumb bg-night",
            actingRing,
          )}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pb-8">
            <span className="font-label text-fog text-tiny uppercase tracking-eyebrow">
              {copy["youtube.chapter"]}
            </span>
            <span className="font-display font-light text-sailcloth text-title">
              {copy["youtube.scene"]}
            </span>
          </div>
          {paused ? (
            <span className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-3/4 animate-in items-center justify-center rounded-full bg-night/72 text-white duration-240 fade-in">
              <Play
                fill="currentColor"
                strokeWidth={0}
                className="ml-0.75 size-5.5"
              />
            </span>
          ) : null}
          <div className="absolute inset-x-0 bottom-0 flex h-8.5 items-center gap-2.5 bg-night/60 px-3 text-white">
            <ControlIcon
              fill="currentColor"
              strokeWidth={0}
              className="size-3.5"
            />
            <span className="relative h-0.75 flex-1 rounded-full bg-sailcloth/30">
              <span className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-sailcloth" />
            </span>
            <span className="font-label text-eyebrow">
              {paused ? PAUSED_AT : PLAYING_AT} / {copy["youtube.length"]}
            </span>
          </div>
        </div>
        <span className="font-medium text-button">{copy["youtube.title"]}</span>
        <span className="text-caption text-macos-muted">
          {copy["youtube.channel"]}
        </span>
      </div>
      <div className="hidden min-w-0 flex-1 flex-col gap-3 sm:flex">
        <span className="font-medium text-caption text-macos-body">
          {copy["youtube.upNext"]}
        </span>
        {upNextVideos.map((video) => (
          <div key={video.title} className="flex items-start gap-2.5">
            <span className="relative h-11 w-19 shrink-0 rounded-control bg-night-raised">
              <span className="absolute right-1 bottom-1 rounded-xs bg-night/70 px-1 font-label text-tiny text-white">
                {video.length}
              </span>
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="font-medium text-caption">{video.title}</span>
              <span className="text-eyebrow text-macos-muted">
                {copy["youtube.channel"]}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
