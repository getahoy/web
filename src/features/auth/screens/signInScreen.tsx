"use client";

import {
  authCopy,
  type SocialProviderId,
  useCredentialsSignIn,
} from "@getahoy/auth";
import Link from "next/link";
import { signInWithEmail } from "../client/authActions";
import { AuthScreenLayout } from "../components/authScreenLayout";
import { CredentialsForm } from "../components/credentialsForm";
import { SocialSignInButtons } from "../components/socialSignInButtons";
import { signInFields } from "../forms/credentialFields";
import { useAuthNavigation } from "../hooks/useAuthNavigation";
import { useSocialSignIn } from "../hooks/useSocialSignIn";
import { SIGN_UP_PATH } from "../routes";

type SignInScreenProps = {
  socialProviderIds: readonly SocialProviderId[];
};

export function SignInScreen({ socialProviderIds }: SignInScreenProps) {
  const navigation = useAuthNavigation();
  const credentials = useCredentialsSignIn({
    signIn: signInWithEmail,
    onSuccess: navigation.goToAccount,
  });
  const social = useSocialSignIn();
  const pending = credentials.pending || social.pending;

  return (
    <AuthScreenLayout title={authCopy["signIn.title"]}>
      <CredentialsForm
        fields={signInFields}
        values={credentials.values}
        submitLabel={authCopy["signIn.submit"]}
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
        href={SIGN_UP_PATH}
        className="text-primary text-sm underline-offset-4 hover:underline"
      >
        {authCopy["signIn.switch"]}
      </Link>
    </AuthScreenLayout>
  );
}
