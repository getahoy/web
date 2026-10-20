import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";
import { z } from "zod";

loadEnvConfig(process.cwd());

const { DATABASE_URL_UNPOOLED } = z
  .object({ DATABASE_URL_UNPOOLED: z.url() })
  .parse(process.env);

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  dbCredentials: { url: DATABASE_URL_UNPOOLED },
  strict: true,
  verbose: true,
});
