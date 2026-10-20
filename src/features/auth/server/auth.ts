import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { database } from "@/db/client";
import { serverEnv } from "@/env/server-env";
import { MINIMUM_PASSWORD_LENGTH } from "../forms/credentials-schema";
import { googleProvider } from "../providers/google";

export const auth = betterAuth({
  baseURL: serverEnv.BETTER_AUTH_URL,
  secret: serverEnv.BETTER_AUTH_SECRET,
  database: drizzleAdapter(database, { provider: "pg" }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: MINIMUM_PASSWORD_LENGTH,
  },
  socialProviders: {
    ...googleProvider(serverEnv),
  },
  plugins: [nextCookies()],
});
