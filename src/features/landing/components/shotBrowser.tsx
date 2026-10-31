import { illustrationCopy as copy } from "../copy/illustrationCopy";
import type { ShotScene, ShotStage } from "../motion/shotTimeline";
import { type BrowserTabSpec, BrowserWindow } from "./browserWindow";
import { DraftCompose } from "./draftCompose";
import { InboxPlaceholder } from "./inboxPlaceholder";
import { VideoPlayer } from "./videoPlayer";

export type BrowserScene = Exclude<ShotScene, "note">;

const tabs: Record<BrowserScene, BrowserTabSpec[]> = {
  pause: [
    { label: copy["tab.youtube"], state: "active" },
    { label: copy["tab.music"], state: "rest" },
    { label: copy["tab.docs"], state: "rest" },
  ],
  draft: [
    { label: copy["tab.inbox"], state: "active" },
    { label: copy["tab.docs"], state: "rest" },
  ],
};

type ShotBrowserProps = { scene: BrowserScene; stage: ShotStage };

export function ShotBrowser({ scene, stage }: ShotBrowserProps) {
  const behind = scene === "draft" && stage === "listening";
  return (
    <BrowserWindow
      tabs={tabs[scene]}
      position={behind ? "behind" : "front"}
      className="w-full"
    >
      <div className="relative aspect-4/3 sm:aspect-video">
        {scene === "pause" ? (
          <VideoPlayer state={stage === "done" ? "paused" : "playing"} />
        ) : (
          <>
            <InboxPlaceholder />
            {stage === "done" ? <DraftCompose /> : null}
          </>
        )}
      </div>
    </BrowserWindow>
  );
}
