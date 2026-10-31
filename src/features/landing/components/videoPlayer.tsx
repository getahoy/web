import { Play } from "lucide-react";

export function VideoPlayer({ state }: { state: "playing" | "paused" }) {
  return (
    <div className="absolute inset-0 p-3 sm:p-5">
      <div className="relative flex size-full items-center justify-center overflow-hidden rounded-thumb bg-night">
        {state === "paused" ? (
          <span className="flex size-12 animate-in items-center justify-center rounded-full bg-sailcloth/15 text-white duration-240 ease-spring zoom-in-75 fade-in sm:size-16">
            <Play
              strokeWidth={1.5}
              fill="currentColor"
              className="size-5 sm:size-7"
            />
          </span>
        ) : null}
        <span className="absolute inset-x-4 bottom-4 h-1 rounded-full bg-sailcloth/25">
          <span className="block h-full w-2/5 rounded-full bg-sailcloth/80" />
        </span>
      </div>
    </div>
  );
}
