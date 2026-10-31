import type { ReactNode } from "react";

type HowItWorksStepProps = {
  number: string;
  title: string;
  body: string;
  visual: ReactNode;
};

export function HowItWorksStep(props: HowItWorksStepProps) {
  return (
    <li className="grid items-center gap-6 lg:grid-cols-12 lg:gap-18">
      <div className="flex max-w-step flex-col gap-3 lg:col-span-5">
        <span className="font-label text-driftwood text-micro">
          {props.number}
        </span>
        <h3 className="text-balance font-display font-light text-heading">
          {props.title}
        </h3>
        <p className="text-pretty text-body-lg text-driftwood">{props.body}</p>
      </div>
      <div
        aria-hidden="true"
        className="flex select-none items-center justify-center lg:col-span-7"
      >
        {props.visual}
      </div>
    </li>
  );
}
