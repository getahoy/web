import {
  credentialFields,
  type SignInInput,
  type SignUpInput,
} from "@getahoy/lib";

export type CredentialField<Name extends string> = {
  name: Name;
  label: string;
  type: "text" | "email" | "password";
  autoComplete: "name" | "email" | "current-password" | "new-password";
};

export const signInFields: readonly CredentialField<keyof SignInInput>[] = [
  { ...credentialFields.email, type: "email" },
  { ...credentialFields.currentPassword, type: "password" },
];

export const signUpFields: readonly CredentialField<keyof SignUpInput>[] = [
  { ...credentialFields.name, type: "text" },
  { ...credentialFields.email, type: "email" },
  { ...credentialFields.newPassword, type: "password" },
];
