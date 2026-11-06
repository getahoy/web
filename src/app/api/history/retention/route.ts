import { ErrorResponse, SuccessResponse } from "@getahoy/lib";
import { apiRoute } from "@/features/api/server/apiRoute";
import { historyCopy } from "@/features/history/copy/historyCopy";
import { HISTORY_CHANGED } from "@/features/history/server/historyChanged";
import { isCronRequest } from "@/features/history/server/isCronRequest";
import { purgeExpiredHistory } from "@/features/history/server/purgeExpiredHistory";
import { logger } from "@/features/logging/server/logger";

export const GET = apiRoute("history.retention", async (request) => {
  if (!isCronRequest(request.headers)) {
    return ErrorResponse("unauthorized", historyCopy["error.cronOnly"]);
  }
  const purged = await purgeExpiredHistory(new Date());
  logger.info("history.retention", `purged ${purged} entries`);
  return SuccessResponse(HISTORY_CHANGED);
});
