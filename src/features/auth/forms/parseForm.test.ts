import { signInSchema, signUpSchema } from "@getahoy/lib";
import { describe, expect, it } from "vitest";
import { parseForm } from "./parseForm";

function formDataOf(entries: Record<string, string>): FormData {
  const formData = new FormData();
  for (const [name, entry] of Object.entries(entries))
    formData.append(name, entry);
  return formData;
}

describe("parseForm", () => {
  it("returns typed input for a valid sign in", () => {
    const form = parseForm(
      signInSchema,
      formDataOf({ email: "ada@example.com", password: "secret" }),
    );
    expect(form).toEqual({
      outcome: "valid",
      input: { email: "ada@example.com", password: "secret" },
    });
  });

  it("returns the first issue message for an invalid email", () => {
    const form = parseForm(
      signInSchema,
      formDataOf({ email: "not-an-email", password: "x" }),
    );
    expect(form).toEqual({
      outcome: "invalid",
      message: "Enter a valid email address",
    });
  });

  it("rejects a sign up password shorter than the minimum", () => {
    const form = parseForm(
      signUpSchema,
      formDataOf({ name: "Ada", email: "ada@example.com", password: "short" }),
    );
    expect(form).toEqual({
      outcome: "invalid",
      message: "Use at least 8 characters",
    });
  });

  it("trims a sign up name and rejects it when only whitespace", () => {
    const form = parseForm(
      signUpSchema,
      formDataOf({
        name: "   ",
        email: "ada@example.com",
        password: "long-enough",
      }),
    );
    expect(form).toEqual({ outcome: "invalid", message: "Enter your name" });
  });
});
