import {
  FAILURE_REASONS,
  HISTORY_STATUSES,
  type HistoryFollowUp,
  type HistoryTimings,
  MAX_REPORT_NOTE_CHARS,
  UNDERSTOOD_BY,
} from "@getahoy/protocol";
import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { bytea, moment } from "../columnTypes";
import { isOneOf } from "../isOneOf";
import { user } from "./auth";
import { devices } from "./devices";

export const commandHistory = pgTable(
  "command_history",
  {
    id: uuid("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    phoneId: uuid("phone_id").references(() => devices.id, {
      onDelete: "set null",
    }),
    desktopId: uuid("desktop_id").references(() => devices.id, {
      onDelete: "set null",
    }),
    phoneKey: bytea("phone_key").notNull(),
    macKey: bytea("mac_key").notNull(),
    macName: text("mac_name").notNull(),
    heard: text("heard").notNull(),
    did: text("did"),
    status: text("status", { enum: HISTORY_STATUSES }).notNull(),
    app: text("app"),
    via: text("via", { enum: UNDERSTOOD_BY }),
    reason: text("reason", { enum: FAILURE_REASONS }),
    timings: jsonb("timings")
      .$type<HistoryTimings>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    followUps: jsonb("follow_ups")
      .$type<HistoryFollowUp[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    rev: integer("rev").notNull(),
    startedAt: moment("started_at").notNull(),
    finishedAt: moment("finished_at"),
    deletedAt: moment("deleted_at"),
  },
  (table) => [
    check(
      "command_history_status_check",
      isOneOf(table.status, HISTORY_STATUSES),
    ),
    check("command_history_via_check", isOneOf(table.via, UNDERSTOOD_BY)),
    check(
      "command_history_reason_check",
      isOneOf(table.reason, FAILURE_REASONS),
    ),
    index("command_history_user_started_idx")
      .on(table.userId, table.startedAt.desc())
      .where(sql`${table.deletedAt} is null`),
    index("command_history_user_mac_started_idx")
      .on(table.userId, table.macKey, table.startedAt.desc())
      .where(sql`${table.deletedAt} is null`),
  ],
);

export const historySettings = pgTable("history_settings", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  keepHistory: boolean("keep_history").notNull().default(true),
});

export const problemReports = pgTable(
  "problem_reports",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    historyId: uuid("history_id").notNull(),
    snapshot: jsonb("snapshot").notNull(),
    note: text("note"),
    createdAt: moment("created_at").defaultNow().notNull(),
  },
  (table) => [
    check(
      "problem_reports_note_check",
      sql`char_length(${table.note}) <= ${sql.raw(String(MAX_REPORT_NOTE_CHARS))}`,
    ),
  ],
);
