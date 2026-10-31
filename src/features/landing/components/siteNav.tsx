"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { landingCopy } from "../copy/landingCopy";
import { NAV_PILL_AFTER_PX } from "../motion/landingMotion";
import { focusRing } from "./focusRing";
import { Wordmark } from "./wordmark";

export function SiteNav() {
  const { scrollY } = useScroll();
  const [floating, setFloating] = useState(false);
  useMotionValueEvent(scrollY, "change", (offset) =>
    setFloating(offset > NAV_PILL_AFTER_PX),
  );

  return (
    <header
      data-floating={floating}
      className="group pointer-events-none sticky top-0 z-40 flex h-14 justify-center px-5 transition-[padding] duration-240 ease-enter data-[floating=true]:px-3 sm:px-8 lg:px-12"
    >
      <nav
        aria-label={landingCopy["nav.label"]}
        className="pointer-events-auto flex h-14 w-full max-w-page items-center border border-transparent transition-all duration-240 ease-enter group-data-[floating=true]:mt-2 group-data-[floating=true]:h-12 group-data-[floating=true]:rounded-full group-data-[floating=true]:border-rope group-data-[floating=true]:bg-paper/80 group-data-[floating=true]:pr-2 group-data-[floating=true]:pl-4 group-data-[floating=true]:shadow-float group-data-[floating=true]:backdrop-blur-md sm:group-data-[floating=true]:max-w-150"
      >
        <a
          href="#top"
          aria-label={landingCopy["nav.home"]}
          className={cn("mr-auto flex h-11 items-center rounded-sm", focusRing)}
        >
          <Wordmark size="nav" />
        </a>
        <a
          href="#waitlist"
          className={cn("flex h-11 items-center rounded-full", focusRing)}
        >
          <span className="flex h-8 items-center rounded-full bg-ink px-3.5 font-medium text-micro text-white transition-transform duration-150 active:scale-97">
            {landingCopy["nav.join"]}
          </span>
        </a>
      </nav>
    </header>
  );
}
