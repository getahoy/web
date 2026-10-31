import { ErrorResponse, SuccessResponse } from "@getahoy/lib";
import { apiRoute } from "@/features/api/server/apiRoute";
import { invalidInputResponse, readJson } from "@/features/api/server/readJson";
import { waitlistCopy } from "@/features/landing/copy/waitlistCopy";
import {
  type WaitlistReply,
  waitlistRequestSchema,
} from "@/features/landing/forms/waitlistRequest";
import { joinWaitlist } from "@/features/landing/server/joinWaitlist";
import { withinWaitlistLimit } from "@/features/landing/server/waitlistRateLimit";
import { logger } from "@/features/logging/server/logger";

const SCOPE = "waitlist";
const JOINED: WaitlistReply = { joined: true };

export const POST = apiRoute(SCOPE, async (request) => {
  if (!(await withinWaitlistLimit(request.headers))) {
    return ErrorResponse("rate_limited", waitlistCopy["error.rateLimited"]);
  }
  const parsed = await readJson(request, waitlistRequestSchema);
  if (parsed.outcome === "invalid") return invalidInputResponse(parsed);
  const { email, source, company } = parsed.input;
  if (company) {
    logger.info(SCOPE, "honeypot");
    return SuccessResponse(JOINED);
  }
  logger.info(SCOPE, await joinWaitlist({ email, source }));
  return SuccessResponse(JOINED);
});
