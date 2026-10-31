import type { MicBarMode } from "./phoneMicBar";

export type PhoneBar = {
  mode: MicBarMode;
  text: string;
  label: string;
  timer: string | null;
};

export const micBarState = (
  mode: MicBarMode,
  text: string,
  label: string,
  timer: string | null = null,
): PhoneBar => ({ mode, text, label, timer });
