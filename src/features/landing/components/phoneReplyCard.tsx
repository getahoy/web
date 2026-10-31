type PhoneReplyCardProps = { heard: string; status: string; message: string };

export function PhoneReplyCard({
  heard,
  status,
  message,
}: PhoneReplyCardProps) {
  return (
    <div className="absolute inset-x-3.5 top-34.5 flex animate-in flex-col gap-3 duration-240 ease-enter fade-in slide-in-from-bottom-2">
      <span className="text-balance text-center font-display text-driftwood text-heard italic">
        {heard}
      </span>
      <div className="flex flex-col gap-1.25 rounded-phone-card bg-paper px-3.5 py-3">
        <span className="font-label text-kelp text-tiny uppercase tracking-eyebrow">
          {status}
        </span>
        <span className="text-body-sm">{message}</span>
      </div>
    </div>
  );
}
