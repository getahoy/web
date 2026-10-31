import { illustrationCopy as copy } from "../copy/illustrationCopy";
import type { ShotScene, ShotView } from "../motion/shotTimeline";
import { OverlayPill } from "./overlayPill";
import { SceneWindow } from "./sceneWindow";
import { shotScenes } from "./shotScenes";

type ShotMacProps = { scene: ShotScene; view: ShotView; micListening: boolean };

function pill(scene: ShotScene, view: ShotView, micListening: boolean) {
  if (micListening || view === "listening") {
    return { label: copy["overlay.listening"], indicator: "wave" } as const;
  }
  if (view === "acting") {
    return { label: shotScenes[scene].acting, indicator: "none" } as const;
  }
  if (view === "done") {
    return { label: shotScenes[scene].done, indicator: "done" } as const;
  }
  return null;
}

export function ShotMac({ scene, view, micListening }: ShotMacProps) {
  const overlay = pill(scene, view, micListening);
  return (
    <div className="relative w-full">
      <SceneWindow scene={scene} view={view} />
      {overlay ? (
        <OverlayPill
          className="top-14 animate-in fade-in"
          label={overlay.label}
          indicator={overlay.indicator}
          timer="none"
        />
      ) : null}
    </div>
  );
}
