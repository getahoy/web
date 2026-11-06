import { ErrorResponse, parseInput, SuccessResponse } from "@getahoy/lib";
import { historyQuerySchema, historyWriteSchema } from "@getahoy/protocol";
import { apiRoute } from "@/features/api/server/apiRoute";
import { invalidInputResponse, readJson } from "@/features/api/server/readJson";
import { historyCopy } from "@/features/history/copy/historyCopy";
import { historyAccess } from "@/features/history/server/historyAccess";
import { HISTORY_CHANGED } from "@/features/history/server/historyChanged";
import { clearHistory } from "@/features/history/server/historyEntryChanges";
import { historyPageResponse } from "@/features/history/server/historyPageResponse";
import { writeHistory } from "@/features/history/server/writeHistory";
import { logger } from "@/features/logging/server/logger";

// Request URLs land in access logs, so search text never travels in one; it goes to /search.
const urlQuerySchema = historyQuerySchema.omit({ q: true });

export const GET = apiRoute("history.list", async (request) => {
  const access = await historyAccess(request.headers);
  if (access.outcome === "refused") return access.response;
  const params = Object.fromEntries(new URL(request.url).searchParams);
  const parsed = parseInput(urlQuerySchema, params);
  if (parsed.outcome === "invalid") return invalidInputResponse(parsed);
  return historyPageResponse(access.userId, parsed.input);
});

export const POST = apiRoute("history.write", async (request) => {
  const access = await historyAccess(request.headers);
  if (access.outcome === "refused") return access.response;
  const parsed = await readJson(request, historyWriteSchema);
  if (parsed.outcome === "invalid") return invalidInputResponse(parsed);
  const written = await writeHistory(access.userId, parsed.input);
  if (written.outcome === "unknownDevice") {
    return ErrorResponse("forbidden", historyCopy["error.unknownDevice"]);
  }
  const total = parsed.input.entries.length;
  logger.info("history.write", `saved ${written.saved} of ${total}`);
  return SuccessResponse({ saved: written.saved });
});

export const DELETE = apiRoute("history.clear", async (request) => {
  const access = await historyAccess(request.headers);
  if (access.outcome === "refused") return access.response;
  const cleared = await clearHistory(access.userId);
  logger.info("history.clear", `${cleared} entries`);
  return SuccessResponse(HISTORY_CHANGED);
});
