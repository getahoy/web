// Vercel sets x-real-ip from the connection and overwrites any client value, so it cannot be spoofed there.
export function clientAddress(headers: Headers): string | null {
  return headers.get("x-real-ip")?.trim() || null;
}
