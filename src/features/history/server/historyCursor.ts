import { z } from "zod";

export type HistoryCursor = { startedAt: Date; id: string };

const cursorSchema = z.tuple([z.iso.datetime({ offset: true }), z.uuid()]);

export function encodeHistoryCursor({ startedAt, id }: HistoryCursor): string {
  const pair = JSON.stringify([startedAt.toISOString(), id]);
  return Buffer.from(pair).toString("base64url");
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

export function decodeHistoryCursor(cursor: string): HistoryCursor | null {
  const text = Buffer.from(cursor, "base64url").toString("utf8");
  const parsed = cursorSchema.safeParse(parseJson(text));
  if (!parsed.success) return null;
  const [startedAt, id] = parsed.data;
  return { startedAt: new Date(startedAt), id };
}
