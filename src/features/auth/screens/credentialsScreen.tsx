import Link from "next/link";
import type { z } from "zod";
import { AuthScreenLayout } from "../components/authScreenLayout";
import { CredentialsForm } from "../components/credentialsForm";
import { SocialSignInButtons } from "../components/socialSignInButtons";
import type { CredentialField } from "../forms/credentialFields";
import { useAuthNavigation } from "../hooks/useAuthNavigation";
import type { AuthResponse } from "../hooks/useAuthRequest";
import { useCredentialsForm } from "../hooks/useCredentialsForm";
import { useSocialSignIn } from "../hooks/useSocialSignIn";
import type { SocialProviderId } from "../providers/socialProviderCatalog";

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
  const credentials = useCredentialsForm(
    props.schema,
    props.request,
    navigation.goToAccount,
  );
  const social = useSocialSignIn();
  const pending = credentials.pending || social.pending;

  return (
    <AuthScreenLayout title={props.title}>
      <CredentialsForm
        fields={props.fields}
        values={credentials.values}
        submitLabel={props.submitLabel}
        pending={pending}
        errorMessage={credentials.errorMessage ?? social.errorMessage}
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
