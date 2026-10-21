import { expo } from "@better-auth/expo";
import {
  APP_SCHEME,
  MAXIMUM_PASSWORD_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
} from "@getahoy/lib";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { database } from "@/db/client";
import * as schema from "@/db/schema";
import { serverEnv } from "@/env/serverEnv";
import { SIGN_IN_PATH } from "../routes";
import { socialProviders } from "./socialProviders";

export const auth = betterAuth({
  baseURL: serverEnv.BETTER_AUTH_URL,
  secret: serverEnv.BETTER_AUTH_SECRET,
  database: drizzleAdapter(database, { provider: "pg", schema }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: MINIMUM_PASSWORD_LENGTH,
    maxPasswordLength: MAXIMUM_PASSWORD_LENGTH,
  },
  socialProviders,
  rateLimit: { storage: "database" },
  trustedOrigins: [`${APP_SCHEME}://`],
  onAPIError: { errorURL: SIGN_IN_PATH },
  plugins: [expo(), nextCookies()],
});
