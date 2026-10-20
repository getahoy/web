import { parseServerEnv, type ServerEnv } from "./serverEnvSchema";

export type { ServerEnv };

export const serverEnv: ServerEnv = parseServerEnv(process.env);
