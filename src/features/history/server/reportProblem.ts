import { and, eq, isNull } from "drizzle-orm";
import { database } from "@/db/client";
import { commandHistory, problemReports } from "@/db/schema";

type ReportInput = { userId: string; id: string; note: string | undefined };

export async function reportProblem({
  userId,
  id,
  note,
}: ReportInput): Promise<boolean> {
  const [entry] = await database
    .select({
      heard: commandHistory.heard,
      did: commandHistory.did,
      status: commandHistory.status,
      app: commandHistory.app,
      reason: commandHistory.reason,
      timings: commandHistory.timings,
    })
    .from(commandHistory)
    .where(
      and(
        eq(commandHistory.userId, userId),
        eq(commandHistory.id, id),
        isNull(commandHistory.deletedAt),
      ),
    );
  if (!entry) return false;
  await database
    .insert(problemReports)
    .values({ userId, historyId: id, snapshot: entry, note: note || null });
  return true;
}
