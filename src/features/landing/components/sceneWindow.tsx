import { macAppCopy } from "../copy/macAppCopy";
import type { ShotScene, ShotView } from "../motion/shotTimeline";
import { GmailApp } from "./gmailApp";
import { NotesApp } from "./notesApp";
import { ShotWindow } from "./shotWindow";
import { YoutubePage } from "./youtubePage";

export function SceneWindow({
  scene,
  view,
}: {
  scene: ShotScene;
  view: ShotView;
}) {
  if (scene === "note") {
    return (
      <ShotWindow chrome={{ kind: "notes", acting: view === "acting" }}>
        <NotesApp view={view} />
      </ShotWindow>
    );
  }
  const url =
    scene === "pause" ? macAppCopy["youtube.url"] : macAppCopy["gmail.url"];
  return (
    <ShotWindow chrome={{ kind: "browser", url }}>
      {scene === "pause" ? (
        <YoutubePage view={view} />
      ) : (
        <GmailApp view={view} />
      )}
    </ShotWindow>
  );
}
