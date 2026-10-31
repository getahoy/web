import { useEffect, useRef } from "react";
import { type VoiceClip, voiceClipUrl } from "../copy/demoVoiceCopy";

const UNLOCK_CLIP: VoiceClip = "noMatch";

export function useVoiceClips() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
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
    audio.src = voiceClipUrl(UNLOCK_CLIP);
    const settle = () => {
      if (audio.muted) audio.pause();
      audio.muted = false;
    };
    audio.play().then(settle, settle);
  };

  const play = (clip: VoiceClip): Promise<void> =>
    new Promise((resolve) => {
      const audio = element();
      audio.muted = false;
      audio.src = voiceClipUrl(clip);
      audio.onended = () => resolve();
      audio.onerror = () => resolve();
      audio.play().catch(() => resolve());
    });

  const playAfter = (clip: VoiceClip, delayMs: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => void play(clip), delayMs);
  };

  return { unlock, play, playAfter };
}
