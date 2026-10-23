import { PLATFORMS } from "@getahoy/protocol";
import { sql } from "drizzle-orm";
import {
  check,
  customType,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { isOneOf } from "../isOneOf";
import { user } from "./auth";

const deviceKinds = ["desktop", "phone"] as const;
const platforms = PLATFORMS;

const bytea = customType<{ data: Buffer }>({ dataType: () => "bytea" });

const moment = (name: string) => timestamp(name, { withTimezone: true });

export const devices = pgTable(
  "devices",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    kind: text("kind", { enum: deviceKinds }).notNull(),
    platform: text("platform", { enum: platforms }).notNull(),
    platformVersion: text("platform_version"),
    appVersion: text("app_version").notNull(),
    protocolVersion: integer("protocol_version").notNull(),
    publicKey: bytea("public_key").notNull(),
    displayName: text("display_name").notNull(),
    capabilities: jsonb("capabilities")
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    lastSeenAt: moment("last_seen_at"),
    revokedAt: moment("revoked_at"),
    createdAt: moment("created_at").defaultNow().notNull(),
  },
  (table) => [
    check("devices_kind_check", isOneOf(table.kind, deviceKinds)),
    check("devices_platform_check", isOneOf(table.platform, platforms)),
    index("devices_user_id_idx")
      .on(table.userId)
      .where(sql`${table.revokedAt} is null`),
    uniqueIndex("devices_user_public_key_idx")
      .on(table.userId, table.publicKey)
      .where(sql`${table.revokedAt} is null`),
  ],
);

export const deviceLinks = pgTable(
  "device_links",
  {
    phoneId: uuid("phone_id")
      .notNull()
      .references(() => devices.id, { onDelete: "cascade" }),
    desktopId: uuid("desktop_id")
      .notNull()
      .references(() => devices.id, { onDelete: "cascade" }),
    pairedAt: moment("paired_at").defaultNow().notNull(),
    revokedAt: moment("revoked_at"),
  },
  (table) => [primaryKey({ columns: [table.phoneId, table.desktopId] })],
);

export const pairingClaims = pgTable(
  "pairing_claims",
  {
    userCode: text("user_code").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    phoneId: uuid("phone_id")
      .notNull()
      .references(() => devices.id, { onDelete: "cascade" }),
    desktopPublicKey: bytea("desktop_public_key").notNull(),
    proof: text("proof").notNull(),
    createdAt: moment("created_at").defaultNow().notNull(),
  },
  (table) => [index("pairing_claims_created_at_idx").on(table.createdAt)],
);
