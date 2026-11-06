import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { database } from "@/db/client";
import { devices } from "@/db/schema";

// A late outbox flush after Remove still names the revoked row, so the newest one stands in.
export async function ownedDeviceIds(
  userId: string,
  publicKeys: readonly string[],
): Promise<Map<string, string> | null> {
  const wanted = [...new Set(publicKeys)];
  const rows = await database
    .select({ id: devices.id, publicKey: devices.publicKey })
    .from(devices)
    .where(
      and(
        eq(devices.userId, userId),
        inArray(
          devices.publicKey,
          wanted.map((key) => Buffer.from(key, "base64url")),
        ),
      ),
    )
    .orderBy(
      sql`${devices.revokedAt} is null desc`,
      desc(sql`coalesce(${devices.revokedAt}, ${devices.createdAt})`),
    );
  const owned = new Map<string, string>();
  for (const row of rows) {
    const key = row.publicKey.toString("base64url");
    if (!owned.has(key)) owned.set(key, row.id);
  }
  return wanted.every((key) => owned.has(key)) ? owned : null;
}
