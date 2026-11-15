const NAMED_GREETING = /^(Hi|Hello) ([^,\n]+),/;

function wordsOf(text: string): Set<string> {
  const words = text.toLowerCase().split(/[^\p{L}\p{N}]+/u);
  return new Set(words.filter(Boolean));
}

// The model sometimes reads a name out of an address (dev@ becomes "Hi Dev,"), and the email
// goes out under the sender's name, so a name the person never said is taken out.
export function withSpokenGreeting(body: string, request: string): string {
  const [, greeting, name] = NAMED_GREETING.exec(body) ?? [];
  if (greeting === undefined || name === undefined) return body;
  const said = wordsOf(request);
  if ([...wordsOf(name)].every((word) => said.has(word))) return body;
  return body.replace(NAMED_GREETING, `${greeting},`);
}
