export const demoVoiceCopy = {
  paused: "Done. Paused the video.",
  newNote: "Done. Made a new note.",
  drafted: "Drafted an email to Jake. Check it and press Send.",
  asksPrompt: "I see three Save buttons. Say one, two or three.",
  clickedSave: "Done. Clicked Save.",
  clickedSaveAs: "Done. Clicked Save As.",
  clickedSaveToFiles: "Done. Clicked Save to Files.",
  onlyThree: "There are only three. Say one, two or three.",
  sayNumber: "Say one, two or three.",
  noMatch: "Didn’t catch that. Try one of these.",
  nothingHeard: "I didn’t hear anything. Tap the mic and try again.",
  micOff: "Microphone is off. Tap one of the examples instead.",
  cannotListen:
    "This browser can’t listen here. Tap one of the examples instead.",
} as const;

export type VoiceClip = keyof typeof demoVoiceCopy;

export const VOICE_CLIP_DIRECTORY = "/landing/voice";

export const voiceClipUrl = (clip: VoiceClip) =>
  `${VOICE_CLIP_DIRECTORY}/${clip}.mp3`;
