import { useAuthRequest } from "@getahoy/lib";
import { authClient } from "../client/authClient";
import { SIGN_IN_PATH } from "../routes";
import { useAuthRedirect } from "./useAuthRedirect";

export function useSignOut() {
  const { pending, errorMessage, submit } = useAuthRequest();
  const redirectTo = useAuthRedirect();

  const signOut = () =>
    submit(
      () => authClient.signOut(),
      () => redirectTo(SIGN_IN_PATH),
    );

  return { pending, errorMessage, signOut };
}
