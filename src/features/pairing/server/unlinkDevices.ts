import type { PairingUnlinkRequest } from "@getahoy/protocol";
import { and, eq, inArray, isNull, or } from "drizzle-orm";
import { database } from "@/db/client";
import { deviceLinks, devices } from "@/db/schema";

type UnlinkInput = { userId: string; request: PairingUnlinkRequest };

async function ownedDeviceIds(userId: string, request: PairingUnlinkRequest) {
  const caller = Buffer.from(request.devicePublicKey, "base64url");
  const peer = Buffer.from(request.peerPublicKey, "base64url");
  const owned = await database
    .select({ id: devices.id, publicKey: devices.publicKey })
    .from(devices)
    .where(
      and(
        eq(devices.userId, userId),
        inArray(devices.publicKey, [caller, peer]),
        isNull(devices.revokedAt),
      ),
    );
  const callerId = owned.find((device) => device.publicKey.equals(caller))?.id;
  const peerId = owned.find((device) => device.publicKey.equals(peer))?.id;
  return callerId && peerId ? { callerId, peerId } : null;
}

export async function unlinkDevices({
  userId,
  request,
}: UnlinkInput): Promise<boolean> {
  const ids = await ownedDeviceIds(userId, request);
  if (!ids) return false;
  const { callerId, peerId } = ids;
  const linkBetween = (phoneId: string, desktopId: string) =>
    and(eq(deviceLinks.phoneId, phoneId), eq(deviceLinks.desktopId, desktopId));
  const revoked = await database
    .update(deviceLinks)
    .set({
      revokedAt: new Date(),
      revokedBy: callerId,
      revokeReason: request.reason,
    })
    .where(
      and(
        isNull(deviceLinks.revokedAt),
        or(linkBetween(callerId, peerId), linkBetween(peerId, callerId)),
      ),
    )
    .returning({ phoneId: deviceLinks.phoneId });
  return revoked.length > 0;
}
