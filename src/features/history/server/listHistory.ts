import {
  HISTORY_PAGE_SIZE,
  type HistoryPage,
  type HistoryQuery,
  statusesShownBy,
} from "@getahoy/protocol";
import { and, desc, ilike, inArray, or, type SQL, sql } from "drizzle-orm";
import { database } from "@/db/client";
import { commandHistory } from "@/db/schema";
import { containsPattern } from "./containsPattern";
import { encodeHistoryCursor, type HistoryCursor } from "./historyCursor";
import { historyEntryOf } from "./historyEntryOf";
import { historyScope } from "./historyScope";
import { historySummary } from "./historySummary";

type ListInput = {
  userId: string;
  query: HistoryQuery;
  cursor: HistoryCursor | null;
};

function narrowing({ query, cursor }: ListInput): (SQL | undefined)[] {
  const statuses = statusesShownBy(query.status);
  const pattern = query.q ? containsPattern(query.q) : null;
  return [
    statuses ? inArray(commandHistory.status, [...statuses]) : undefined,
    pattern
      ? or(
          ilike(commandHistory.heard, pattern),
          ilike(commandHistory.did, pattern),
          ilike(commandHistory.app, pattern),
        )
      : undefined,
    cursor
      ? sql`(${commandHistory.startedAt}, ${commandHistory.id}) < (${cursor.startedAt}, ${cursor.id})`
      : undefined,
  ];
}

export async function listHistory(input: ListInput): Promise<HistoryPage> {
  const { userId, query, cursor } = input;
  const rows = await database
    .select()
    .from(commandHistory)
    .where(and(...historyScope(userId, query.macKey), ...narrowing(input)))
    .orderBy(desc(commandHistory.startedAt), desc(commandHistory.id))
    .limit(HISTORY_PAGE_SIZE + 1);
  const page = rows.slice(0, HISTORY_PAGE_SIZE);
  const last = page.at(-1);
  const hasMore = rows.length > HISTORY_PAGE_SIZE && last !== undefined;
  const unfiltered = !cursor && !query.q && query.status === "all";
  const now = new Date();
  return {
    entries: page.map(historyEntryOf),
    cursor: hasMore ? encodeHistoryCursor(last) : null,
    summary: unfiltered
      ? await historySummary({ userId, macKey: query.macKey, now })
      : null,
  };
}
