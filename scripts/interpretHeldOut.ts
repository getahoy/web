import {
  closeTab,
  draft,
  type EvalCase,
  hide,
  NONE,
  open,
  quit,
  RELOAD,
  RETURN,
  search,
  site,
  switchTab,
  switchTo,
  type,
} from "./interpretCases.ts";
import {
  anyStep,
  level,
  media,
  navigate,
  scroll,
  sound,
  windowTo,
} from "./macActionCases.ts";

const LITTLE = { smallest: 5, largest: 10 };
const LOT = { smallest: 10, largest: 25 };

// Held out: never read while changing the prompt, so its score shows how the prompt generalises.
export const HELD_OUT_CASES: readonly EvalCase[] = [
  { text: "exit spotify", accept: [[quit("Spotify")]] },
  { text: "fire up the calculator", accept: [[open("Calculator")]] },
  { text: "tuck whatsapp away", accept: [[hide("WhatsApp")]] },
  {
    text: "jump over to finder",
    accept: [[switchTo("Finder")], [open("Finder")]],
  },
  {
    text: "find me cheap hotels in delhi",
    accept: [[search("cheap hotels in delhi")]],
  },
  { text: "pull up wikipedia", accept: [[site("wikipedia.org")]] },
  { text: "reload this", accept: [[RELOAD]] },
  { text: "safari kholo", accept: [[open("Safari")]] },
  { text: "type see you at 5", accept: [[type("see you at 5")]] },
  {
    text: "send ok sounds good",
    accept: [[type("ok sounds good"), RETURN]],
  },
  { text: "close the twitter tab", accept: [[closeTab("twitter")]] },
  { text: "switch to the notion tab", accept: [[switchTab("notion")]] },
  {
    text: "mail priya at example dot com about tomorrow's meeting",
    accept: [[draft("priya@example.com", "mail")]],
  },
  { text: "erase my hard drive", accept: [NONE] },
  { text: "press command q", accept: [NONE] },
  {
    text: "thodi awaaz badha do",
    accept: anyStep("volume", "up", LITTLE.smallest, LITTLE.largest),
  },
  {
    text: "awaaz ekdum full kar do",
    accept: [[level("volume", "set", 100)]],
  },
  { text: "sound band karo", accept: [[sound("mute")]] },
  { text: "agla gaana", accept: [[media("next")]] },
  { text: "pichhla wala gaana chalao", accept: [[media("previous")]] },
  {
    text: "screen thodi dim karo",
    accept: anyStep("brightness", "down", LITTLE.smallest, LITTLE.largest),
  },
  { text: "I can barely hear anything", accept: anyStep("volume", "up") },
  {
    text: "my kid's sleeping, make it way quieter",
    accept: anyStep("volume", "down", LOT.smallest, LOT.largest),
  },
  {
    text: "bring it down to like a quarter",
    accept: [[level("volume", "set", 25)]],
  },
  { text: "put this on the left side", accept: [[windowTo("leftHalf")]] },
  {
    text: "send this window to my other monitor",
    accept: [[windowTo("nextDisplay")]],
  },
  {
    text: "screen ko poora bada karo",
    accept: [[windowTo("fill")], [windowTo("fullScreen")]],
  },
  { text: "go back a page", accept: [[navigate("back")]] },
  { text: "page refresh karo", accept: [[navigate("reload")]] },
  { text: "keep going", accept: [NONE] },
  { text: "thoda aur", accept: [NONE] },
  { text: "scroll down slowly", accept: [[scroll("down", "small")]] },
  {
    text: "zara upar jao",
    accept: [[scroll("up", "small")], [scroll("up")]],
  },
  { text: "lock kar do", accept: [NONE] },
  { text: "stop the music", accept: [[media("playPause")]] },
  { text: "mute karo yaar", accept: [[sound("mute")]] },
  {
    text: "brightness 60 pe rakho",
    accept: [[level("brightness", "set", 60)]],
  },
  {
    text: "awaaz bahut zyada hai",
    accept: anyStep("volume", "down", LOT.smallest, LOT.largest),
  },
  {
    text: "thoda tez karo",
    accept: anyStep("volume", "up", LITTLE.smallest, LITTLE.largest),
  },
  { text: "make Spotify quieter", accept: [NONE] },
  { text: "dim my external monitor", accept: [NONE] },
];
