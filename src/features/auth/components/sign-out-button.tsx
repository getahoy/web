"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { authClient } from "../client/auth-client";
import { SIGN_IN_PATH } from "../routes";
import { FormError } from "./form-error";

const SIGN_OUT_FAILED = "Could not sign out. Try again.";

export function SignOutButton() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const signOut = () =>
    startTransition(async () => {
      const { error } = await authClient.signOut();
      if (error) return setErrorMessage(error.message ?? SIGN_OUT_FAILED);
      router.replace(SIGN_IN_PATH);
      router.refresh();
    });

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
