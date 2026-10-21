import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { database } from "@/db/client";
import * as schema from "@/db/schema";
import { serverEnv } from "@/env/serverEnv";
import { MINIMUM_PASSWORD_LENGTH } from "../forms/credentialsSchema";
import { socialProviders } from "./socialProviders";

const MOBILE_APP_ORIGIN = "ahoy://";

export const auth = betterAuth({
  baseURL: serverEnv.BETTER_AUTH_URL,
  secret: serverEnv.BETTER_AUTH_SECRET,
  database: drizzleAdapter(database, { provider: "pg", schema }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: MINIMUM_PASSWORD_LENGTH,
  },
  socialProviders,
  rateLimit: { storage: "database" },
  trustedOrigins: [MOBILE_APP_ORIGIN],
  plugins: [expo(), nextCookies()],
});
