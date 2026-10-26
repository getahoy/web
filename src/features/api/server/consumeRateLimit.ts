import { randomUUID } from "node:crypto";
import { sql } from "drizzle-orm";
import { database } from "@/db/client";
import { rateLimit } from "@/db/schema";

export type RateLimitRule = { windowMs: number; max: number };

export async function consumeRateLimit(
  key: string,
  rule: RateLimitRule,
): Promise<boolean> {
  const now = Date.now();
  const expired = sql`${rateLimit.lastRequest} <= ${now - rule.windowMs}`;
  const [counted] = await database
    .insert(rateLimit)
    .values({ id: randomUUID(), key, count: 1, lastRequest: now })
    .onConflictDoUpdate({
      target: rateLimit.key,
      set: {
        count: sql`case when ${expired} then 1 else ${rateLimit.count} + 1 end`,
        lastRequest: sql`case when ${expired} then ${now} else ${rateLimit.lastRequest} end`,
      },
    })
    .returning({ count: rateLimit.count });
  return counted !== undefined && counted.count <= rule.max;
}
