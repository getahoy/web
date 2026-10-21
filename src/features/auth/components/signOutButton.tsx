"use client";

import { authCopy } from "@getahoy/lib";
import { Button } from "@/components/ui/button";
import { useAuthNavigation } from "../hooks/useAuthNavigation";
import { useSignOut } from "../hooks/useSignOut";
import { FormError } from "./formError";

export function SignOutButton() {
  const navigation = useAuthNavigation();
  const { pending, errorMessage, signOut } = useSignOut(navigation.goToSignIn);

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={signOut}
        disabled={pending}
      >
        {pending ? authCopy["signOut.pending"] : authCopy["signOut.submit"]}
      </Button>
      <FormError message={errorMessage} />
    </div>
  );
}
