import { clientAddress } from "@/features/api/server/clientAddress";
import {
  consumeRateLimit,
  type RateLimitRule,
} from "@/features/api/server/consumeRateLimit";

const PER_ADDRESS: RateLimitRule = { windowMs: 60_000, max: 5 };
const UNKNOWN_ADDRESS = "unknown";

export function withinWaitlistLimit(headers: Headers): Promise<boolean> {
  const address = clientAddress(headers) ?? UNKNOWN_ADDRESS;
  return consumeRateLimit(`waitlist:ip:${address}`, PER_ADDRESS);
}
