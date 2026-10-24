import type { PairingUnlinkRequest } from "@getahoy/protocol";
import { and, eq, inArray, isNull, or } from "drizzle-orm";
import { database } from "@/db/client";
import { deviceLinks, devices } from "@/db/schema";

const LINKED_PAIR = 2;

type UnlinkInput = { userId: string; request: PairingUnlinkRequest };

export async function unlinkDevices({
  userId,
  request,
}: UnlinkInput): Promise<void> {
  const keys = [request.devicePublicKey, request.peerPublicKey].map((key) =>
    Buffer.from(key, "base64url"),
  );
  const owned = await database
    .select({ id: devices.id })
    .from(devices)
    .where(
      and(
        eq(devices.userId, userId),
        inArray(devices.publicKey, keys),
        isNull(devices.revokedAt),
      ),
    );
  const [first, second] = owned;
  if (owned.length !== LINKED_PAIR || !first || !second) return;
  const linkBetween = (phoneId: string, desktopId: string) =>
    and(eq(deviceLinks.phoneId, phoneId), eq(deviceLinks.desktopId, desktopId));
  await database
    .update(deviceLinks)
    .set({ revokedAt: new Date() })
    .where(
      and(
        isNull(deviceLinks.revokedAt),
        or(linkBetween(first.id, second.id), linkBetween(second.id, first.id)),
      ),
    );
}
