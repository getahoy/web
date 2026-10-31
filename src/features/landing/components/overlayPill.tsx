import { cn } from "cn";

type OverlayPillProps = {
  indicator: "none" | "wave" | "done";
  timer: "none" | "draining";
  className?: string;
  label: string;
};

const waveBars = ["h-1.5", "h-3", "h-3.5", "h-2.25", "h-1.25"];

export function OverlayPill(props: OverlayPillProps) {
  return (
    <div
      className={cn("absolute inset-x-0 flex justify-center", props.className)}
    >
      <div className="flex flex-col overflow-hidden rounded-full bg-night/88 shadow-overlay backdrop-blur-lg">
        <span className="flex h-9 items-center gap-2.25 whitespace-nowrap px-4 font-medium text-micro text-sailcloth">
          {props.indicator === "wave" ? (
            <span className="flex h-3.5 items-center gap-0.5">
              {waveBars.map((height) => (
                <span
                  key={height}
                  className={cn("w-0.5 rounded-full bg-night-signal", height)}
                />
              ))}
            </span>
          ) : null}
          {props.indicator === "done" ? (
            <span className="size-1.5 rounded-full bg-night-kelp" />
          ) : null}
          {props.label}
        </span>
        {props.timer === "draining" ? (
          <span className="relative h-0.5 bg-sailcloth/14">
            <span className="absolute inset-y-0 left-0 w-3/5 bg-night-signal" />
          </span>
        ) : null}
      </div>
    </div>
  );
}
