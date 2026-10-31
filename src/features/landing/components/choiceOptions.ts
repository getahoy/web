import { illustrationCopy as copy } from "../copy/illustrationCopy";

export const choiceOptions = [
  { number: 1, label: copy["report.save"] },
  { number: 2, label: copy["report.saveAs"] },
  { number: 3, label: copy["report.saveToFiles"] },
] as const;
