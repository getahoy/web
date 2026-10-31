import { illustrationCopy as copy } from "../copy/illustrationCopy";
import { landingCopy } from "../copy/landingCopy";
import type { ShotScene } from "../motion/shotTimeline";

type SceneCopy = {
  tab: string;
  tabShort: string;
  heard: string;
  acting: string;
  done: string;
  status: string;
  message: string;
};

export const shotScenes: Record<ShotScene, SceneCopy> = {
  pause: {
    tab: landingCopy["shot.tab.pause"],
    tabShort: landingCopy["shot.tab.pauseShort"],
    heard: copy["pause.heard"],
    acting: copy["pause.acting"],
    done: copy["pause.done"],
    status: copy["pause.status"],
    message: copy["pause.message"],
  },
  note: {
    tab: landingCopy["shot.tab.note"],
    tabShort: landingCopy["shot.tab.noteShort"],
    heard: copy["note.heard"],
    acting: copy["note.acting"],
    done: copy["note.done"],
    status: copy["note.status"],
    message: copy["note.message"],
  },
  draft: {
    tab: landingCopy["shot.tab.draft"],
    tabShort: landingCopy["shot.tab.draftShort"],
    heard: copy["draft.heard"],
    acting: copy["draft.acting"],
    done: copy["draft.done"],
    status: copy["draft.status"],
    message: copy["draft.message"],
  },
};
