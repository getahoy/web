import type { ReactNode } from "react";
import { illustrationCopy as copy } from "../copy/illustrationCopy";
import type { ShotScene, ShotStage } from "../motion/shotTimeline";
import { type BrowserTabSpec, BrowserWindow } from "./browserWindow";
import { ChatPlaceholder } from "./chatPlaceholder";
import { DraftCompose } from "./draftCompose";
import { InboxPlaceholder } from "./inboxPlaceholder";
import { OverlayPill } from "./overlayPill";
import { shotScenes } from "./shotScenes";
import { VideoPlayer } from "./videoPlayer";

const indicators = { listening: "wave", acting: "none", done: "done" } as const;

function tabsFor(scene: ShotScene, stage: ShotStage): BrowserTabSpec[] {
  const docs: BrowserTabSpec = { label: copy["tab.docs"], state: "rest" };
  switch (scene) {
    case "pause":
      return [
        { label: copy["tab.youtube"], state: "active" },
        { label: copy["tab.grok"], state: "rest" },
        docs,
      ];
    case "closeTab":
      if (stage === "done") {
        return [{ label: copy["tab.youtube"], state: "active" }, docs];
      }
      return [
        { label: copy["tab.youtube"], state: "rest" },
        {
          label: copy["tab.grok"],
          state: stage === "acting" ? "target" : "active",
        },
        docs,
      ];
    case "draft":
      return [{ label: copy["tab.inbox"], state: "active" }, docs];
    default: {
      const unhandled: never = scene;
      return unhandled;
    }
  }
}

function pageFor(scene: ShotScene, stage: ShotStage): ReactNode {
  switch (scene) {
    case "pause":
      return <VideoPlayer state={stage === "done" ? "paused" : "playing"} />;
    case "closeTab":
      return stage === "done" ? (
        <VideoPlayer state="paused" />
      ) : (
        <ChatPlaceholder />
      );
    case "draft":
      return (
        <>
          <InboxPlaceholder />
          {stage === "done" ? <DraftCompose /> : null}
        </>
      );
    default: {
      const unhandled: never = scene;
      return unhandled;
    }
  }
}

const pillLabel = (scene: ShotScene, stage: ShotStage): string =>
  stage === "listening"
    ? copy["overlay.listening"]
    : shotScenes[scene][stage === "acting" ? "acting" : "done"];

type ShotBrowserProps = { scene: ShotScene; stage: ShotStage };

export function ShotBrowser({ scene, stage }: ShotBrowserProps) {
  const behind = scene === "draft" && stage === "listening";
  return (
    <BrowserWindow
      tabs={tabsFor(scene, stage)}
      position={behind ? "behind" : "front"}
      className="w-full max-w-full sm:w-170"
    >
      <div className="relative aspect-4/3 sm:aspect-video">
        {pageFor(scene, stage)}
      </div>
      <OverlayPill
        className="top-15.5"
        label={pillLabel(scene, stage)}
        indicator={indicators[stage]}
        timer="none"
      />
    </BrowserWindow>
  );
}
