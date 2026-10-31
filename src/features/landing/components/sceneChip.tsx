import { cn } from "@/lib/cn";
import { focusRing } from "./focusRing";

type SceneChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export function SceneChip({ label, active, onPress }: SceneChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onPress}
      className={cn(
        "h-10 rounded-full border border-rope bg-paper px-4 font-medium text-button transition-colors duration-150 hover:bg-linen aria-pressed:border-signal aria-pressed:bg-signal-mist",
        focusRing,
      )}
    >
      {label}
    </button>
  );
}
