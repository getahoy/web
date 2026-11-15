export type EmailCase = {
  text: string;
  named: string | null | "unchecked";
  dictated?: string;
};

export const EMAIL_CASES: readonly EmailCase[] = [
  {
    text: "email team at example dot com about the offsite moving to friday",
    named: null,
  },
  {
    text: "email p sharma at example dot com tell priya the deck is ready for review",
    named: "Priya",
    dictated: "the deck is ready for review",
  },
  {
    text: "mail ops at example dot com saying um the server restart is done and everything looks fine",
    named: null,
    dictated: "the server restart is done",
  },
  {
    text: "email accounts at example dot com subject invoice for october body please find the invoice for october attached",
    named: null,
    dictated: "please find the invoice for october attached",
  },
  {
    text: "write a formal email to hr at example dot com asking for leave on friday for a family function",
    named: null,
  },
  {
    text: "email rahul verma 1404 at gmail dot com in hindi saying I'll be late",
    named: "unchecked",
  },
  {
    text: "bhai ko mail karo dev at example dot com ki kal ka plan cancel hai",
    named: null,
  },
  {
    text: "email rahul verma 1404 at gmail dot com and priya at example dot com about lunch on thursday",
    named: "unchecked",
  },
  {
    text: "email k lee at example dot com, ask sam if we can push the review to monday",
    named: "Sam",
  },
  {
    text: "email support at example dot com about my order 4471 arriving damaged",
    named: null,
  },
  {
    text: "email l weber at example dot com tell lena thanks for the notes from today",
    named: "Lena",
    dictated: "thanks for the notes from today",
  },
  {
    text: "send an email to billing at example dot com asking for a copy of last month's receipt",
    named: null,
  },
  {
    text: "email the landlord at example dot com about the kitchen tap leaking since monday",
    named: null,
  },
  {
    text: "email jo at example dot com saying happy birthday see you saturday",
    named: "unchecked",
    dictated: "happy birthday",
  },
  {
    text: "email m khan at example dot com tell omar running late start the meeting without me",
    named: "Omar",
    dictated: "start the meeting without me",
  },
];
