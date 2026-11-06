import { ErrorResponse, SuccessResponse } from "@getahoy/lib";
import { apiRoute } from "@/features/api/server/apiRoute";
import { historyCopy } from "@/features/history/copy/historyCopy";
import { HISTORY_CHANGED } from "@/features/history/server/historyChanged";
import { cronAccess } from "@/features/history/server/isCronRequest";
import { purgeExpiredHistory } from "@/features/history/server/purgeExpiredHistory";
import { logger } from "@/features/logging/server/logger";

export const GET = apiRoute("history.retention", async (request) => {
  const access = cronAccess(request.headers);
  if (access === "unconfigured") {
    logger.warn("history.retention", "CRON_SECRET is not set");
    return ErrorResponse("transient", historyCopy["error.cronUnset"]);
  }
  if (access === "refused") {
    return ErrorResponse("unauthorized", historyCopy["error.cronOnly"]);
  }
  const purged = await purgeExpiredHistory(new Date());
  logger.info("history.retention", `purged ${purged} entries`);
  return SuccessResponse(HISTORY_CHANGED);
});
