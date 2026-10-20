import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahoy",
  description: "Talk to your Mac from your phone",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="bg-surface font-sans text-body text-text">
        {children}
      </body>
    </html>
  );
}
