import {
  HISTORY_RETENTION_DAYS,
  HISTORY_SUMMARY_DAYS,
  HISTORY_UNDO_WINDOW_MS,
} from "@getahoy/protocol";

const DAY_MS = 24 * 60 * 60 * 1000;

export function retentionCutoffs(now: Date) {
  return {
    startedBefore: new Date(now.getTime() - HISTORY_RETENTION_DAYS * DAY_MS),
    deletedBefore: new Date(now.getTime() - HISTORY_UNDO_WINDOW_MS),
  };
}

export function restorableSince(now: Date): Date {
  return new Date(now.getTime() - HISTORY_UNDO_WINDOW_MS);
}

export function summarySince(now: Date): Date {
  return new Date(now.getTime() - HISTORY_SUMMARY_DAYS * DAY_MS);
}
