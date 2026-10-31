import { illustrationCopy as copy } from "../copy/illustrationCopy";
import { BrowserWindow } from "./browserWindow";
import { ChatPlaceholder } from "./chatPlaceholder";

const tabs = [
  { label: copy["tab.youtube"], state: "rest" },
  { label: copy["tab.grok"], state: "target" },
  { label: copy["tab.docs"], state: "rest" },
] as const;

export function ScreenReadVisual() {
  return (
    <BrowserWindow tabs={tabs} position="front" className="w-full max-w-140">
      <div className="relative aspect-video">
        <ChatPlaceholder />
      </div>
    </BrowserWindow>
  );
}
