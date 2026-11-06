import { lt, or } from "drizzle-orm";
import { database } from "@/db/client";
import { commandHistory } from "@/db/schema";
import { retentionCutoffs } from "./historyWindows";

export async function purgeExpiredHistory(now: Date): Promise<number> {
  const { startedBefore, deletedBefore } = retentionCutoffs(now);
  const purged = await database
    .delete(commandHistory)
    .where(
      or(
        lt(commandHistory.startedAt, startedBefore),
        lt(commandHistory.deletedAt, deletedBefore),
      ),
    );
  return purged.rowCount ?? 0;
}
