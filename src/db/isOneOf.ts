import { type SQL, sql } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";

export function isOneOf(column: AnyPgColumn, allowed: readonly string[]): SQL {
  const quoted = allowed.map((entry) => `'${entry}'`).join(", ");
  return sql`${column} in (${sql.raw(quoted)})`;
}
