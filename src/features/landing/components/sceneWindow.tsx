import { macAppCopy as copy } from "../copy/macAppCopy";
import type { ShotScene, ShotView } from "../motion/shotTimeline";
import { GmailApp } from "./gmailApp";
import { MacWindow } from "./macWindow";
import { NotesApp } from "./notesApp";
import { NotesHeader } from "./notesHeader";
import { YoutubePage } from "./youtubePage";

const windowSize = "aspect-square w-full sm:aspect-window lg:w-160";

export function SceneWindow({
  scene,
  view,
}: {
  scene: ShotScene;
  view: ShotView;
}) {
  if (scene === "note") {
    return (
      <MacWindow
        className={windowSize}
        header={<NotesHeader acting={view === "acting"} />}
      >
        <NotesApp view={view} />
      </MacWindow>
    );
  }
  const url = scene === "pause" ? copy["youtube.url"] : copy["gmail.url"];
  const header = (
    <>
      <span className="mx-auto flex h-6.5 w-1/2 max-w-70 items-center justify-center truncate rounded-control bg-macos-control text-caption text-macos-body">
        {url}
      </span>
      <span className="w-14" />
    </>
  );
  return (
    <MacWindow className={windowSize} header={header}>
      {scene === "pause" ? (
        <YoutubePage view={view} />
      ) : (
        <GmailApp view={view} />
      )}
    </MacWindow>
  );
}
