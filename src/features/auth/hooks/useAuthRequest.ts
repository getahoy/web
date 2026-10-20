import { useState, useTransition } from "react";

type AuthResponse = { error: { message?: string | undefined } | null };

export type AuthRequest = () => Promise<AuthResponse>;

export function useAuthRequest(fallbackMessage: string) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const submit = (request: AuthRequest, onSuccess?: () => void) =>
    startTransition(async () => {
      setErrorMessage(null);
      const { error } = await request();
      if (error) return setErrorMessage(error.message ?? fallbackMessage);
      onSuccess?.();
    });

  return { pending, errorMessage, submit, showError: setErrorMessage };
}
