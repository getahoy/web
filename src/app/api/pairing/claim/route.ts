import { ErrorResponse, errorMessages, SuccessResponse } from "@getahoy/lib";
import {
  type PairingClaim,
  PROTOCOL_VERSION,
  pairingClaimRequestSchema,
} from "@getahoy/protocol";
import { apiRoute } from "@/features/api/server/apiRoute";
import { invalidInputResponse, readJson } from "@/features/api/server/readJson";
import { readSession } from "@/features/auth/server/readSession";
import { pairingCopy } from "@/features/pairing/copy/pairingCopy";
import { claimPairing } from "@/features/pairing/server/claimPairing";
import { withinClaimLimit } from "@/features/pairing/server/claimRateLimit";

const APPROVED: PairingClaim = { approved: true };

export const POST = apiRoute("pairing.claim", async (request) => {
  const { headers } = request;
  const session = await readSession(headers);
  if (!session) {
    return ErrorResponse("unauthorized", pairingCopy["error.signIn"]);
  }
  if (!(await withinClaimLimit(session.user.id, headers))) {
    return ErrorResponse("rate_limited", errorMessages.rate_limited);
  }
  const parsed = await readJson(request, pairingClaimRequestSchema);
  if (parsed.outcome === "invalid") return invalidInputResponse(parsed);
  if (parsed.input.device.protocolVersion !== PROTOCOL_VERSION) {
    return ErrorResponse(
      "protocol_version_mismatch",
      pairingCopy["error.updateApp"],
    );
  }
  const claimed = await claimPairing({
    userId: session.user.id,
    request: parsed.input,
    headers,
  });
  switch (claimed.outcome) {
    case "approved":
      return SuccessResponse(APPROVED);
    case "unknown_code":
      return ErrorResponse("not_found", pairingCopy["error.unknownCode"]);
    default: {
      const unhandled: never = claimed;
      return unhandled;
    }
  }
});
