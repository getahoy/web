import { landingCopy } from "../copy/landingCopy";

export function HeroHeadline() {
  return (
    <h1 className="max-w-hero text-balance font-display font-light text-display">
      {landingCopy["hero.lead"]} <em>{landingCopy["hero.italic"]}</em>
      {landingCopy["hero.italicTrail"]} {landingCopy["hero.tail"]}
    </h1>
  );
}
