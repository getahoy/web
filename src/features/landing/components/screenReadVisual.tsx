import { illustrationCopy as copy } from "../copy/illustrationCopy";
import { BrowserTab } from "./browserTab";
import { MacWindow } from "./macWindow";
import { YoutubePage } from "./youtubePage";

const tabs = [
  { label: copy["tab.youtube"], state: "target" },
  { label: copy["tab.music"], state: "rest" },
  { label: copy["tab.docs"], state: "rest" },
] as const;

export function ScreenReadVisual() {
  return (
    <MacWindow
      className="aspect-window w-full max-w-140"
      header={
        <span className="ml-2 flex min-w-0 items-center gap-1.5">
          {tabs.map((tab) => (
            <BrowserTab key={tab.label} label={tab.label} state={tab.state} />
          ))}
        </span>
      }
    >
      <YoutubePage view="rest" />
    </MacWindow>
  );
}
