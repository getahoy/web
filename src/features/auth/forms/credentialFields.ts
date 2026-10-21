import { authCopy, type SignInInput, type SignUpInput } from "@getahoy/lib";

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

export const signInFields: readonly CredentialField<keyof SignInInput>[] = [
  emailField,
  {
    name: "password",
    label: authCopy["field.password"],
    type: "password",
    autoComplete: "current-password",
  },
];

export const signUpFields: readonly CredentialField<keyof SignUpInput>[] = [
  nameField,
  emailField,
  {
    name: "password",
    label: authCopy["field.password"],
    type: "password",
    autoComplete: "new-password",
  },
];
