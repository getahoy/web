import { ErrorResponse, parseInput, SuccessResponse } from "@getahoy/lib";
import { bytes32Schema } from "@getahoy/protocol";
import { apiRoute } from "@/features/api/server/apiRoute";
import { invalidInputResponse } from "@/features/api/server/readJson";
import { auth } from "@/features/auth/server/auth";
import { pairingCopy } from "@/features/pairing/copy/pairingCopy";
import { listLinks } from "@/features/pairing/server/listLinks";

export const GET = apiRoute("pairing.links", async (request) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return ErrorResponse("unauthorized", pairingCopy["error.signIn"]);
  }
  const device = new URL(request.url).searchParams.get("device");
  const parsed = parseInput(bytes32Schema, device);
  if (parsed.outcome === "invalid") return invalidInputResponse(parsed);
  const links = await listLinks({
    userId: session.user.id,
    devicePublicKey: parsed.input,
  });
  if (!links) {
    return ErrorResponse("not_found", pairingCopy["error.unknownDevice"]);
  }
  return SuccessResponse(links);
});
