import type { Metadata } from "next";
import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";
import { HowItWorksSection } from "./how-it-works-section";
import { FooterSection } from "./footer-section";

export const metadata: Metadata = {
  title: "Haru - Gentle Accountability",
  description:
    "The calm accountability app that helps you build real habits through gentle, proof-based check-ins.",
};

export default function Home() {
  return (
    <div className="from-background via-background to-muted/20 min-h-screen bg-gradient-to-br">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FooterSection />
    </div>
  );
}
