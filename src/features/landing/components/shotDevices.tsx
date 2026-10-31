import type { Ref } from "react";
import { landingCopy } from "../copy/landingCopy";
import { shotScenes } from "../copy/shotScenes";
import type { ShotScene } from "../motion/shotTimeline";
import { PhoneDemoScreen } from "./phoneDemoScreen";
import { PhoneFrame } from "./phoneFrame";
import type { ShotDemoShown } from "./shotDemoView";
import { ShotMac } from "./shotMac";

type ShotDevicesProps = {
  ref: Ref<HTMLDivElement>;
  scene: ShotScene;
  shown: ShotDemoShown;
  noMatch: boolean;
  micListening: boolean;
  onTapMic: () => void;
};

export function ShotDevices(props: ShotDevicesProps) {
  const { shown } = props;
  return (
    <div
      ref={props.ref}
      role="tabpanel"
      aria-label={shotScenes[props.scene].tab}
      className="flex w-full flex-col items-center justify-center gap-8 lg:flex-row lg:gap-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none order-2 w-full max-w-160 select-none lg:order-none lg:w-auto"
      >
        <ShotMac
          scene={props.scene}
          view={shown.view}
          micListening={props.micListening}
        />
      </div>
      <div className="relative order-1 lg:order-none">
        <PhoneFrame>
          <PhoneDemoScreen
            scene={props.scene}
            view={shown.view}
            heard={shown.heard}
            noMatch={props.noMatch}
            showExamples={shown.showExamples}
            bar={shown.bar}
            onTapMic={props.onTapMic}
          />
        </PhoneFrame>
        {shown.tryHint ? (
          <span
            aria-hidden="true"
            className="absolute bottom-15.5 left-full ml-5 hidden animate-in whitespace-nowrap font-label text-caption text-driftwood fade-in lg:block"
          >
            {landingCopy["shot.tryHint"]}
          </span>
        ) : null}
      </div>
    </div>
  );
}
