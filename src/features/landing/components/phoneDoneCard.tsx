import { cn } from "@/lib/cn";

type PhoneDoneCardProps = {
  status: string;
  message: string;
  detail?: string;
  className?: string;
};

export function PhoneDoneCard(props: PhoneDoneCardProps) {
  return (
    <div
      className={cn(
        "absolute inset-x-3.5 flex animate-in flex-col gap-1.5 rounded-card bg-paper px-4 py-3.5 shadow-float duration-480 ease-enter fade-in slide-in-from-bottom-3",
        props.className,
      )}
    >
      <span className="font-label text-eyebrow text-kelp uppercase tracking-eyebrow">
        {props.status}
      </span>
      <span className="text-button">{props.message}</span>
      {props.detail ? (
        <span className="text-caption text-driftwood">{props.detail}</span>
      ) : null}
    </div>
  );
}
