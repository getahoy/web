import { authCopy } from "../copy/authCopy";
import type { SignInFieldName } from "../hooks/useCredentialsSignIn";
import type { SignUpFieldName } from "../hooks/useCredentialsSignUp";

export type CredentialField<Name extends string> = {
  name: Name;
  label: string;
  type: "text" | "email" | "password";
  autoComplete: "name" | "email" | "current-password" | "new-password";
};

const nameField: CredentialField<"name"> = {
  name: "name",
  label: authCopy["field.name"],
  type: "text",
  autoComplete: "name",
};

const emailField: CredentialField<"email"> = {
  name: "email",
  label: authCopy["field.email"],
  type: "email",
  autoComplete: "email",
};

export const signInFields: readonly CredentialField<SignInFieldName>[] = [
  emailField,
  {
    name: "password",
    label: authCopy["field.password"],
    type: "password",
    autoComplete: "current-password",
  },
];

export const signUpFields: readonly CredentialField<SignUpFieldName>[] = [
  nameField,
  emailField,
  {
    name: "password",
    label: authCopy["field.password"],
    type: "password",
    autoComplete: "new-password",
  },
];
