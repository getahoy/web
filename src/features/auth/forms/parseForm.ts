import { type ParsedInput, parseInput } from "@getahoy/lib";
import type { z } from "zod";

export function parseForm<T>(
  schema: z.ZodType<T>,
  formData: FormData,
): ParsedInput<T> {
  return parseInput(schema, Object.fromEntries(formData));
}
