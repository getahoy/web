import { cn } from "@/lib/cn";
import { landingCopy } from "../copy/landingCopy";
import { TrySaying } from "./trySaying";

type DemoFooterProps = {
  examples: readonly string[] | null;
  privacyVisible: boolean;
  announcement: string;
};

export function DemoFooter(props: DemoFooterProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {props.examples ? <TrySaying examples={props.examples} /> : null}
      <p
        aria-hidden={!props.privacyVisible}
        className={cn(
          "min-h-4.5 max-w-subtitle text-balance text-center text-caption text-driftwood transition-opacity duration-240",
          props.privacyVisible ? "opacity-100" : "opacity-0",
        )}
      >
        {landingCopy["try.privacy"]}
      </p>
      <p aria-live="polite" className="sr-only">
        {props.announcement}
      </p>
    </div>
  );
}
