"use client";

import "./globals.css";
import type { ErrorInfo } from "next/error";
import { ErrorFallback } from "@/features/errors/components/errorFallback";

export default function GlobalError(errorInfo: ErrorInfo) {
  return (
    <html lang="en">
      <body>
        <ErrorFallback {...errorInfo} />
      </body>
    </html>
  );
}
