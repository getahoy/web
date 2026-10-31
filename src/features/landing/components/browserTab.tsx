export type BrowserTabState = "rest" | "active" | "target";

export function BrowserTab({
  label,
  state,
}: {
  label: string;
  state: BrowserTabState;
}) {
  return (
    <span
      data-state={state}
      className="min-w-0 truncate whitespace-nowrap rounded-control px-3 py-1.5 text-caption text-macos-muted transition-shadow duration-240 ease-enter data-[state=active]:bg-white data-[state=target]:bg-white data-[state=active]:text-macos-text data-[state=target]:text-macos-text data-[state=target]:ring-2 data-[state=target]:ring-signal data-[state=target]:ring-offset-2 data-[state=target]:ring-offset-macos-chrome"
    >
      {label}
    </span>
  );
}
