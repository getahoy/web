import { landingCopy } from "../copy/landingCopy";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-night-rope border-t bg-night pt-16 text-sailcloth sm:pt-20 lg:pt-24">
      <div className="mx-auto flex max-w-page flex-col gap-10 px-5 sm:px-8 lg:gap-14 lg:px-12">
        <div className="flex flex-col gap-3">
          <Wordmark size="footer" />
          <p className="text-button text-night-driftwood">
            {landingCopy["footer.tagline"]}
          </p>
        </div>
        <div className="flex justify-between gap-4 border-night-rope border-t pt-5 text-micro text-night-driftwood">
          <span>{landingCopy["footer.copyright"]}</span>
          <span>{landingCopy["footer.origin"]}</span>
        </div>
      </div>
      <div className="px-5 pt-12 sm:px-8 lg:px-12 lg:pt-18">
        <div
          aria-hidden="true"
          className="flex h-giant select-none justify-center overflow-hidden whitespace-nowrap font-display font-light text-giant text-night-raised"
        >
          {landingCopy["wordmark.name"]}
        </div>
      </div>
    </footer>
  );
}
