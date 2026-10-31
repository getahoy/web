import { landingCopy } from "../copy/landingCopy";
import { DoneVisual } from "./doneVisual";
import { HowItWorksStep } from "./howItWorksStep";
import { ListeningVisual } from "./listeningVisual";
import { ScreenReadVisual } from "./screenReadVisual";

const steps = [
  {
    number: landingCopy["how.step1.number"],
    title: landingCopy["how.step1.title"],
    body: landingCopy["how.step1.body"],
    visual: <ListeningVisual />,
  },
  {
    number: landingCopy["how.step2.number"],
    title: landingCopy["how.step2.title"],
    body: landingCopy["how.step2.body"],
    visual: <ScreenReadVisual />,
  },
  {
    number: landingCopy["how.step3.number"],
    title: landingCopy["how.step3.title"],
    body: landingCopy["how.step3.body"],
    visual: <DoneVisual />,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how" className="px-5 py-20 sm:px-8 sm:py-26 lg:px-12 lg:py-32">
      <h2 className="sr-only">{landingCopy["how.label"]}</h2>
      <ol className="mx-auto flex max-w-page flex-col gap-10 sm:gap-12 lg:gap-16">
        {steps.map((step) => (
          <HowItWorksStep key={step.number} {...step} />
        ))}
      </ol>
    </section>
  );
}
