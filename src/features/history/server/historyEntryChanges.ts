import { and, eq, gt, isNotNull, isNull } from "drizzle-orm";
import { database } from "@/db/client";
import { commandHistory } from "@/db/schema";
import { restorableSince } from "./historyWindows";

type EntryRef = { userId: string; id: string };

const ownedEntry = ({ userId, id }: EntryRef) =>
  and(eq(commandHistory.userId, userId), eq(commandHistory.id, id));

export async function softDeleteEntry(entry: EntryRef): Promise<boolean> {
  const deleted = await database
    .update(commandHistory)
    .set({ deletedAt: new Date() })
    .where(and(ownedEntry(entry), isNull(commandHistory.deletedAt)))
    .returning({ id: commandHistory.id });
  return deleted.length > 0;
}

export async function restoreEntry(entry: EntryRef): Promise<boolean> {
  const restored = await database
    .update(commandHistory)
    .set({ deletedAt: null })
    .where(
      and(
        ownedEntry(entry),
        isNotNull(commandHistory.deletedAt),
        gt(commandHistory.deletedAt, restorableSince(new Date())),
      ),
    )
    .returning({ id: commandHistory.id });
  return restored.length > 0;
}

export async function clearHistory(userId: string): Promise<number> {
  const cleared = await database
    .delete(commandHistory)
    .where(eq(commandHistory.userId, userId));
  return cleared.rowCount ?? 0;
}
