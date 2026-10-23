import type {
  DeviceDescription,
  PairingComplete,
  PairingCompleteRequest,
} from "@getahoy/protocol";
import { and, eq } from "drizzle-orm";
import { database, type Transaction } from "@/db/client";
import { deviceLinks, devices, pairingClaims } from "@/db/schema";
import { upsertDevice } from "./upsertDevice";

type CompleteOutcome =
  | { outcome: "completed"; complete: PairingComplete }
  | { outcome: "unknown_code" };

type CompleteInput = {
  userId: string;
  accountEmail: string;
  request: PairingCompleteRequest;
};

async function readDevice(
  transaction: Transaction,
  deviceId: string,
): Promise<DeviceDescription> {
  const [device] = await transaction
    .select()
    .from(devices)
    .where(eq(devices.id, deviceId));
  if (!device) throw new Error("Pairing claim points at a missing phone");
  return {
    publicKey: device.publicKey.toString("base64url"),
    displayName: device.displayName,
    platform: device.platform,
    platformVersion: device.platformVersion ?? "",
    appVersion: device.appVersion,
    protocolVersion: device.protocolVersion,
    capabilities: device.capabilities,
  };
}

async function findClaim(
  transaction: Transaction,
  userCode: string,
  userId: string,
) {
  const [claim] = await transaction
    .select()
    .from(pairingClaims)
    .where(
      and(
        eq(pairingClaims.userCode, userCode),
        eq(pairingClaims.userId, userId),
      ),
    )
    .for("update");
  return claim;
}

export function completePairing({
  userId,
  accountEmail,
  request,
}: CompleteInput): Promise<CompleteOutcome> {
  return database.transaction(async (transaction) => {
    const { userCode, device } = request;
    const claim = await findClaim(transaction, userCode, userId);
    const desktopKey = Buffer.from(device.publicKey, "base64url");
    if (!claim || !claim.desktopPublicKey.equals(desktopKey)) {
      return { outcome: "unknown_code" };
    }
    const now = new Date();
    const desktopId = await upsertDevice(transaction, {
      userId,
      kind: "desktop",
      description: device,
      now,
    });
    await transaction
      .insert(deviceLinks)
      .values({ phoneId: claim.phoneId, desktopId })
      .onConflictDoUpdate({
        target: [deviceLinks.phoneId, deviceLinks.desktopId],
        set: { pairedAt: now, revokedAt: null },
      });
    await transaction
      .delete(pairingClaims)
      .where(eq(pairingClaims.userCode, userCode));
    const phone = await readDevice(transaction, claim.phoneId);
    const complete = { desktopId, accountEmail, phone, proof: claim.proof };
    return { outcome: "completed", complete };
  });
}
