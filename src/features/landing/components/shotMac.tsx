import { illustrationCopy as copy } from "../copy/illustrationCopy";
import type { ShotScene, ShotStage } from "../motion/shotTimeline";
import { NotesWindow } from "./notesWindow";
import { OverlayPill } from "./overlayPill";
import { ShotBrowser } from "./shotBrowser";
import { shotScenes } from "./shotScenes";

const indicators = { listening: "wave", acting: "none", done: "done" } as const;

const pillLabel = (scene: ShotScene, stage: ShotStage): string =>
  stage === "listening"
    ? copy["overlay.listening"]
    : shotScenes[scene][stage === "acting" ? "acting" : "done"];

type ShotMacProps = { scene: ShotScene; stage: ShotStage };

export function ShotMac({ scene, stage }: ShotMacProps) {
  return (
    <div className="relative w-full max-w-full sm:w-170">
      {scene === "note" ? (
        <NotesWindow stage={stage} />
      ) : (
        <ShotBrowser scene={scene} stage={stage} />
      )}
      <OverlayPill
        className="top-15.5"
        label={pillLabel(scene, stage)}
        indicator={indicators[stage]}
        timer="none"
      />
    </div>
  );
}
