import { ErrorResponse, errorMessages } from "@getahoy/lib";
import { speakRequestSchema } from "@getahoy/protocol";
import { apiRoute } from "@/features/api/server/apiRoute";
import {
  consumeRateLimit,
  type RateLimitRule,
} from "@/features/api/server/consumeRateLimit";
import { invalidInputResponse, readJson } from "@/features/api/server/readJson";
import { readSession } from "@/features/auth/server/readSession";
import { speechCopy } from "@/features/speech/copy/speechCopy";
import { speakText } from "@/features/speech/server/elevenLabs";

const PER_USER: RateLimitRule = { windowMs: 60_000, max: 60 };

export const maxDuration = 15;

// Audio is the one body that is not the JSON envelope; every failure still is.
export const POST = apiRoute("speech.speak", async (request) => {
  const session = await readSession(request.headers);
  if (!session) {
    return ErrorResponse("unauthorized", speechCopy["error.signIn"]);
  }
  const limitKey = `speech.speak:user:${session.user.id}`;
  if (!(await consumeRateLimit(limitKey, PER_USER))) {
    return ErrorResponse("rate_limited", errorMessages.rate_limited);
  }
  const parsed = await readJson(request, speakRequestSchema);
  if (parsed.outcome === "invalid") return invalidInputResponse(parsed);
  const { text, voice } = parsed.input;
  const spoken = await speakText(text, voice);
  switch (spoken.outcome) {
    case "audio":
      return new Response(spoken.stream, {
        headers: { "content-type": "audio/mpeg", "cache-control": "no-store" },
      });
    case "noVoice":
      return ErrorResponse("transient", speechCopy["error.noVoice"]);
    case "unavailable":
      return ErrorResponse("transient", speechCopy["error.unavailable"]);
    default: {
      const unhandled: never = spoken;
      return unhandled;
    }
  }
});
