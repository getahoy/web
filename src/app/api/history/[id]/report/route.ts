import { ErrorResponse, SuccessResponse } from "@getahoy/lib";
import { problemReportRequestSchema } from "@getahoy/protocol";
import { apiRoute } from "@/features/api/server/apiRoute";
import { invalidInputResponse, readJson } from "@/features/api/server/readJson";
import { historyCopy } from "@/features/history/copy/historyCopy";
import { historyAccess } from "@/features/history/server/historyAccess";
import { HISTORY_CHANGED } from "@/features/history/server/historyChanged";
import {
  type EntryContext,
  readEntryId,
} from "@/features/history/server/readEntryId";
import { reportProblem } from "@/features/history/server/reportProblem";

export const POST = apiRoute<EntryContext>(
  "history.report",
  async (request, context) => {
    const access = await historyAccess(request.headers);
    if (access.outcome === "refused") return access.response;
    const id = await readEntryId(context);
    if (id.outcome === "invalid") return invalidInputResponse(id);
    const body = await readJson(request, problemReportRequestSchema);
    if (body.outcome === "invalid") return invalidInputResponse(body);
    const { note } = body.input;
    const report = { userId: access.userId, id: id.input, note };
    if (!(await reportProblem(report))) {
      return ErrorResponse("not_found", historyCopy["error.notFound"]);
    }
    return SuccessResponse(HISTORY_CHANGED, 201);
  },
);
