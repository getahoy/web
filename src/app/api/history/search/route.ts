import { historyQuerySchema } from "@getahoy/protocol";
import { apiRoute } from "@/features/api/server/apiRoute";
import { invalidInputResponse, readJson } from "@/features/api/server/readJson";
import { historyAccess } from "@/features/history/server/historyAccess";
import { historyPageResponse } from "@/features/history/server/historyPageResponse";

export const POST = apiRoute("history.search", async (request) => {
  const access = await historyAccess(request.headers);
  if (access.outcome === "refused") return access.response;
  const parsed = await readJson(request, historyQuerySchema);
  if (parsed.outcome === "invalid") return invalidInputResponse(parsed);
  return historyPageResponse(access.userId, parsed.input);
});
