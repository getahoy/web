import { timingSafeEqual } from "node:crypto";
import { serverEnv } from "@/env/serverEnv";

export function isCronRequest(headers: Headers): boolean {
  const presented = Buffer.from(headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${serverEnv.CRON_SECRET}`);
  if (presented.length !== expected.length) return false;
  return timingSafeEqual(presented, expected);
}
