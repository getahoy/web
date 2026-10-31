import { useEffect, useRef } from "react";
import { type VoiceClip, voiceClipUrl } from "../copy/demoVoiceCopy";

export function useVoiceClips() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
      audioRef.current?.pause();
    },
    [],
  );

  const element = (): HTMLAudioElement => {
    audioRef.current ??= new Audio();
    return audioRef.current;
  };

  // Safari only lets an element play sound if it first played inside a tap.
  const unlock = () => {
    const audio = element();
    audio.muted = true;
    audio.src = voiceClipUrl("noMatch");
    const settle = () => {
      if (audio.muted) audio.pause();
      audio.muted = false;
    };
    audio.play().then(settle, settle);
  };

  const play = (clip: VoiceClip) => {
    clearTimeout(timerRef.current);
    const audio = element();
    audio.muted = false;
    audio.src = voiceClipUrl(clip);
    audio.play().catch(() => undefined);
  };

  const playAfter = (clip: VoiceClip, delayMs: number) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => play(clip), delayMs);
  };

  const stop = () => {
    clearTimeout(timerRef.current);
    audioRef.current?.pause();
  };

  return { unlock, play, playAfter, stop };
}
