import type { z } from "zod";

const FALLBACK_MESSAGE = "Check the form and try again";

export type ParsedForm<T> =
  | { outcome: "valid"; input: T }
  | { outcome: "invalid"; message: string };

export function parseForm<T>(
  schema: z.ZodType<T>,
  formData: FormData,
): ParsedForm<T> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (parsed.success) return { outcome: "valid", input: parsed.data };
  return {
    outcome: "invalid",
    message: parsed.error.issues[0]?.message ?? FALLBACK_MESSAGE,
  };
}
