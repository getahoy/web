import { ErrorResponse, SuccessResponse } from "@getahoy/lib";
import {
  type PairingUnlink,
  pairingUnlinkRequestSchema,
} from "@getahoy/protocol";
import { apiRoute } from "@/features/api/server/apiRoute";
import { invalidInputResponse, readJson } from "@/features/api/server/readJson";
import { auth } from "@/features/auth/server/auth";
import { pairingCopy } from "@/features/pairing/copy/pairingCopy";
import { unlinkDevices } from "@/features/pairing/server/unlinkDevices";

const UNLINKED: PairingUnlink = { unlinked: true };

export const POST = apiRoute("pairing.unlink", async (request) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return ErrorResponse("unauthorized", pairingCopy["error.signIn"]);
  }
  const parsed = await readJson(request, pairingUnlinkRequestSchema);
  if (parsed.outcome === "invalid") return invalidInputResponse(parsed);
  const unlinked = await unlinkDevices({
    userId: session.user.id,
    request: parsed.input,
  });
  if (!unlinked) {
    return ErrorResponse("not_found", pairingCopy["error.noActiveLink"]);
  }
  return SuccessResponse(UNLINKED);
});
