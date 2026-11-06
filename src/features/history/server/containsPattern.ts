const LIKE_WILDCARDS = /[\\%_]/g;

export function containsPattern(search: string): string {
  const literal = search.replace(LIKE_WILDCARDS, (wildcard) => `\\${wildcard}`);
  return `%${literal}%`;
}
