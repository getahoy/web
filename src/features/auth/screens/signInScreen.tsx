"use client";

import Link from "next/link";
import { AuthScreenLayout } from "../components/authScreenLayout";
import { CredentialsForm } from "../components/credentialsForm";
import { SocialSignInButtons } from "../components/socialSignInButtons";
import { signInFields } from "../forms/credentialFields";
import { useCredentialsSignIn } from "../hooks/useCredentialsSignIn";
import { useSocialSignIn } from "../hooks/useSocialSignIn";
import type { SocialProviderId } from "../providers/catalog";
import { SIGN_UP_PATH } from "../routes";

type SignInScreenProps = {
  socialProviderIds: readonly SocialProviderId[];
};

export function SignInScreen({ socialProviderIds }: SignInScreenProps) {
  const credentials = useCredentialsSignIn();
  const social = useSocialSignIn();
  const pending = credentials.pending || social.pending;

  return (
    <AuthScreenLayout title="Sign in">
      <CredentialsForm
        fields={signInFields}
        submitLabel="Sign in"
        pending={pending}
        errorMessage={credentials.errorMessage ?? social.errorMessage}
        onSubmit={credentials.signIn}
      />
      <SocialSignInButtons
        providerIds={socialProviderIds}
        pending={pending}
        onSelect={social.signInWith}
      />
      <Link
        href={SIGN_UP_PATH}
        className="text-primary text-sm underline-offset-4 hover:underline"
      >
        Create an account
      </Link>
    </AuthScreenLayout>
  );
}
