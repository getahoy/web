import { signInSchema, useAuthRequest } from "@getahoy/lib";
import { authClient } from "../client/authClient";
import { parseForm } from "../forms/parseForm";
import { ACCOUNT_PATH } from "../routes";
import { useAuthRedirect } from "./useAuthRedirect";

export function useCredentialsSignIn() {
  const { pending, errorMessage, submit, showError } = useAuthRequest();
  const redirectTo = useAuthRedirect();

  const signIn = (formData: FormData) => {
    const form = parseForm(signInSchema, formData);
    if (form.outcome === "invalid") return showError(form.message);
    submit(
      () => authClient.signIn.email(form.input),
      () => redirectTo(ACCOUNT_PATH),
    );
  };

  return { pending, errorMessage, signIn };
}
