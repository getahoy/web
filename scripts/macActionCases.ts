import type {
  InterpretAction,
  ScrollAmount,
  WindowAction,
} from "@getahoy/protocol";
import { type EvalCase, NONE } from "./interpretCases.ts";

type Direction = "up" | "down";
type LevelKind = "volume" | "brightness";

const SMALLEST_VAGUE_STEP = 5;
const LARGEST_VAGUE_STEP = 25;
const USUAL_STEP = 10;

export const scroll = (
  direction: Direction,
  amount: ScrollAmount = "page",
  times = 1,
): InterpretAction => ({ kind: "scroll", direction, amount, times });
const scrollTo = (direction: "top" | "bottom"): InterpretAction => ({
  kind: "scroll",
  direction,
  amount: "page",
  times: 1,
});
export const navigate = (
  to: "back" | "forward" | "reload",
): InterpretAction => ({ kind: "navigate", to });
export const media = (
  action: "playPause" | "next" | "previous",
): InterpretAction => ({ kind: "media", action });
export const level = (
  kind: LevelKind,
  action: Direction | "set",
  percent: number,
): InterpretAction => ({ kind, action, percent });
export const sound = (action: "mute" | "unmute"): InterpretAction => ({
  kind: "volume",
  action,
  percent: null,
});
export const windowTo = (action: WindowAction): InterpretAction => ({
  kind: "window",
  action,
});
const PAUSE = media("playPause");

export function anyStep(
  kind: LevelKind,
  action: Direction,
  smallest = SMALLEST_VAGUE_STEP,
  largest = LARGEST_VAGUE_STEP,
): InterpretAction[][] {
  const steps = Array.from({ length: largest - smallest + 1 }, (_, index) => [
    level(kind, action, smallest + index),
  ]);
  const usual = smallest <= USUAL_STEP && USUAL_STEP <= largest;
  return usual ? [...steps, [{ kind, action, percent: null }]] : steps;
}

export const MAC_ACTION_CASES: readonly EvalCase[] = [
  { text: "scroll down", accept: [[scroll("down")]] },
  { text: "scroll up a little", accept: [[scroll("up", "small")]] },
  { text: "scroll down a lot", accept: [[scroll("down", "large")]] },
  { text: "scroll down 3 times", accept: [[scroll("down", "page", 3)]] },
  { text: "scroll down 20 times", accept: [[scroll("down", "page", 20)]] },
  { text: "go to the top", accept: [[scrollTo("top")]] },
  { text: "scroll to the end", accept: [[scrollTo("bottom")]] },
  { text: "neeche karo", accept: [[scroll("down")]] },
  { text: "scroll to the pricing section", accept: [NONE] },
  { text: "go forward", accept: [[navigate("forward")]] },
  { text: "reload the page", accept: [[navigate("reload")]] },
  { text: "pause the music", accept: [[PAUSE]] },
  { text: "stop", accept: [[PAUSE]] },
  { text: "gaana rok do", accept: [[PAUSE]] },
  { text: "skip this song", accept: [[media("next")]] },
  { text: "previous song", accept: [[media("previous")]] },
  { text: "turn it up", accept: anyStep("volume", "up") },
  { text: "a little louder", accept: anyStep("volume", "up") },
  { text: "a bit louder", accept: anyStep("volume", "up") },
  { text: "volume up by 15", accept: [[level("volume", "up", 15)]] },
  { text: "volume to 30", accept: [[level("volume", "set", 30)]] },
  {
    text: "volume 150",
    accept: [[level("volume", "set", 150)], [level("volume", "set", 100)]],
  },
  { text: "volume 7 out of 10", accept: [[level("volume", "set", 70)]] },
  { text: "half volume", accept: [[level("volume", "set", 50)]] },
  { text: "mute", accept: [[sound("mute")]] },
  { text: "unmute", accept: [[sound("unmute")]] },
  { text: "awaaz badhao", accept: anyStep("volume", "up") },
  { text: "awaaz kam karo", accept: anyStep("volume", "down") },
  { text: "it's too loud", accept: anyStep("volume", "down") },
  { text: "I can't hear it", accept: anyStep("volume", "up") },
  { text: "make it way quieter", accept: anyStep("volume", "down") },
  { text: "bahut tez hai", accept: anyStep("volume", "down") },
  { text: "spotify volume to 50", accept: [NONE] },
  { text: "brightness up", accept: anyStep("brightness", "up") },
  { text: "a little brighter", accept: anyStep("brightness", "up") },
  {
    text: "brightness down by 20",
    accept: [[level("brightness", "down", 20)]],
  },
  { text: "brightness to 40", accept: [[level("brightness", "set", 40)]] },
  { text: "full brightness", accept: [[level("brightness", "set", 100)]] },
  { text: "turn up the keyboard backlight", accept: [NONE] },
  { text: "make it full screen", accept: [[windowTo("fullScreen")]] },
  { text: "exit full screen", accept: [[windowTo("exitFullScreen")]] },
  { text: "maximize this window", accept: [[windowTo("fill")]] },
  { text: "put it on the left half", accept: [[windowTo("leftHalf")]] },
  {
    text: "move this window to the other screen",
    accept: [[windowTo("nextDisplay")]],
  },
  { text: "lock my mac", accept: [NONE] },
  { text: "more", accept: [NONE] },
  { text: "a bit more", accept: [NONE] },
  { text: "put my mac to sleep", accept: [NONE] },
];
