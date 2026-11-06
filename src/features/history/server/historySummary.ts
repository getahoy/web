import { and, count, gte, inArray, sql } from "drizzle-orm";
import { database } from "@/db/client";
import { commandHistory } from "@/db/schema";
import { historyScope } from "./historyScope";
import { DID_NOT_GO_THROUGH } from "./historyStatuses";
import { summarySince } from "./historyWindows";

type SummaryInput = { userId: string; macKey: string | undefined; now: Date };

export async function historySummary({ userId, macKey, now }: SummaryInput) {
  const failed = inArray(commandHistory.status, [...DID_NOT_GO_THROUGH]);
  const [counts] = await database
    .select({
      lastSevenDays: count(),
      didntGoThrough: sql<number>`count(*) filter (where ${failed})`.mapWith(
        Number,
      ),
    })
    .from(commandHistory)
    .where(
      and(
        ...historyScope(userId, macKey),
        gte(commandHistory.startedAt, summarySince(now)),
      ),
    );
  return counts ?? { lastSevenDays: 0, didntGoThrough: 0 };
}
