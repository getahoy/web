import { authClient } from "../client/authClient";
import type { SocialProviderId } from "../providers/socialProviderCatalog";
import { ACCOUNT_PATH } from "../routes";
import { useAuthRequest } from "./useAuthRequest";

export function useSocialSignIn() {
  const { pending, errorMessage, submit } = useAuthRequest();

  const signInWith = (provider: SocialProviderId) =>
    submit(() =>
      authClient.signIn.social({ provider, callbackURL: ACCOUNT_PATH }),
    );

  return { pending, errorMessage, signInWith };
}
