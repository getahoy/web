import { illustrationCopy as copy } from "../copy/illustrationCopy";

export function PhoneReplyCard() {
  return (
    <div className="absolute inset-x-3.5 top-34.5 flex animate-in flex-col gap-3 duration-240 ease-enter fade-in slide-in-from-bottom-2">
      <span className="text-center font-display text-driftwood text-heard italic">
        {copy["phone.heard"]}
      </span>
      <div className="flex flex-col gap-1.25 rounded-phone-card bg-paper px-3.5 py-3">
        <span className="font-label text-kelp text-tiny uppercase tracking-eyebrow">
          {copy["phone.doneStatus"]}
        </span>
        <span className="text-body-sm">{copy["phone.doneMessage"]}</span>
      </div>
    </div>
  );
}
