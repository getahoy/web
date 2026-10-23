import { ErrorResponse, SuccessResponse } from "@getahoy/lib";
import {
  PROTOCOL_VERSION,
  pairingCompleteRequestSchema,
} from "@getahoy/protocol";
import { apiRoute } from "@/features/api/server/apiRoute";
import { invalidInputResponse, readJson } from "@/features/api/server/readJson";
import { auth } from "@/features/auth/server/auth";
import { pairingCopy } from "@/features/pairing/copy/pairingCopy";
import { completePairing } from "@/features/pairing/server/completePairing";

export const POST = apiRoute("pairing.complete", async (request) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return ErrorResponse("unauthorized", pairingCopy["error.signIn"]);
  }
  const parsed = await readJson(request, pairingCompleteRequestSchema);
  if (parsed.outcome === "invalid") return invalidInputResponse(parsed);
  if (parsed.input.device.protocolVersion !== PROTOCOL_VERSION) {
    return ErrorResponse(
      "protocol_version_mismatch",
      pairingCopy["error.updateApp"],
    );
  }
  const completed = await completePairing({
    userId: session.user.id,
    accountEmail: session.user.email,
    request: parsed.input,
  });
  switch (completed.outcome) {
    case "completed":
      return SuccessResponse(completed.complete);
    case "unknown_code":
      return ErrorResponse("not_found", pairingCopy["error.unknownCode"]);
    default: {
      const unhandled: never = completed;
      return unhandled;
    }
  }
});
