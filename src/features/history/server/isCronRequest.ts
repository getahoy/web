import { timingSafeEqual } from "node:crypto";
import { serverEnv } from "@/env/serverEnv";

export type CronAccess = "allowed" | "unconfigured" | "refused";

export function cronAccess(headers: Headers): CronAccess {
  const secret = serverEnv.CRON_SECRET;
  if (secret === undefined) return "unconfigured";
  const presented = Buffer.from(headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  if (presented.length !== expected.length) return "refused";
  return timingSafeEqual(presented, expected) ? "allowed" : "refused";
}
