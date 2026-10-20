import { authClient } from "../client/authClient";
import { signUpSchema } from "../forms/credentialsSchema";
import { parseForm } from "../forms/parseForm";
import { ACCOUNT_PATH } from "../routes";
import { useAuthRedirect } from "./useAuthRedirect";
import { useAuthRequest } from "./useAuthRequest";

const SIGN_UP_FAILED = "Could not create the account. Try again.";

export function useCredentialsSignUp() {
  const { pending, errorMessage, submit, showError } =
    useAuthRequest(SIGN_UP_FAILED);
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
