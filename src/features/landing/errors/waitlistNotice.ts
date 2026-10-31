import type { ErrorCode, RequestError } from "@getahoy/lib";
import { waitlistCopy } from "../copy/waitlistCopy";

export type CapsuleNotice =
  | { kind: "none" }
  | { kind: "invalid" }
  | { kind: "failed"; message: string }
  | { kind: "joined" };

export const NO_NOTICE: CapsuleNotice = { kind: "none" };

const failed = (message: string): CapsuleNotice => ({
  kind: "failed",
  message,
});

function apiNotice(code: ErrorCode): CapsuleNotice {
  switch (code) {
    case "invalid_input":
      return { kind: "invalid" };
    case "rate_limited":
      return failed(waitlistCopy["error.rateLimited"]);
    case "transient":
      return failed(waitlistCopy["error.offline"]);
    case "unauthorized":
    case "forbidden":
    case "not_found":
    case "conflict":
    case "device_revoked":
    case "protocol_version_mismatch":
    case "blocked":
    case "broken":
    case "internal":
    case "nothing_heard":
      return failed(waitlistCopy["error.server"]);
    default: {
      const unhandled: never = code;
      return unhandled;
    }
  }
}

export function waitlistNotice(error: RequestError): CapsuleNotice {
  switch (error.kind) {
    case "api":
      return apiNotice(error.detail.code);
    case "malformed":
      return failed(waitlistCopy["error.server"]);
    case "network":
      return failed(waitlistCopy["error.offline"]);
    default: {
      const unhandled: never = error;
      return unhandled;
    }
  }
}
