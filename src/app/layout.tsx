import type { Metadata } from "next";
import { serverEnv } from "@/env/serverEnv";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(serverEnv.BETTER_AUTH_URL),
  title: "Ahoy",
  description: "Talk to your Mac from your phone",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="motion-safe:scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
