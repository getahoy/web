const rows = ["w-3/5", "w-2/3", "w-1/2", "w-3/4", "w-2/5"];

export function InboxPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col px-4 pt-2 sm:px-6">
      {rows.map((width) => (
        <div
          key={width}
          className="flex items-center gap-3 border-macos-hairline border-b py-3"
        >
          <span className="size-2 shrink-0 rounded-full bg-macos-control" />
          <span className="h-2.5 w-1/5 shrink-0 rounded-full bg-macos-control" />
          <span className={`h-2.5 rounded-full bg-macos-hairline ${width}`} />
        </div>
      ))}
    </div>
  );
}
