"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "../client/authActions";
import { authCopy } from "../copy/authCopy";
import { useAuthNavigation } from "../hooks/useAuthNavigation";
import { useSignOut } from "../hooks/useSignOut";
import { FormError } from "./formError";

export function SignOutButton() {
  const navigation = useAuthNavigation();
  const { pending, errorMessage, submit } = useSignOut({
    signOut,
    onSuccess: navigation.goToSignIn,
  });

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={submit}
        disabled={pending}
      >
        {pending ? authCopy["signOut.pending"] : authCopy["signOut.submit"]}
      </Button>
      <FormError message={errorMessage} />
    </div>
  );
}
