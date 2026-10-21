"use client";

import {
  authCopy,
  type SocialProviderId,
  useCredentialsSignUp,
} from "@getahoy/auth";
import Link from "next/link";
import { signUpWithEmail } from "../client/authActions";
import { AuthScreenLayout } from "../components/authScreenLayout";
import { CredentialsForm } from "../components/credentialsForm";
import { SocialSignInButtons } from "../components/socialSignInButtons";
import { signUpFields } from "../forms/credentialFields";
import { useAuthNavigation } from "../hooks/useAuthNavigation";
import { useSocialSignIn } from "../hooks/useSocialSignIn";
import { SIGN_IN_PATH } from "../routes";

type SignUpScreenProps = {
  socialProviderIds: readonly SocialProviderId[];
};

export function SignUpScreen({ socialProviderIds }: SignUpScreenProps) {
  const navigation = useAuthNavigation();
  const credentials = useCredentialsSignUp({
    signUp: signUpWithEmail,
    onSuccess: navigation.goToAccount,
  });
  const social = useSocialSignIn();
  const pending = credentials.pending || social.pending;

  return (
    <AuthScreenLayout title={authCopy["signUp.title"]}>
      <CredentialsForm
        fields={signUpFields}
        values={credentials.values}
        submitLabel={authCopy["signUp.submit"]}
        pending={pending}
        errorMessage={credentials.errorMessage ?? social.errorMessage}
        onChange={credentials.setField}
        onSubmit={credentials.submit}
      />
      <SocialSignInButtons
        providerIds={socialProviderIds}
        pending={pending}
        onSelect={social.signInWith}
      />
      <Link
        href={SIGN_IN_PATH}
        className="text-primary text-sm underline-offset-4 hover:underline"
      >
        {authCopy["signUp.switch"]}
      </Link>
    </AuthScreenLayout>
  );
}
