import { z } from "zod";

const optionalSecret = z.preprocess(
  (raw) => (raw === "" ? undefined : raw),
  z.string().min(1).optional(),
);

const serverEnvSchema = z
  .object({
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),
    GOOGLE_CLIENT_ID: optionalSecret,
    GOOGLE_CLIENT_SECRET: optionalSecret,
  })
  .refine(
    (env) =>
      (env.GOOGLE_CLIENT_ID === undefined) ===
      (env.GOOGLE_CLIENT_SECRET === undefined),
    {
      message: "Set both GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET, or neither",
      path: ["GOOGLE_CLIENT_ID"],
    },
  );

export type ServerEnv = z.infer<typeof serverEnvSchema>;

function parseServerEnv(): ServerEnv {
  const parsed = serverEnvSchema.safeParse(process.env);
  if (parsed.success) return parsed.data;
  throw new Error(
    `Invalid server environment\n${z.prettifyError(parsed.error)}`,
  );
}

export const serverEnv = parseServerEnv();
