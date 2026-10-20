export type CredentialField = {
  name: "name" | "email" | "password";
  label: string;
  type: "text" | "email" | "password";
  autoComplete: "name" | "email" | "current-password" | "new-password";
};

const nameField: CredentialField = {
  name: "name",
  label: "Name",
  type: "text",
  autoComplete: "name",
};

const emailField: CredentialField = {
  name: "email",
  label: "Email",
  type: "email",
  autoComplete: "email",
};

export const signInFields: readonly CredentialField[] = [
  emailField,
  {
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "current-password",
  },
];

export const signUpFields: readonly CredentialField[] = [
  nameField,
  emailField,
  {
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "new-password",
  },
];
