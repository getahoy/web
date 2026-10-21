"use client";

import { authClient } from "../client/authClient";
import { authCopy } from "../copy/authCopy";
import { signUpFields } from "../forms/credentialFields";
import { signUpSchema } from "../forms/credentialsSchema";
import type { SocialProviderId } from "../providers/socialProviderCatalog";
import { SIGN_IN_PATH } from "../routes";
import { CredentialsScreen } from "./credentialsScreen";

type SignUpScreenProps = {
  socialProviderIds: readonly SocialProviderId[];
};

export function SignUpScreen({ socialProviderIds }: SignUpScreenProps) {
  return (
    <CredentialsScreen
      title={authCopy["signUp.title"]}
      submitLabel={authCopy["signUp.submit"]}
      fields={signUpFields}
      schema={signUpSchema}
      request={(input) => authClient.signUp.email(input)}
      switchHref={SIGN_IN_PATH}
      switchLabel={authCopy["signUp.switch"]}
      socialProviderIds={socialProviderIds}
    />
  );
}
