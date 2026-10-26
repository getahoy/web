import type { PairingLinks } from "@getahoy/protocol";
import { aliasedTable, and, eq, gt, isNull, or } from "drizzle-orm";
import { database } from "@/db/client";
import { deviceLinks, devices } from "@/db/schema";

const REVOKED_LINK_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

type ListInput = { userId: string; devicePublicKey: string };

async function callerDeviceId({ userId, devicePublicKey }: ListInput) {
  const [caller] = await database
    .select({ id: devices.id })
    .from(devices)
    .where(
      and(
        eq(devices.userId, userId),
        eq(devices.publicKey, Buffer.from(devicePublicKey, "base64url")),
        isNull(devices.revokedAt),
      ),
    );
  return caller?.id ?? null;
}

function linksOf(callerId: string) {
  const peer = aliasedTable(devices, "peer");
  const since = new Date(Date.now() - REVOKED_LINK_WINDOW_MS);
  const asPhone = and(
    eq(deviceLinks.phoneId, callerId),
    eq(peer.id, deviceLinks.desktopId),
  );
  const asDesktop = and(
    eq(deviceLinks.desktopId, callerId),
    eq(peer.id, deviceLinks.phoneId),
  );
  return database
    .select({
      peerKey: peer.publicKey,
      revokedAt: deviceLinks.revokedAt,
      reason: deviceLinks.revokeReason,
    })
    .from(deviceLinks)
    .innerJoin(peer, or(asPhone, asDesktop))
    .where(or(isNull(deviceLinks.revokedAt), gt(deviceLinks.revokedAt, since)));
}

export async function listLinks(
  input: ListInput,
): Promise<PairingLinks | null> {
  const callerId = await callerDeviceId(input);
  if (!callerId) return null;
  const rows = await linksOf(callerId);
  return {
    links: rows.map((row) => ({
      peerPublicKey: row.peerKey.toString("base64url"),
      active: row.revokedAt === null,
      reason: row.reason,
    })),
  };
}
