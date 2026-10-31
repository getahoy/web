import type { PhoneBar } from "./phoneDemoScreen";
import type { MicBarMode } from "./phoneMicBar";

export const micBarState = (
  mode: MicBarMode,
  text: string,
  label: string,
  timer: string | null = null,
): PhoneBar => ({ mode, text, label, timer });
