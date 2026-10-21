import { useRouter } from "next/navigation";
import { ACCOUNT_PATH, SIGN_IN_PATH } from "../routes";

export function useAuthNavigation() {
  const router = useRouter();

  const replaceWith = (path: string) => {
    router.replace(path);
    router.refresh();
  };

  return {
    goToAccount: () => replaceWith(ACCOUNT_PATH),
    goToSignIn: () => replaceWith(SIGN_IN_PATH),
  };
}
