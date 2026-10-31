import type { VoiceClip } from "../copy/demoVoiceCopy";
import type { ListenOutcome } from "./demoListener";

export const missClips: Record<
  Exclude<ListenOutcome["kind"], "heard">,
  VoiceClip
> = {
  silence: "nothingHeard",
  denied: "micOff",
  unavailable: "cannotListen",
};
