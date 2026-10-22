import type { AuthRequestState, SocialProviderId } from "@getahoy/lib";
import { authClient } from "../client/authClient";
import { ACCOUNT_PATH, SIGN_IN_PATH } from "../routes";

export function useSocialSignIn(authRequest: AuthRequestState) {
  const signInWith = (provider: SocialProviderId) =>
    authRequest.submit(() =>
      authClient.signIn.social({
        provider,
        callbackURL: ACCOUNT_PATH,
        errorCallbackURL: SIGN_IN_PATH,
      }),
    );

  return { signInWith };
}
