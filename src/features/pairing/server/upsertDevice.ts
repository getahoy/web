import type { DeviceDescription } from "@getahoy/protocol";
import { sql } from "drizzle-orm";
import type { Transaction } from "@/db/client";
import { devices } from "@/db/schema";

type DeviceUpsert = {
  userId: string;
  kind: "desktop" | "phone";
  description: DeviceDescription;
  now: Date;
};

export async function upsertDevice(
  transaction: Transaction,
  { userId, kind, description, now }: DeviceUpsert,
): Promise<string> {
  const details = {
    platform: description.platform,
    platformVersion: description.platformVersion,
    appVersion: description.appVersion,
    protocolVersion: description.protocolVersion,
    displayName: description.displayName,
    capabilities: description.capabilities,
    lastSeenAt: now,
  };
  const [device] = await transaction
    .insert(devices)
    .values({
      ...details,
      userId,
      kind,
      publicKey: Buffer.from(description.publicKey, "base64url"),
    })
    .onConflictDoUpdate({
      target: [devices.userId, devices.publicKey],
      targetWhere: sql`${devices.revokedAt} is null`,
      set: details,
    })
    .returning({ id: devices.id });
  if (!device) throw new Error("Device upsert returned no row");
  return device.id;
}
