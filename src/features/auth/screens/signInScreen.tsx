"use client";

import { authCopy, type SocialProviderId, signInSchema } from "@getahoy/lib";
import { authClient } from "../client/authClient";
import { signInFields } from "../forms/credentialFields";
import { SIGN_UP_PATH } from "../routes";
import { CredentialsScreen } from "./credentialsScreen";

type SignInScreenProps = {
  socialProviderIds: readonly SocialProviderId[];
};

export function SignInScreen({ socialProviderIds }: SignInScreenProps) {
  return (
    <CredentialsScreen
      title={authCopy["signIn.title"]}
      submitLabel={authCopy["signIn.submit"]}
      fields={signInFields}
      schema={signInSchema}
      request={(input) => authClient.signIn.email(input)}
      switchHref={SIGN_UP_PATH}
      switchLabel={authCopy["signIn.switch"]}
      socialProviderIds={socialProviderIds}
    />
  );
}
