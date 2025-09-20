"use client";

import { AnimatedSection } from "@/components/animated-section";

export function FooterSection() {
  return (
    <AnimatedSection delay={0}>
      <footer className="bg-muted/30 border-t px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-muted-foreground">
              Your gentle companion for building real habits
            </p>
            <div className="text-muted-foreground mt-8 text-sm">
              © 2024 Haru. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </AnimatedSection>
  );
}
