import { cn } from "@/lib/cn";

type ChoiceTagProps = {
  number: number;
  surface: "screen" | "phone";
  className?: string;
};

export function ChoiceTag({ number, surface, className }: ChoiceTagProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-7 -skew-x-10 items-center justify-center rounded-tag bg-ink px-2",
        surface === "screen" && "shadow-tag",
        className,
      )}
    >
      <span className="skew-x-10 font-label text-tag text-white">{number}</span>
    </span>
  );
}
