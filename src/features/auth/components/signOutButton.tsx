"use client";

import { Button } from "@/components/ui/button";
import { useSignOut } from "../hooks/useSignOut";
import { FormError } from "./formError";

export function SignOutButton() {
  const { pending, errorMessage, signOut } = useSignOut();

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={signOut}
        disabled={pending}
      >
        {pending ? "Signing out…" : "Sign out"}
      </Button>
      <FormError message={errorMessage} />
    </div>
  );
}
