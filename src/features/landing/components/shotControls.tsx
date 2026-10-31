import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import { landingCopy } from "../copy/landingCopy";
import { type ShotScene, shotSceneOrder } from "../motion/shotTimeline";
import { focusRing } from "./focusRing";
import { SceneChip } from "./sceneChip";
import { shotScenes } from "./shotScenes";

type ShotControlsProps = {
  scene: ShotScene;
  paused: boolean;
  onScene: (scene: ShotScene) => void;
  onTogglePaused: () => void;
};

export function ShotControls(props: ShotControlsProps) {
  const Icon = props.paused ? Play : Pause;
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <fieldset className="flex flex-wrap justify-center gap-2">
        <legend className="sr-only">{landingCopy["shot.scenes"]}</legend>
        {shotSceneOrder.map((scene) => (
          <SceneChip
            key={scene}
            label={shotScenes[scene].chip}
            active={scene === props.scene}
            onPress={() => props.onScene(scene)}
          />
        ))}
      </fieldset>
      <button
        type="button"
        aria-label={landingCopy["shot.pause"]}
        aria-pressed={props.paused}
        onClick={props.onTogglePaused}
        className={cn(
          "flex size-10 items-center justify-center rounded-full border border-rope bg-paper transition-colors duration-150 hover:bg-linen motion-reduce:hidden",
          focusRing,
        )}
      >
        <Icon aria-hidden="true" strokeWidth={1.5} className="size-4" />
      </button>
    </div>
  );
}
