import { auth } from "./auth";

const SESSION_CACHE_COOKIE = "session_data";

function withoutSessionCache(headers: Headers): Headers {
  const cookies = (headers.get("cookie") ?? "")
    .split(";")
    .filter((cookie) => !cookie.split("=")[0]?.includes(SESSION_CACHE_COOKIE));
  const cleaned = new Headers(headers);
  cleaned.set("cookie", cookies.join(";"));
  return cleaned;
}

// An unreadable session cache cookie makes Better Auth throw; the signed token alone still decides.
export async function readSession(headers: Headers) {
  try {
    return await auth.api.getSession({ headers });
  } catch {
    return auth.api.getSession({ headers: withoutSessionCache(headers) });
  }
}
