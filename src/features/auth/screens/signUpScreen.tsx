"use client";

import Link from "next/link";
import { AuthScreenLayout } from "../components/authScreenLayout";
import { CredentialsForm } from "../components/credentialsForm";
import { SocialSignInButtons } from "../components/socialSignInButtons";
import { signUpFields } from "../forms/credentialFields";
import { useCredentialsSignUp } from "../hooks/useCredentialsSignUp";
import { useSocialSignIn } from "../hooks/useSocialSignIn";
import type { SocialProviderId } from "../providers/catalog";
import { SIGN_IN_PATH } from "../routes";

type SignUpScreenProps = {
  socialProviderIds: readonly SocialProviderId[];
};

export function SignUpScreen({ socialProviderIds }: SignUpScreenProps) {
  const credentials = useCredentialsSignUp();
  const social = useSocialSignIn();
  const pending = credentials.pending || social.pending;

  return (
    <AuthScreenLayout title="Create your account">
      <CredentialsForm
        fields={signUpFields}
        submitLabel="Create account"
        pending={pending}
        errorMessage={credentials.errorMessage ?? social.errorMessage}
        onSubmit={credentials.signUp}
      />
      <SocialSignInButtons
        providerIds={socialProviderIds}
        pending={pending}
        onSelect={social.signInWith}
      />
      <Link href={SIGN_IN_PATH} className="text-accent">
        I already have an account
      </Link>
    </AuthScreenLayout>
  );
}
