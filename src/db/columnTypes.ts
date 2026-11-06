import { customType, timestamp } from "drizzle-orm/pg-core";

export const bytea = customType<{ data: Buffer }>({ dataType: () => "bytea" });

export const moment = (name: string) => timestamp(name, { withTimezone: true });
