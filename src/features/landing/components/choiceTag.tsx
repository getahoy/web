import { cn } from "@/lib/cn";

type ChoiceTagProps = {
  number: number;
  surface: "screen" | "phone";
  selected: boolean;
  className?: string;
};

export function ChoiceTag(props: ChoiceTagProps) {
  return (
    <span
      data-selected={props.selected}
      className={cn(
        "inline-flex h-7 min-w-7 -skew-x-10 items-center justify-center rounded-tag bg-ink px-2 transition-[background-color,scale] duration-240 ease-spring data-[selected=true]:scale-110 data-[selected=true]:bg-signal",
        props.surface === "screen" && "shadow-tag",
        props.className,
      )}
    >
      <span className="skew-x-10 font-label text-tag text-white">
        {props.number}
      </span>
    </span>
  );
}
