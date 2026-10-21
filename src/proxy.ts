import { type NextRequest, NextResponse } from "next/server";
import {
  ACCOUNT_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
} from "@/features/auth/routes";
import { auth } from "@/features/auth/server/auth";

const signedOutOnlyPaths: readonly string[] = [SIGN_IN_PATH, SIGN_UP_PATH];

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  const { pathname } = request.nextUrl;

  if (session && signedOutOnlyPaths.includes(pathname)) {
    return NextResponse.redirect(new URL(ACCOUNT_PATH, request.url));
  }
  if (!session && pathname === ACCOUNT_PATH) {
    return NextResponse.redirect(new URL(SIGN_IN_PATH, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/account"],
};
