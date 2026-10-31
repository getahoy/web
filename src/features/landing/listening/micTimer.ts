const MAX_SHOWN_SECONDS = 59;
const PAD_WIDTH = 2;

export function micTimer(seconds: number): string {
  const shown = Math.min(MAX_SHOWN_SECONDS, Math.max(0, Math.floor(seconds)));
  return `0:${String(shown).padStart(PAD_WIDTH, "0")}`;
}

export const quoted = (open: string, text: string, close: string) =>
  `${open}${text}${close}`;
