import type { HistoryWrite, HistoryWriteEntry } from "@getahoy/protocol";
import { eq, lt, sql } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import { database } from "@/db/client";
import { commandHistory } from "@/db/schema";
import { keepsHistory } from "./historySettingsStore";
import { latestRevisions } from "./latestRevisions";
import { ownedDeviceIds } from "./ownedDeviceIds";

type HistoryWriteOutcome =
  | { outcome: "saved"; saved: number }
  | { outcome: "unknownDevice" };

type RowInput = {
  userId: string;
  phoneKey: string;
  deviceIds: Map<string, string>;
  entry: HistoryWriteEntry;
};

function rowOf({ userId, phoneKey, deviceIds, entry }: RowInput) {
  return {
    id: entry.id,
    userId,
    phoneId: deviceIds.get(phoneKey) ?? null,
    desktopId: deviceIds.get(entry.macKey) ?? null,
    phoneKey: Buffer.from(phoneKey, "base64url"),
    macKey: Buffer.from(entry.macKey, "base64url"),
    macName: entry.macName,
    heard: entry.heard,
    did: entry.did,
    status: entry.status,
    app: entry.app,
    via: entry.via,
    reason: entry.reason,
    timings: entry.timings,
    followUps: entry.followUps,
    rev: entry.rev,
    startedAt: new Date(entry.startedAt),
    finishedAt: entry.finishedAt === null ? null : new Date(entry.finishedAt),
  };
}

const incoming = (column: AnyPgColumn) => sql.raw(`excluded.${column.name}`);

const replaced = {
  phoneId: incoming(commandHistory.phoneId),
  desktopId: incoming(commandHistory.desktopId),
  phoneKey: incoming(commandHistory.phoneKey),
  macKey: incoming(commandHistory.macKey),
  macName: incoming(commandHistory.macName),
  heard: incoming(commandHistory.heard),
  did: incoming(commandHistory.did),
  status: incoming(commandHistory.status),
  app: incoming(commandHistory.app),
  via: incoming(commandHistory.via),
  reason: incoming(commandHistory.reason),
  timings: incoming(commandHistory.timings),
  followUps: incoming(commandHistory.followUps),
  rev: incoming(commandHistory.rev),
  startedAt: incoming(commandHistory.startedAt),
  finishedAt: incoming(commandHistory.finishedAt),
};

export async function writeHistory(
  userId: string,
  write: HistoryWrite,
): Promise<HistoryWriteOutcome> {
  if (!(await keepsHistory(userId))) return { outcome: "saved", saved: 0 };
  const keys = [write.phoneKey, ...write.entries.map((entry) => entry.macKey)];
  const deviceIds = await ownedDeviceIds(userId, keys);
  if (!deviceIds) return { outcome: "unknownDevice" };
  const rows = latestRevisions(write.entries).map((entry) =>
    rowOf({ userId, phoneKey: write.phoneKey, deviceIds, entry }),
  );
  const saved = await database
    .insert(commandHistory)
    .values(rows)
    .onConflictDoUpdate({
      target: commandHistory.id,
      set: replaced,
      setWhere: sql`${eq(commandHistory.userId, userId)} and ${lt(commandHistory.rev, incoming(commandHistory.rev))}`,
    })
    .returning({ id: commandHistory.id });
  return { outcome: "saved", saved: saved.length };
}
