import type { PairingClaimRequest } from "@getahoy/protocol";
import { eq, lt } from "drizzle-orm";
import { database } from "@/db/client";
import { pairingClaims } from "@/db/schema";
import { auth } from "@/features/auth/server/auth";
import { upsertDevice } from "./upsertDevice";

const STALE_CLAIM_MS = 15 * 60 * 1000;

type ClaimOutcome = { outcome: "approved" } | { outcome: "unknown_code" };

type ClaimInput = {
  userId: string;
  request: PairingClaimRequest;
  headers: Headers;
};

async function recordClaim({ userId, request }: ClaimInput): Promise<boolean> {
  const now = new Date();
  const staleBefore = new Date(now.getTime() - STALE_CLAIM_MS);
  return database.transaction(async (transaction) => {
    await transaction
      .delete(pairingClaims)
      .where(lt(pairingClaims.createdAt, staleBefore));
    const phoneId = await upsertDevice(transaction, {
      userId,
      kind: "phone",
      description: request.device,
      now,
    });
    const inserted = await transaction
      .insert(pairingClaims)
      .values({
        userCode: request.userCode,
        userId,
        phoneId,
        desktopPublicKey: Buffer.from(request.desktopPublicKey, "base64url"),
        proof: request.proof,
      })
      .onConflictDoNothing()
      .returning({ userCode: pairingClaims.userCode });
    return inserted.length > 0;
  });
}

export async function claimPairing(input: ClaimInput): Promise<ClaimOutcome> {
  if (!(await recordClaim(input))) return { outcome: "unknown_code" };
  const { userCode } = input.request;
  const approval = await auth.api.deviceApprove({
    body: { userCode },
    headers: input.headers,
    asResponse: true,
  });
  if (approval.ok) return { outcome: "approved" };
  await database
    .delete(pairingClaims)
    .where(eq(pairingClaims.userCode, userCode));
  return { outcome: "unknown_code" };
}
