import { landingCopy } from "../copy/landingCopy";

export function DoneVisual() {
  return (
    <div className="flex w-full max-w-90 flex-col gap-4">
      <span className="text-center font-display text-driftwood text-heard italic">
        {landingCopy["how.step3.heard"]}
      </span>
      <div className="flex flex-col gap-2 rounded-card bg-paper px-6 py-5 shadow-float">
        <span className="font-label text-eyebrow text-kelp uppercase">
          {landingCopy["how.step3.status"]}
        </span>
        <span className="text-body-lg">{landingCopy["how.step3.message"]}</span>
      </div>
    </div>
  );
}
