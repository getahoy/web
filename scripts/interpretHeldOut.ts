import {
  closeTab,
  draft,
  type EvalCase,
  hide,
  keys,
  NONE,
  open,
  quit,
  RETURN,
  search,
  site,
  switchTab,
  switchTo,
  type,
} from "./interpretCases.ts";

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
  { text: "reload this", accept: [[keys("r")]] },
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
];
