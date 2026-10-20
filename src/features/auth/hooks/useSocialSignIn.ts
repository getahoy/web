import { authClient } from "../client/authClient";
import type { SocialProviderId } from "../providers/catalog";
import { ACCOUNT_PATH } from "../routes";
import { useAuthRequest } from "./useAuthRequest";

const SOCIAL_SIGN_IN_FAILED =
  "Could not continue with that provider. Try again.";

export function useSocialSignIn() {
  const { pending, errorMessage, submit } = useAuthRequest(
    SOCIAL_SIGN_IN_FAILED,
  );

  const signInWith = (provider: SocialProviderId) =>
    submit(() =>
      authClient.signIn.social({ provider, callbackURL: ACCOUNT_PATH }),
    );

  return { pending, errorMessage, signInWith };
}
