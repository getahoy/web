import { demoVoiceCopy, type VoiceClip } from "./demoVoiceCopy";
import { illustrationCopy as copy } from "./illustrationCopy";

type ChoiceOption = { number: number; label: string; clip: VoiceClip };

export const choiceOptions: readonly ChoiceOption[] = [
  { number: 1, label: copy["report.saveDraft"], clip: "clickedSaveDraft" },
  { number: 2, label: copy["report.save"], clip: "clickedSave" },
  { number: 3, label: copy["report.savePdf"], clip: "clickedSavePdf" },
];

export const DEFAULT_CHOICE = 2;

const optionOf = (number: number) =>
  choiceOptions.find((option) => option.number === number);

export const labelOf = (number: number) => optionOf(number)?.label ?? "";

export const clipOf = (number: number) => optionOf(number)?.clip;

export const clickedLine = (number: number) => {
  const clip = clipOf(number);
  return clip ? demoVoiceCopy[clip] : "";
};
