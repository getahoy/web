export const macAppCopy = {
  "youtube.url": "youtube.com/watch",
  "youtube.chapter": "Chapter 2",
  "youtube.scene": "Close-hauled",
  "youtube.title": "Sailing upwind, explained",
  "youtube.channel": "Tide & Line",
  "youtube.upNext": "Up next",
  "youtube.length": "12:40",
  "notes.title": "Notes",
  "notes.new": "New Note",
  "notes.newDetail": "9:41 · No additional text",
  "notes.newDate": "31 October 2026 at 9:41",
  "notes.oldDate": "30 October 2026 at 18:20",
  "notes.openTitle": "Trip to Goa",
  "notes.line1": "Flights on the 14th, back on the 20th.",
  "notes.line2": "Book the scooter for three days.",
  "notes.line3": "Pack the reef shoes and the dry bag.",
  "gmail.url": "mail.google.com",
  "gmail.compose": "Compose",
  "gmail.inbox": "Inbox",
  "gmail.inboxCount": "3",
  "gmail.starred": "Starred",
  "gmail.sent": "Sent",
  "gmail.drafts": "Drafts",
  "gmail.draftCount": "1",
  "draft.title": "New message",
  "draft.toLabel": "To",
  "draft.to": "Jake Bauer",
  "draft.subject": "Running late",
  "draft.body": "Hi Jake, I’ll be a few minutes late.",
} as const;

export const upNextVideos = [
  { title: "Reefing a mainsail in a hurry", length: "9:04" },
  { title: "Knots you will actually use", length: "6:31" },
  { title: "Reading the wind on the water", length: "11:18" },
] as const;

export const savedNotes = [
  { title: "Trip to Goa", detail: "Yesterday · Flights on the 14th" },
  { title: "Groceries", detail: "Monday · Oats, limes, coffee" },
  { title: "Ideas for Ahoy", detail: "12 Oct · Say a number to pick" },
] as const;

export const inboxMails = [
  {
    from: "Jake Bauer",
    subject: "Invoice for October",
    snippet: "Attached is the invoice for October",
    time: "9:12",
    unread: true,
  },
  {
    from: "Maya Chen",
    subject: "Offsite dates",
    snippet: "Does the second week of November work",
    time: "8:40",
    unread: true,
  },
  {
    from: "Ethan Cole",
    subject: "Photos from Sunday",
    snippet: "Uploaded the ones from the beach",
    time: "Yesterday",
    unread: true,
  },
  {
    from: "Studio",
    subject: "Q3 report comments",
    snippet: "Two small notes on page three",
    time: "Tue",
    unread: false,
  },
  {
    from: "Calendar",
    subject: "Standup moved to 10:30",
    snippet: "Starting tomorrow",
    time: "Mon",
    unread: false,
  },
] as const;
