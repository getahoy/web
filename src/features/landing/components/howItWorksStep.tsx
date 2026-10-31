import type { ReactNode } from "react";

type HowItWorksStepProps = {
  number: string;
  title: string;
  body: string;
  visual: ReactNode;
};

export function HowItWorksStep(props: HowItWorksStepProps) {
  return (
    <li className="grid items-center gap-10 lg:grid-cols-12 lg:gap-18">
      <div className="flex max-w-step flex-col gap-4.5 lg:col-span-5">
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
        className="flex min-h-70 select-none items-center justify-center sm:min-h-85 lg:col-span-7 lg:min-h-105"
      >
        {props.visual}
      </div>
    </li>
  );
}
