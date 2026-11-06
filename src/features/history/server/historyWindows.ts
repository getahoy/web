const DAY_MS = 24 * 60 * 60 * 1000;
const RETENTION_DAYS = 90;
const SUMMARY_DAYS = 7;
const UNDO_WINDOW_MS = 60_000;

export function retentionCutoffs(now: Date) {
  return {
    startedBefore: new Date(now.getTime() - RETENTION_DAYS * DAY_MS),
    deletedBefore: new Date(now.getTime() - UNDO_WINDOW_MS),
  };
}

export function restorableSince(now: Date): Date {
  return new Date(now.getTime() - UNDO_WINDOW_MS);
}

export function summarySince(now: Date): Date {
  return new Date(now.getTime() - SUMMARY_DAYS * DAY_MS);
}
