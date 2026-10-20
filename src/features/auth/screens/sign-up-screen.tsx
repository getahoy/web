"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { authClient } from "../client/auth-client";
import { AuthScreenLayout } from "../components/auth-screen-layout";
import { CredentialsForm } from "../components/credentials-form";
import { SocialSignInButtons } from "../components/social-sign-in-buttons";
import { signUpFields } from "../forms/credential-fields";
import { signUpSchema } from "../forms/credentials-schema";
import { parseForm } from "../forms/parse-form";
import type { SocialProviderId } from "../providers/catalog";
import { ACCOUNT_PATH, SIGN_IN_PATH } from "../routes";

const SIGN_UP_FAILED = "Could not create the account. Try again.";

export function SignUpScreen() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const submitCredentials = (formData: FormData) =>
    startTransition(async () => {
      const form = parseForm(signUpSchema, formData);
      if (form.outcome === "invalid") return setErrorMessage(form.message);
      const { error } = await authClient.signUp.email(form.input);
      if (error) return setErrorMessage(error.message ?? SIGN_UP_FAILED);
      router.replace(ACCOUNT_PATH);
      router.refresh();
    });

  const signUpWithProvider = (provider: SocialProviderId) =>
    startTransition(async () => {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: ACCOUNT_PATH,
      });
      if (error) setErrorMessage(error.message ?? SIGN_UP_FAILED);
    });

  return (
    <AuthScreenLayout title="Create your account">
      <CredentialsForm
        fields={signUpFields}
        submitLabel="Create account"
        pending={pending}
        errorMessage={errorMessage}
        onSubmit={submitCredentials}
      />
      <SocialSignInButtons pending={pending} onSelect={signUpWithProvider} />
      <Link href={SIGN_IN_PATH} className="text-accent">
        I already have an account
      </Link>
    </AuthScreenLayout>
  );
}
