import { type ParsedInput, parseInput } from "@getahoy/lib";
import { z } from "zod";

const entryIdSchema = z.uuid();

export type EntryContext = { params: Promise<{ id: string }> };

export async function readEntryId(
  context: EntryContext,
): Promise<ParsedInput<string>> {
  const { id } = await context.params;
  return parseInput(entryIdSchema, id);
}
