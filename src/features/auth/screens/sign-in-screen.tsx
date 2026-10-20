"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { authClient } from "../client/auth-client";
import { AuthScreenLayout } from "../components/auth-screen-layout";
import { CredentialsForm } from "../components/credentials-form";
import { SocialSignInButtons } from "../components/social-sign-in-buttons";
import { signInFields } from "../forms/credential-fields";
import { signInSchema } from "../forms/credentials-schema";
import { parseForm } from "../forms/parse-form";
import type { SocialProviderId } from "../providers/catalog";
import { ACCOUNT_PATH, SIGN_UP_PATH } from "../routes";

const SIGN_IN_FAILED = "Could not sign in. Try again.";

export function SignInScreen() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const submitCredentials = (formData: FormData) =>
    startTransition(async () => {
      const form = parseForm(signInSchema, formData);
      if (form.outcome === "invalid") return setErrorMessage(form.message);
      const { error } = await authClient.signIn.email(form.input);
      if (error) return setErrorMessage(error.message ?? SIGN_IN_FAILED);
      router.replace(ACCOUNT_PATH);
      router.refresh();
    });

  const signInWithProvider = (provider: SocialProviderId) =>
    startTransition(async () => {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: ACCOUNT_PATH,
      });
      if (error) setErrorMessage(error.message ?? SIGN_IN_FAILED);
    });

  return (
    <AuthScreenLayout title="Sign in">
      <CredentialsForm
        fields={signInFields}
        submitLabel="Sign in"
        pending={pending}
        errorMessage={errorMessage}
        onSubmit={submitCredentials}
      />
      <SocialSignInButtons pending={pending} onSelect={signInWithProvider} />
      <Link href={SIGN_UP_PATH} className="text-accent">
        Create an account
      </Link>
    </AuthScreenLayout>
  );
}
