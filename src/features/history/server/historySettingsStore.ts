import { eq } from "drizzle-orm";
import { database } from "@/db/client";
import { commandHistory, historySettings } from "@/db/schema";

export async function keepsHistory(userId: string): Promise<boolean> {
  const [settings] = await database
    .select({ keepHistory: historySettings.keepHistory })
    .from(historySettings)
    .where(eq(historySettings.userId, userId));
  return settings?.keepHistory ?? true;
}

export async function setKeepHistory(
  userId: string,
  keepHistory: boolean,
): Promise<void> {
  await database.transaction(async (transaction) => {
    await transaction
      .insert(historySettings)
      .values({ userId, keepHistory })
      .onConflictDoUpdate({
        target: historySettings.userId,
        set: { keepHistory },
      });
    if (keepHistory) return;
    await transaction
      .delete(commandHistory)
      .where(eq(commandHistory.userId, userId));
  });
}
