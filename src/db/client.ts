import { Pool } from "@neondatabase/serverless";
import { drizzle, type NeonDatabase } from "drizzle-orm/neon-serverless";
import { serverEnv } from "@/env/serverEnv";
import * as schema from "./schema";

type Database = NeonDatabase<typeof schema>;

export type Transaction = Parameters<Parameters<Database["transaction"]>[0]>[0];

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
