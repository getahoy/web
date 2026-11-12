import {
  DID_NOT_GO_THROUGH,
  type HistoryStatus,
  WENT_THROUGH,
} from "@getahoy/protocol";
import { and, count, gte, inArray, sql } from "drizzle-orm";
import { database } from "@/db/client";
import { commandHistory } from "@/db/schema";
import { historyScope } from "./historyScope";
import { summarySince } from "./historyWindows";

type SummaryInput = { userId: string; macKey: string | undefined; now: Date };

const countOf = (statuses: readonly HistoryStatus[]) =>
  sql<number>`count(*) filter (where ${inArray(commandHistory.status, [...statuses])})`.mapWith(
    Number,
  );

export async function historySummary({ userId, macKey, now }: SummaryInput) {
  const [counts] = await database
    .select({
      lastSevenDays: count(),
      wentThrough: countOf(WENT_THROUGH),
      didntGoThrough: countOf(DID_NOT_GO_THROUGH),
    })
    .from(commandHistory)
    .where(
      and(
        ...historyScope(userId, macKey),
        gte(commandHistory.startedAt, summarySince(now)),
      ),
    );
  return counts ?? { lastSevenDays: 0, wentThrough: 0, didntGoThrough: 0 };
}
