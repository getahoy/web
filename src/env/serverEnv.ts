import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.url(),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export const serverEnv: ServerEnv = serverEnvSchema.parse(process.env);
