import type { ReactNode } from "react";
import { illustrationCopy as copy } from "../copy/illustrationCopy";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="h-135 w-65 shrink-0 rounded-phone bg-ink p-2 shadow-phone">
      <div className="relative size-full overflow-hidden rounded-phone-screen bg-sailcloth font-text text-ink">
        <div
          aria-hidden="true"
          className="flex h-10 items-center justify-between pr-6 pl-7.5 font-medium text-caption"
        >
          <span>{copy["phone.time"]}</span>
          <span className="h-2.25 w-4.5 rounded-xs border border-ink p-px">
            <span className="block h-full w-2/3 rounded-xs bg-ink" />
          </span>
        </div>
        <div
          aria-hidden="true"
          className="absolute top-2.5 left-1/2 h-5.5 w-19 -translate-x-1/2 rounded-full bg-black"
        />
        {children}
        <div
          aria-hidden="true"
          className="absolute bottom-1.75 left-1/2 h-1 w-25 -translate-x-1/2 rounded-full bg-ink"
        />
      </div>
    </div>
  );
}
