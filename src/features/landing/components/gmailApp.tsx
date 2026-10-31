import { SquarePen } from "lucide-react";
import { cn } from "@/lib/cn";
import { macAppCopy as copy, inboxMails } from "../copy/macAppCopy";
import type { ShotView } from "../motion/shotTimeline";
import { actingRing } from "./actingRing";
import { GmailDraft } from "./gmailDraft";

const folders = [copy["gmail.starred"], copy["gmail.sent"]];

export function GmailApp({ view }: { view: ShotView }) {
  const drafted = view === "done";
  return (
    <div className="absolute inset-0 flex">
      <div className="hidden w-39 shrink-0 flex-col gap-1 px-2.5 py-3.5 text-caption sm:flex">
        <span
          data-acting={view === "acting"}
          className={cn(
            "mb-2 flex h-9 items-center gap-2 self-start rounded-thumb bg-linen pr-4 pl-3 font-medium text-micro",
            actingRing,
          )}
        >
          <SquarePen strokeWidth={1.5} className="size-3.5" />
          {copy["gmail.compose"]}
        </span>
        <span className="flex h-7 items-center justify-between rounded-full bg-macos-chrome px-2.5 font-medium">
          {copy["gmail.inbox"]}
          <span>{copy["gmail.inboxCount"]}</span>
        </span>
        {folders.map((folder) => (
          <span
            key={folder}
            className="flex h-7 items-center px-2.5 text-macos-body"
          >
            {folder}
          </span>
        ))}
        <span className="flex h-7 items-center justify-between px-2.5 text-macos-body">
          {copy["gmail.drafts"]}
          <span>{drafted ? copy["gmail.draftCount"] : null}</span>
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col border-macos-hairline sm:border-l">
        {inboxMails.map((mail) => (
          <div
            key={mail.subject}
            className={cn(
              "flex h-11 items-center gap-3 border-macos-hairline border-b px-4 text-caption",
              mail.unread && "font-medium",
            )}
          >
            <span className="w-20 shrink-0 truncate sm:w-24">{mail.from}</span>
            <span className="min-w-0 flex-1 truncate">
              {mail.subject}
              <span className="font-normal text-macos-muted">
                {` · ${mail.snippet}`}
              </span>
            </span>
            <span className="shrink-0 text-macos-muted">{mail.time}</span>
          </div>
        ))}
      </div>
      {drafted ? <GmailDraft /> : null}
    </div>
  );
}
