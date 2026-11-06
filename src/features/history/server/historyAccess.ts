import { ErrorResponse } from "@getahoy/lib";
import {
  consumeRateLimit,
  type RateLimitRule,
} from "@/features/api/server/consumeRateLimit";
import { readSession } from "@/features/auth/server/readSession";
import { historyCopy } from "../copy/historyCopy";

const HISTORY_WINDOW_MS = 60_000;
const PER_USER: RateLimitRule = { windowMs: HISTORY_WINDOW_MS, max: 120 };

type HistoryAccess =
  | { outcome: "allowed"; userId: string }
  | { outcome: "refused"; response: Response };

export async function historyAccess(headers: Headers): Promise<HistoryAccess> {
  const session = await readSession(headers);
  if (!session) {
    const response = ErrorResponse("unauthorized", historyCopy["error.signIn"]);
    return { outcome: "refused", response };
  }
  const userId = session.user.id;
  if (!(await consumeRateLimit(`history:user:${userId}`, PER_USER))) {
    const response = ErrorResponse(
      "rate_limited",
      historyCopy["error.tooMany"],
    );
    return { outcome: "refused", response };
  }
  return { outcome: "allowed", userId };
}
