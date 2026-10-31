import { illustrationCopy as copy } from "../copy/illustrationCopy";
import { landingCopy } from "../copy/landingCopy";
import type { ShotScene } from "../motion/shotTimeline";

type SceneCopy = {
  chip: string;
  heard: string;
  acting: string;
  done: string;
  status: string;
  message: string;
};

export const shotScenes: Record<ShotScene, SceneCopy> = {
  pause: {
    chip: landingCopy["shot.chip.pause"],
    heard: copy["pause.heard"],
    acting: copy["pause.acting"],
    done: copy["pause.done"],
    status: copy["pause.status"],
    message: copy["pause.message"],
  },
  note: {
    chip: landingCopy["shot.chip.note"],
    heard: copy["note.heard"],
    acting: copy["note.acting"],
    done: copy["note.done"],
    status: copy["note.status"],
    message: copy["note.message"],
  },
  draft: {
    chip: landingCopy["shot.chip.draft"],
    heard: copy["draft.heard"],
    acting: copy["draft.acting"],
    done: copy["draft.done"],
    status: copy["draft.status"],
    message: copy["draft.message"],
  },
};
