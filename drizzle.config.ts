import { defineConfig } from "drizzle-kit";
import { z } from "zod";

const { DATABASE_URL } = z.object({ DATABASE_URL: z.url() }).parse(process.env);

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  dbCredentials: { url: DATABASE_URL },
  strict: true,
  verbose: true,
});
