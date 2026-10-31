import type { VoiceClip } from "../copy/demoVoiceCopy";
import { landingCopy } from "../copy/landingCopy";
import type { ListenOutcome } from "./demoListener";

type MissKind = Exclude<ListenOutcome["kind"], "heard">;

export const listeningMisses: Record<
  MissKind,
  { clip: VoiceClip; message: string }
> = {
  silence: { clip: "nothingHeard", message: landingCopy["try.silence"] },
  denied: { clip: "micOff", message: landingCopy["try.micOff"] },
  unavailable: {
    clip: "cannotListen",
    message: landingCopy["try.cannotListen"],
  },
};
