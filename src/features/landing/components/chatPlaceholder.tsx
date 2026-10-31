const lines = [
  { side: "self-end", width: "w-1/3", tone: "bg-macos-control" },
  { side: "self-start", width: "w-3/4", tone: "bg-macos-hairline" },
  { side: "self-start", width: "w-2/3", tone: "bg-macos-hairline" },
  { side: "self-end", width: "w-1/4", tone: "bg-macos-control" },
  { side: "self-start", width: "w-1/2", tone: "bg-macos-hairline" },
];

export function ChatPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col justify-end gap-3 px-6 pb-6 sm:px-14 sm:pb-8">
      {lines.map((line) => (
        <span
          key={`${line.side}-${line.width}`}
          className={`h-3 rounded-full ${line.side} ${line.width} ${line.tone}`}
        />
      ))}
    </div>
  );
}
