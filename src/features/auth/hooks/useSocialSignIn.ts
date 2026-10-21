import { authClient } from "../client/authClient";
import type { SocialProviderId } from "../providers/socialProviderCatalog";
import { ACCOUNT_PATH, SIGN_IN_PATH } from "../routes";
import { useAuthRequest } from "./useAuthRequest";

export function useSocialSignIn() {
  const { pending, errorMessage, submit } = useAuthRequest();

  const signInWith = (provider: SocialProviderId) =>
    submit(() =>
      authClient.signIn.social({
        provider,
        callbackURL: ACCOUNT_PATH,
        errorCallbackURL: SIGN_IN_PATH,
      }),
    );

  return { pending, errorMessage, signInWith };
}
