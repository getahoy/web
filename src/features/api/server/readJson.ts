import { ErrorResponse, type ParsedInput, parseInput } from "@getahoy/lib";
import type { z } from "zod";

type InvalidInput = Extract<ParsedInput<unknown>, { outcome: "invalid" }>;

export async function readJson<T>(
  request: Request,
  schema: z.ZodType<T>,
): Promise<ParsedInput<T>> {
  const body: unknown = await request.json().catch(() => undefined);
  return parseInput(schema, body);
}

export function invalidInputResponse(invalid: InvalidInput): Response {
  return ErrorResponse(
    "invalid_input",
    invalid.message,
    invalid.field ?? undefined,
  );
}
