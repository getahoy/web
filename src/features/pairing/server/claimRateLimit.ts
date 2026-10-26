import {
  consumeRateLimit,
  type RateLimitRule,
} from "@/features/api/server/consumeRateLimit";

const CLAIM_WINDOW_MS = 60_000;
const PER_USER: RateLimitRule = { windowMs: CLAIM_WINDOW_MS, max: 10 };
const PER_ADDRESS: RateLimitRule = { windowMs: CLAIM_WINDOW_MS, max: 30 };

function clientAddress(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || null;
}

export async function withinClaimLimit(
  userId: string,
  headers: Headers,
): Promise<boolean> {
  const address = clientAddress(headers);
  const [userAllowed, addressAllowed] = await Promise.all([
    consumeRateLimit(`pairing.claim:user:${userId}`, PER_USER),
    address
      ? consumeRateLimit(`pairing.claim:ip:${address}`, PER_ADDRESS)
      : true,
  ]);
  return userAllowed && addressAllowed;
}
