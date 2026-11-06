import { eq, isNull, type SQL } from "drizzle-orm";
import { commandHistory } from "@/db/schema";

export function historyScope(
  userId: string,
  macKey: string | undefined,
): SQL[] {
  const visible = [
    eq(commandHistory.userId, userId),
    isNull(commandHistory.deletedAt),
  ];
  if (!macKey) return visible;
  const mac = eq(commandHistory.macKey, Buffer.from(macKey, "base64url"));
  return [...visible, mac];
}
