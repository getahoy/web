import { ErrorResponse, SuccessResponse } from "@getahoy/lib";
import { apiRoute } from "@/features/api/server/apiRoute";
import { invalidInputResponse } from "@/features/api/server/readJson";
import { historyCopy } from "@/features/history/copy/historyCopy";
import { historyAccess } from "@/features/history/server/historyAccess";
import { HISTORY_CHANGED } from "@/features/history/server/historyChanged";
import { softDeleteEntry } from "@/features/history/server/historyEntryChanges";
import {
  type EntryContext,
  readEntryId,
} from "@/features/history/server/readEntryId";

export const DELETE = apiRoute<EntryContext>(
  "history.delete",
  async (request, context) => {
    const access = await historyAccess(request.headers);
    if (access.outcome === "refused") return access.response;
    const parsed = await readEntryId(context);
    if (parsed.outcome === "invalid") return invalidInputResponse(parsed);
    const entry = { userId: access.userId, id: parsed.input };
    if (!(await softDeleteEntry(entry))) {
      return ErrorResponse("not_found", historyCopy["error.notFound"]);
    }
    return SuccessResponse(HISTORY_CHANGED);
  },
);
