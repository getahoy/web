import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
