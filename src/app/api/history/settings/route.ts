import { SuccessResponse } from "@getahoy/lib";
import { type HistorySettings, historySettingsSchema } from "@getahoy/protocol";
import { apiRoute } from "@/features/api/server/apiRoute";
import { invalidInputResponse, readJson } from "@/features/api/server/readJson";
import { historyAccess } from "@/features/history/server/historyAccess";
import {
  keepsHistory,
  setKeepHistory,
} from "@/features/history/server/historySettingsStore";

export const GET = apiRoute("history.settings", async (request) => {
  const access = await historyAccess(request.headers);
  if (access.outcome === "refused") return access.response;
  const settings: HistorySettings = {
    keepHistory: await keepsHistory(access.userId),
  };
  return SuccessResponse(settings);
});

export const PUT = apiRoute("history.settings", async (request) => {
  const access = await historyAccess(request.headers);
  if (access.outcome === "refused") return access.response;
  const parsed = await readJson(request, historySettingsSchema);
  if (parsed.outcome === "invalid") return invalidInputResponse(parsed);
  await setKeepHistory(access.userId, parsed.input.keepHistory);
  return SuccessResponse(parsed.input);
});
