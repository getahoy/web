import type { HistoryFilter, HistoryStatus } from "@getahoy/protocol";

export const DID_NOT_GO_THROUGH: readonly HistoryStatus[] = [
  "failed",
  "blocked",
];

export const WENT_THROUGH: readonly HistoryStatus[] = ["done", "choice"];

export function statusesShownBy(
  filter: HistoryFilter,
): readonly HistoryStatus[] | null {
  switch (filter) {
    case "all":
      return null;
    case "done":
      return WENT_THROUGH;
    case "failed":
      return DID_NOT_GO_THROUGH;
    default: {
      const unhandled: never = filter;
      return unhandled;
    }
  }
}
