import type { Metadata } from "next";
import { landingCopy } from "@/features/landing/copy/landingCopy";
import { LandingScreen } from "@/features/landing/screens/landingScreen";

export const metadata: Metadata = {
  title: landingCopy["meta.title"],
  description: landingCopy["meta.description"],
  openGraph: {
    type: "website",
    url: "/",
    title: landingCopy["meta.title"],
    description: landingCopy["meta.description"],
  },
  twitter: {
    card: "summary_large_image",
    title: landingCopy["meta.title"],
    description: landingCopy["meta.description"],
  },
};

export default function HomePage() {
  return <LandingScreen />;
}
