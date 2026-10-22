"use client";

import { authCopy, errorMessages } from "@getahoy/lib";
import type { ErrorInfo } from "next/error";
import { Button } from "@/components/ui/button";

export function ErrorFallback({ retry }: ErrorInfo) {
  return (
    <main className="mx-auto flex max-w-sm flex-col gap-4 p-6">
      <p role="alert">{errorMessages.internal}</p>
      <Button type="button" onClick={retry}>
        {authCopy["action.retry"]}
      </Button>
    </main>
  );
}
