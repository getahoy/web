import { ErrorResponse, errorMessages, SuccessResponse } from "@getahoy/lib";
import {
  type InterpretResponse,
  interpretRequestSchema,
  supportedActions,
} from "@getahoy/protocol";
import { apiRoute } from "@/features/api/server/apiRoute";
import {
  consumeRateLimit,
  type RateLimitRule,
} from "@/features/api/server/consumeRateLimit";
import { invalidInputResponse, readJson } from "@/features/api/server/readJson";
import { readSession } from "@/features/auth/server/readSession";
import { interpretCopy } from "@/features/interpret/copy/interpretCopy";
import { composeEmails } from "@/features/interpret/server/composeEmail";
import { interpret } from "@/features/interpret/server/interpret";

const PER_USER: RateLimitRule = { windowMs: 60_000, max: 30 };

export const maxDuration = 15;

export const POST = apiRoute("interpret", async (request) => {
  const answerStartedAt = performance.now();
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
  const { text, apps, supports, screen = [] } = parsed.input;
  const interpreted = await interpret(text, apps, screen);
  if (interpreted.outcome === "unavailable") {
    return ErrorResponse("transient", interpretCopy["error.unavailable"]);
  }
  const sender = session.user.name.trim().split(/\s+/)[0] ?? "";
  const context = { text, sender, answerStartedAt };
  const written = await composeEmails(interpreted.actions, context);
  const payload: InterpretResponse = {
    actions: supportedActions(written, supports),
  };
  return SuccessResponse(payload);
});
