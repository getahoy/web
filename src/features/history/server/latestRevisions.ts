type Revised = { id: string; rev: number };

// Postgres refuses to update one row twice in a single upsert, so a batch keeps one write per entry.
export function latestRevisions<Entry extends Revised>(
  entries: readonly Entry[],
): Entry[] {
  const latest = new Map<string, Entry>();
  for (const entry of entries) {
    const kept = latest.get(entry.id);
    if (!kept || entry.rev > kept.rev) latest.set(entry.id, entry);
  }
  return [...latest.values()];
}
