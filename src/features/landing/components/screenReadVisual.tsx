import { illustrationCopy as copy } from "../copy/illustrationCopy";
import { BrowserWindow } from "./browserWindow";
import { VideoPlayer } from "./videoPlayer";

const tabs = [
  { label: copy["tab.youtube"], state: "target" },
  { label: copy["tab.music"], state: "rest" },
  { label: copy["tab.docs"], state: "rest" },
] as const;

export function ScreenReadVisual() {
  return (
    <BrowserWindow tabs={tabs} position="front" className="w-full max-w-140">
      <div className="relative aspect-video">
        <VideoPlayer state="playing" />
      </div>
    </BrowserWindow>
  );
}
