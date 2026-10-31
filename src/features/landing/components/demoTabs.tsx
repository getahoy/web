import { Mail, Pause, Play, StickyNote } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { landingCopy } from "../copy/landingCopy";
import { shotScenes } from "../copy/shotScenes";
import { EASE_ENTER } from "../motion/landingMotion";
import { type ShotScene, shotSceneOrder } from "../motion/shotTimeline";
import { DemoTabProgress, type TabProgress } from "./demoTabProgress";
import { focusRing } from "./focusRing";

const icons = { pause: Play, note: StickyNote, draft: Mail };
const SLIDE = { duration: 0.48, ease: EASE_ENTER } as const;
const PERCENT = 100;

type DemoTabsProps = {
  scene: ShotScene;
  playing: boolean;
  progress: TabProgress | null;
  stepKey: number;
  onPick: (scene: ShotScene) => void;
  onTogglePlaying: () => void;
};

export function DemoTabs(props: DemoTabsProps) {
  const index = shotSceneOrder.indexOf(props.scene);
  const PlayIcon = props.playing ? Pause : Play;
  return (
    <div className="flex items-center rounded-full bg-linen p-1">
      <div
        role="tablist"
        aria-label={landingCopy["shot.tabs"]}
        className="relative grid w-74 grid-cols-3 sm:w-129"
      >
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1/3 overflow-hidden rounded-full bg-paper shadow-xs"
          animate={{ x: `${index * PERCENT}%` }}
          transition={SLIDE}
        >
          <DemoTabProgress progress={props.progress} stepKey={props.stepKey} />
        </motion.span>
        {shotSceneOrder.map((scene) => {
          const Icon = icons[scene];
          return (
            <button
              key={scene}
              type="button"
              role="tab"
              aria-selected={scene === props.scene}
              onClick={() => props.onPick(scene)}
              className={cn(
                "relative flex h-11 items-center justify-center gap-1.75 rounded-full font-medium text-driftwood text-micro transition-colors duration-240 hover:text-ink aria-selected:text-ink sm:text-body-sm",
                focusRing,
              )}
            >
              <Icon aria-hidden="true" strokeWidth={1.5} className="size-4" />
              <span className="sm:hidden">{shotScenes[scene].tabShort}</span>
              <span className="hidden sm:inline">{shotScenes[scene].tab}</span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        aria-label={landingCopy["shot.pause"]}
        aria-pressed={!props.playing}
        onClick={props.onTogglePlaying}
        className={cn(
          "ml-1 flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-150 hover:bg-paper",
          focusRing,
        )}
      >
        <PlayIcon aria-hidden="true" strokeWidth={1.5} className="size-4" />
      </button>
    </div>
  );
}
