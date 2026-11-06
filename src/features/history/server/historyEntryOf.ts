import type { HistoryEntry } from "@getahoy/protocol";
import type { commandHistory } from "@/db/schema";

type HistoryRow = typeof commandHistory.$inferSelect;

export function historyEntryOf(row: HistoryRow): HistoryEntry {
  return {
    id: row.id,
    macKey: row.macKey.toString("base64url"),
    macName: row.macName,
    heard: row.heard,
    did: row.did,
    status: row.status,
    app: row.app,
    via: row.via,
    reason: row.reason,
    timings: row.timings,
    followUps: row.followUps,
    startedAt: row.startedAt.toISOString(),
    finishedAt: row.finishedAt?.toISOString() ?? null,
  };
}
