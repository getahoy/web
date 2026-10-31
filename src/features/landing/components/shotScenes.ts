import { illustrationCopy as copy } from "../copy/illustrationCopy";
import type { ShotScene } from "../motion/shotTimeline";

type SceneCopy = {
  heard: string;
  acting: string;
  done: string;
  status: string;
  message: string;
};

export const shotScenes: Record<ShotScene, SceneCopy> = {
  pause: {
    heard: copy["pause.heard"],
    acting: copy["pause.acting"],
    done: copy["pause.done"],
    status: copy["pause.status"],
    message: copy["pause.message"],
  },
  closeTab: {
    heard: copy["closeTab.heard"],
    acting: copy["closeTab.acting"],
    done: copy["closeTab.done"],
    status: copy["closeTab.status"],
    message: copy["closeTab.message"],
  },
  draft: {
    heard: copy["draft.heard"],
    acting: copy["draft.acting"],
    done: copy["draft.done"],
    status: copy["draft.status"],
    message: copy["draft.message"],
  },
};
