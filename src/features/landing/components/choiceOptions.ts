import type { VoiceClip } from "../copy/demoVoiceCopy";
import { illustrationCopy as copy } from "../copy/illustrationCopy";

export const choiceOptions: readonly {
  number: number;
  label: string;
  clip: VoiceClip;
}[] = [
  { number: 1, label: copy["report.saveDraft"], clip: "clickedSaveDraft" },
  { number: 2, label: copy["report.save"], clip: "clickedSave" },
  { number: 3, label: copy["report.savePdf"], clip: "clickedSavePdf" },
];

export const DEFAULT_CHOICE = 2;

export const labelOf = (number: number) =>
  choiceOptions.find((option) => option.number === number)?.label ?? "";
