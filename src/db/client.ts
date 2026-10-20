import { Pool } from "@neondatabase/serverless";
import { drizzle, type NeonDatabase } from "drizzle-orm/neon-serverless";
import { serverEnv } from "@/env/server-env";
import * as schema from "./schema";

type Database = NeonDatabase<typeof schema>;

const globalForDatabase = globalThis as typeof globalThis & {
  database?: Database;
};

function createDatabase(): Database {
  const pool = new Pool({ connectionString: serverEnv.DATABASE_URL });
  return drizzle({ client: pool, schema });
}

export const database: Database =
  globalForDatabase.database ?? createDatabase();

globalForDatabase.database = database;
