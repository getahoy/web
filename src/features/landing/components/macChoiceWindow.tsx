import { illustrationCopy as copy } from "../copy/illustrationCopy";
import { choiceOptions } from "./choiceOptions";
import { ChoiceTag } from "./choiceTag";
import { MacWindow } from "./macWindow";
import { OverlayPill } from "./overlayPill";

export function MacChoiceWindow() {
  return (
    <MacWindow
      title={copy["report.title"]}
      detail={copy["report.detail"]}
      className="w-full max-w-full sm:w-140"
    >
      <div className="flex gap-6 border-macos-hairline border-b px-5 pt-7 pb-4">
        {choiceOptions.map((option) => (
          <span
            key={option.number}
            className="relative whitespace-nowrap rounded-control bg-macos-control px-3 py-1.5 text-micro"
          >
            {option.label}
            <ChoiceTag
              number={option.number}
              surface="screen"
              className="absolute -top-3.5 -left-2.75"
            />
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2.5 px-10 pt-19 pb-9">
        <span className="text-eyebrow text-macos-muted uppercase">
          {copy["report.eyebrow"]}
        </span>
        <span className="font-medium text-heard">{copy["report.title"]}</span>
        <p className="text-macos-body text-micro leading-relaxed">
          {copy["report.body"]}
        </p>
        <p className="text-macos-body text-micro leading-relaxed">
          {copy["report.bodyMore"]}
        </p>
      </div>
      <OverlayPill
        className="top-30.5"
        label={copy["overlay.choose"]}
        indicator="none"
        timer="draining"
      />
    </MacWindow>
  );
}
