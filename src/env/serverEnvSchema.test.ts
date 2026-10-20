import { describe, expect, it } from "vitest";
import { parseServerEnv } from "./serverEnvSchema";

const requiredEnv = {
  DATABASE_URL: "postgresql://user:pass@host.example/db",
  BETTER_AUTH_SECRET: "a".repeat(32),
  BETTER_AUTH_URL: "http://localhost:3000",
};

describe("parseServerEnv", () => {
  it("treats empty google credentials as not configured", () => {
    const env = parseServerEnv({
      ...requiredEnv,
      GOOGLE_CLIENT_ID: "",
      GOOGLE_CLIENT_SECRET: "",
    });
    expect(env.GOOGLE_CLIENT_ID).toBeUndefined();
    expect(env.GOOGLE_CLIENT_SECRET).toBeUndefined();
  });

  it("keeps google credentials when both are set", () => {
    const env = parseServerEnv({
      ...requiredEnv,
      GOOGLE_CLIENT_ID: "client-id",
      GOOGLE_CLIENT_SECRET: "client-secret",
    });
    expect(env.GOOGLE_CLIENT_ID).toBe("client-id");
  });

  it("rejects only one half of the google credentials", () => {
    expect(() =>
      parseServerEnv({ ...requiredEnv, GOOGLE_CLIENT_ID: "client-id" }),
    ).toThrow(/GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET/);
  });

  it("names the missing variable when a required one is absent", () => {
    expect(() => parseServerEnv({ BETTER_AUTH_URL: "x" })).toThrow(
      /DATABASE_URL/,
    );
  });
});
