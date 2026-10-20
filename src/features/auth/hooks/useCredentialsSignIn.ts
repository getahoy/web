import { authClient } from "../client/authClient";
import { signInSchema } from "../forms/credentialsSchema";
import { parseForm } from "../forms/parseForm";
import { ACCOUNT_PATH } from "../routes";
import { useAuthRedirect } from "./useAuthRedirect";
import { useAuthRequest } from "./useAuthRequest";

const SIGN_IN_FAILED = "Could not sign in. Try again.";

export function useCredentialsSignIn() {
  const { pending, errorMessage, submit, showError } =
    useAuthRequest(SIGN_IN_FAILED);
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
