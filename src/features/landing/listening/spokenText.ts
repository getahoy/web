const MAX_SHOWN_SECONDS = 59;
const DEMO_SECONDS = 1;

export function micTimer(seconds: number): string {
  const shown = Math.min(MAX_SHOWN_SECONDS, Math.max(0, Math.floor(seconds)));
  return `0:${String(shown).padStart(2, "0")}`;
}

export const demoTimer = micTimer(DEMO_SECONDS);

export const quote = (text: string) => `“${text}”`;
