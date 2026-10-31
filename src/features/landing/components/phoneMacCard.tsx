import { Laptop } from "lucide-react";
import { illustrationCopy as copy } from "../copy/illustrationCopy";

export function PhoneMacCard() {
  return (
    <div className="px-3.5 pt-1.5">
      <div className="flex items-center gap-2 rounded-phone-card bg-paper px-3 py-2.5">
        <span className="flex size-7 items-center justify-center rounded-full bg-linen">
          <Laptop strokeWidth={1.5} className="size-3.5" />
        </span>
        <span className="min-w-0 flex-1 whitespace-nowrap font-medium text-micro">
          {copy["phone.mac"]}
        </span>
        <span className="inline-flex h-5 shrink-0 items-center gap-1 rounded-full border border-rope px-1.75 font-medium text-tiny">
          <span className="size-1.25 rounded-full bg-kelp" />
          {copy["phone.connected"]}
        </span>
      </div>
    </div>
  );
}
