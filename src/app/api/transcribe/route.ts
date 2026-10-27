import { ErrorResponse, errorMessages, SuccessResponse } from "@getahoy/lib";
import { AUDIO_UPLOAD_FIELD, type TranscribeResponse } from "@getahoy/protocol";
import { apiRoute } from "@/features/api/server/apiRoute";
import {
  consumeRateLimit,
  type RateLimitRule,
} from "@/features/api/server/consumeRateLimit";
import { auth } from "@/features/auth/server/auth";
import { speechCopy } from "@/features/speech/copy/speechCopy";
import { readAudio } from "@/features/speech/server/readAudio";
import { transcribeAudio } from "@/features/speech/server/transcribeAudio";

const PER_USER: RateLimitRule = { windowMs: 60_000, max: 20 };

export const maxDuration = 30;

export const POST = apiRoute("speech.transcribe", async (request) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return ErrorResponse("unauthorized", speechCopy["error.signIn"]);
  }
  const limitKey = `speech.transcribe:user:${session.user.id}`;
  if (!(await consumeRateLimit(limitKey, PER_USER))) {
    return ErrorResponse("rate_limited", errorMessages.rate_limited);
  }
  const audio = await readAudio(request);
  if (audio.outcome !== "file") {
    const message =
      audio.outcome === "missing"
        ? speechCopy["error.noAudio"]
        : speechCopy["error.tooLarge"];
    return ErrorResponse("invalid_input", message, AUDIO_UPLOAD_FIELD);
  }
  const heard = await transcribeAudio(audio.file);
  switch (heard.outcome) {
    case "heard": {
      const payload: TranscribeResponse = { text: heard.text };
      return SuccessResponse(payload);
    }
    case "nothingHeard":
      return ErrorResponse("nothing_heard", errorMessages.nothing_heard);
    case "unavailable":
      return ErrorResponse("transient", speechCopy["error.unavailable"]);
    default: {
      const unhandled: never = heard;
      return unhandled;
    }
  }
});
