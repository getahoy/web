import { type SocialProviderId, useAuthRequest } from "@getahoy/auth";
import { authClient } from "../client/authClient";
import { ACCOUNT_PATH } from "../routes";

export function useSocialSignIn() {
  const { pending, errorMessage, submit } = useAuthRequest();

  const signInWith = (provider: SocialProviderId) =>
    submit(() =>
      authClient.signIn.social({ provider, callbackURL: ACCOUNT_PATH }),
    );

  return { pending, errorMessage, signInWith };
}
