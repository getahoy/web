"use client";

import Link from "next/link";
import { AuthScreenLayout } from "../components/authScreenLayout";
import { CredentialsForm } from "../components/credentialsForm";
import { SocialSignInButtons } from "../components/socialSignInButtons";
import { signInFields } from "../forms/credentialFields";
import { useCredentialsSignIn } from "../hooks/useCredentialsSignIn";
import { useSocialSignIn } from "../hooks/useSocialSignIn";
import { SIGN_UP_PATH } from "../routes";

export function SignInScreen() {
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
      <SocialSignInButtons pending={pending} onSelect={social.signInWith} />
      <Link href={SIGN_UP_PATH} className="text-accent">
        Create an account
      </Link>
    </AuthScreenLayout>
  );
}
