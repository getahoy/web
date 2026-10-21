import type { BetterAuthOptions } from "better-auth";
import type { ServerEnv } from "@/env/serverEnv";

export function googleProvider(env: ServerEnv) {
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) return {};
  return {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      prompt: "select_account",
    },
  } satisfies BetterAuthOptions["socialProviders"];
}
