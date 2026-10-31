import { sql } from "drizzle-orm";
import { check, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import {
  MAXIMUM_EMAIL_LENGTH,
  WAITLIST_SOURCES,
} from "../../features/landing/forms/waitlistRequest";
import { isOneOf } from "../isOneOf";

export const waitlistSignup = pgTable(
  "waitlist_signups",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    source: text("source", { enum: WAITLIST_SOURCES }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check(
      "waitlist_signups_source_check",
      isOneOf(table.source, WAITLIST_SOURCES),
    ),
    check(
      "waitlist_signups_email_check",
      sql`${table.email} = lower(btrim(${table.email})) and char_length(${table.email}) <= ${sql.raw(String(MAXIMUM_EMAIL_LENGTH))}`,
    ),
  ],
);
