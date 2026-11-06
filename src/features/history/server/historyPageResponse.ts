import { ErrorResponse, SuccessResponse } from "@getahoy/lib";
import type { HistoryQuery } from "@getahoy/protocol";
import { logger } from "@/features/logging/server/logger";
import { historyCopy } from "../copy/historyCopy";
import { decodeHistoryCursor } from "./historyCursor";
import { listHistory } from "./listHistory";

export async function historyPageResponse(
  userId: string,
  query: HistoryQuery,
): Promise<Response> {
  const encoded = query.cursor;
  const cursor = encoded === undefined ? null : decodeHistoryCursor(encoded);
  if (encoded !== undefined && !cursor) {
    const message = historyCopy["error.staleCursor"];
    return ErrorResponse("invalid_input", message, "cursor");
  }
  const page = await listHistory({ userId, query, cursor });
  logger.info("history.list", `${page.entries.length} entries`);
  return SuccessResponse(page);
}
