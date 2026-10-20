import { authClient } from "../client/authClient";
import { SIGN_IN_PATH } from "../routes";
import { useAuthRedirect } from "./useAuthRedirect";
import { useAuthRequest } from "./useAuthRequest";

const SIGN_OUT_FAILED = "Could not sign out. Try again.";

export function useSignOut() {
  const { pending, errorMessage, submit } = useAuthRequest(SIGN_OUT_FAILED);
  const redirectTo = useAuthRedirect();

  const signOut = () =>
    submit(
      () => authClient.signOut(),
      () => redirectTo(SIGN_IN_PATH),
    );

  return { pending, errorMessage, signOut };
}
