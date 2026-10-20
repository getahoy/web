"use client";

import { useSignOut } from "../hooks/useSignOut";
import { FormError } from "./formError";

export function SignOutButton() {
  const { pending, errorMessage, signOut } = useSignOut();

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={signOut}
        disabled={pending}
        className="rounded-control border border-border p-2"
      >
        {pending ? "Signing out…" : "Sign out"}
      </button>
      <FormError message={errorMessage} />
    </div>
  );
}
