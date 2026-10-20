import { type SQL, sql } from "drizzle-orm";
import {
  type AnyPgColumn,
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const emailKinds = [
  "email_verification",
  "email_otp",
  "password_reset",
  "email_change",
] as const;

export const emailStatuses = [
  "queued",
  "sending",
  "sent",
  "delivered",
  "failed",
  "bounced",
  "complained",
  "suppressed",
] as const;

export const emailEventTypes = [
  "delivered",
  "delivery_delayed",
  "bounced",
  "complained",
] as const;

export const suppressionReasons = [
  "hard_bounce",
  "complaint",
  "manual",
] as const;

function isOneOf(column: AnyPgColumn, allowed: readonly string[]): SQL {
  const quoted = allowed.map((entry) => `'${entry}'`).join(", ");
  return sql`${column} in (${sql.raw(quoted)})`;
}

const createdAt = () =>
  timestamp("created_at", { withTimezone: true }).defaultNow().notNull();

export const emailMessage = pgTable(
  "email_message",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    kind: text("kind", { enum: emailKinds }).notNull(),
    recipientEmail: text("recipient_email").notNull(),
    templateKey: text("template_key").notNull(),
    templateVersion: integer("template_version").notNull(),
    status: text("status", { enum: emailStatuses }).notNull().default("queued"),
    provider: text("provider").notNull(),
    providerMessageId: text("provider_message_id").unique(),
    idempotencyKey: text("idempotency_key").notNull().unique(),
    attemptCount: integer("attempt_count").notNull().default(0),
    lastAttemptAt: timestamp("last_attempt_at", { withTimezone: true }),
    nextAttemptAt: timestamp("next_attempt_at", { withTimezone: true }),
    lastErrorCode: text("last_error_code"),
    createdAt: createdAt(),
    sentAt: timestamp("sent_at", { withTimezone: true }),
    deliveredAt: timestamp("delivered_at", { withTimezone: true }),
  },
  (table) => [
    check("email_message_kind_check", isOneOf(table.kind, emailKinds)),
    check("email_message_status_check", isOneOf(table.status, emailStatuses)),
    check("email_message_attempt_count_check", sql`${table.attemptCount} >= 0`),
    check(
      "email_message_template_version_check",
      sql`${table.templateVersion} >= 1`,
    ),
    index("email_message_user_id_idx").on(table.userId),
    index("email_message_created_at_idx").on(table.createdAt),
    index("email_message_resend_limit_idx")
      .on(table.recipientEmail, table.kind, table.createdAt)
      .where(sql`${table.status} <> 'suppressed'`),
  ],
);

export const emailEvent = pgTable(
  "email_event",
  {
    id: text("id").primaryKey(),
    messageId: text("message_id")
      .notNull()
      .references(() => emailMessage.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(),
    providerEventId: text("provider_event_id").notNull(),
    type: text("type", { enum: emailEventTypes }).notNull(),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),
    receivedAt: timestamp("received_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check("email_event_type_check", isOneOf(table.type, emailEventTypes)),
    unique("email_event_provider_event_unique").on(
      table.provider,
      table.providerEventId,
    ),
    index("email_event_message_id_idx").on(table.messageId),
  ],
);

export const emailSuppression = pgTable(
  "email_suppression",
  {
    emailHash: text("email_hash").primaryKey(),
    reason: text("reason", { enum: suppressionReasons }).notNull(),
    sourceMessageId: text("source_message_id").references(
      () => emailMessage.id,
      { onDelete: "set null" },
    ),
    createdAt: createdAt(),
  },
  (table) => [
    check(
      "email_suppression_reason_check",
      isOneOf(table.reason, suppressionReasons),
    ),
  ],
);
