import {
  type AuthResponse,
  type SocialProviderId,
  useAuthRequest,
  useCredentialsForm,
} from "@getahoy/lib";
import Link from "next/link";
import { Suspense } from "react";
import type { z } from "zod";
import { AuthScreenLayout } from "../components/authScreenLayout";
import { CredentialsForm } from "../components/credentialsForm";
import { SocialSignInButtons } from "../components/socialSignInButtons";
import { SocialSignInError } from "../components/socialSignInError";
import type { CredentialField } from "../forms/credentialFields";
import { useAuthNavigation } from "../hooks/useAuthNavigation";
import { useSocialSignIn } from "../hooks/useSocialSignIn";

type CredentialsScreenProps<Input extends Record<string, string>> = {
  title: string;
  submitLabel: string;
  fields: readonly CredentialField<keyof Input & string>[];
  schema: z.ZodType<Input>;
  request: (input: Input) => Promise<AuthResponse>;
  switchHref: string;
  switchLabel: string;
  socialProviderIds: readonly SocialProviderId[];
};

export function CredentialsScreen<Input extends Record<string, string>>(
  props: CredentialsScreenProps<Input>,
) {
  const navigation = useAuthNavigation();
  const authRequest = useAuthRequest();
  const credentials = useCredentialsForm({
    schema: props.schema,
    request: props.request,
    authRequest,
    onSuccess: navigation.goToAccount,
  });
  const social = useSocialSignIn(authRequest);
  const { pending, errorMessage } = authRequest;

  return (
    <AuthScreenLayout title={props.title}>
      <Suspense fallback={null}>
        <SocialSignInError hidden={pending || errorMessage !== null} />
      </Suspense>
      <CredentialsForm
        fields={props.fields}
        values={credentials.values}
        submitLabel={props.submitLabel}
        pending={pending}
        errorMessage={errorMessage}
        onChange={credentials.setField}
        onSubmit={credentials.submit}
      />
      <SocialSignInButtons
        providerIds={props.socialProviderIds}
        pending={pending}
        onSelect={social.signInWith}
      />
      <Link
        href={props.switchHref}
        className="text-primary text-sm underline-offset-4 hover:underline"
      >
        {props.switchLabel}
      </Link>
    </AuthScreenLayout>
  );
}
