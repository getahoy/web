import { cn } from "@/lib/cn";
import { CtaBand } from "../components/ctaBand";
import { FounderNote } from "../components/founderNote";
import { HeroSection } from "../components/heroSection";
import { HowItWorksSection } from "../components/howItWorksSection";
import { ItAsksSection } from "../components/itAsksSection";
import { PinnedStatement } from "../components/pinnedStatement";
import { ProductShotSection } from "../components/productShotSection";
import { SiteFooter } from "../components/siteFooter";
import { SiteNav } from "../components/siteNav";
import { landingFontVariables } from "../fonts/landingFonts";

export function LandingScreen() {
  return (
    <div
      className={cn(
        "min-h-svh overflow-x-clip bg-sailcloth font-text text-ink antialiased",
        landingFontVariables,
      )}
    >
      <SiteNav />
      <main>
        <HeroSection />
        <ProductShotSection />
        <PinnedStatement />
        <HowItWorksSection />
        <ItAsksSection />
        <FounderNote />
        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  );
}
