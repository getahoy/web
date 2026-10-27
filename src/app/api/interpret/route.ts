import { ErrorResponse, errorMessages, SuccessResponse } from "@getahoy/lib";
import {
  type InterpretResponse,
  interpretRequestSchema,
} from "@getahoy/protocol";
import { apiRoute } from "@/features/api/server/apiRoute";
import {
  consumeRateLimit,
  type RateLimitRule,
} from "@/features/api/server/consumeRateLimit";
import { invalidInputResponse, readJson } from "@/features/api/server/readJson";
import { readSession } from "@/features/auth/server/readSession";
import { interpretCopy } from "@/features/interpret/copy/interpretCopy";
import { interpret } from "@/features/interpret/server/interpret";

const PER_USER: RateLimitRule = { windowMs: 60_000, max: 30 };

export const maxDuration = 15;

export const POST = apiRoute("interpret", async (request) => {
  const session = await readSession(request.headers);
  if (!session) {
    return ErrorResponse("unauthorized", interpretCopy["error.signIn"]);
  }
  const limitKey = `interpret:user:${session.user.id}`;
  if (!(await consumeRateLimit(limitKey, PER_USER))) {
    return ErrorResponse("rate_limited", errorMessages.rate_limited);
  }
  const parsed = await readJson(request, interpretRequestSchema);
  if (parsed.outcome === "invalid") return invalidInputResponse(parsed);
  const { text, apps } = parsed.input;
  const interpreted = await interpret(text, apps);
  if (interpreted.outcome === "unavailable") {
    return ErrorResponse("transient", interpretCopy["error.unavailable"]);
  }
  const payload: InterpretResponse = { actions: interpreted.actions };
  return SuccessResponse(payload);
});
