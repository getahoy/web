import { signUpSchema, useAuthRequest } from "@getahoy/lib";
import { authClient } from "../client/authClient";
import { parseForm } from "../forms/parseForm";
import { ACCOUNT_PATH } from "../routes";
import { useAuthRedirect } from "./useAuthRedirect";

export function useCredentialsSignUp() {
  const { pending, errorMessage, submit, showError } = useAuthRequest();
  const redirectTo = useAuthRedirect();

  const signUp = (formData: FormData) => {
    const form = parseForm(signUpSchema, formData);
    if (form.outcome === "invalid") return showError(form.message);
    submit(
      () => authClient.signUp.email(form.input),
      () => redirectTo(ACCOUNT_PATH),
    );
  };

  return { pending, errorMessage, signUp };
}
