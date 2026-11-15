import type { InterpretAction } from "@getahoy/protocol";
import { type EvalCase, type } from "./interpretCases.ts";

const ADDRESS = "rahulverma1404@gmail.com";
const DOTTED = "rahul.verma1404@gmail.com";
const SPOKEN = "rahul verma 1404 at gmail dot com";

const draftTo = (to: string | null): InterpretAction[] => [
  { kind: "draftEmail", to, subject: "", body: "", via: "mail", browser: null },
];
const toRahul = (others = "") => [
  draftTo(`${ADDRESS}${others}`),
  draftTo(`${DOTTED}${others}`),
];

export const ADDRESS_CASES: readonly EvalCase[] = [
  {
    text: "draft an email to rahul verma one four zero four at gmail dot com about the demo",
    accept: toRahul(),
  },
  {
    text: "email rahul verma fourteen oh four at gmail dot com about the demo",
    accept: toRahul(),
  },
  {
    text: "email rahul dot verma at gmail dot com about lunch",
    accept: [draftTo("rahul.verma@gmail.com")],
  },
  {
    text: `email ${SPOKEN} saying the demo moved to friday`,
    accept: toRahul(),
  },
  {
    text: `email ${SPOKEN} subject demo update body the demo moved to friday`,
    accept: toRahul(),
  },
  {
    text: `email ${SPOKEN} and priya at example dot com about lunch`,
    accept: toRahul(", priya@example.com"),
  },
  {
    text: `email ${SPOKEN} in hindi saying I'll be late`,
    accept: toRahul(),
  },
  { text: `type ${SPOKEN}`, accept: [[type(ADDRESS)]] },
  { text: "type hello at noon", accept: [[type("hello at noon")]] },
  {
    text: "draft an email to myself about groceries",
    accept: [draftTo(null)],
  },
];
