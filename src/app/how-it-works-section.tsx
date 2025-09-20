"use client";

import { AnimatedSection, AnimatedCard } from "@/components/animated-section";

export function HowItWorksSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection delay={0}>
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How Haru Works
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Simple steps to build real habits with gentle accountability
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Step 1 */}
          <AnimatedCard delay={0.1}>
            <div className="relative">
              <div className="text-center">
                <div className="bg-primary/10 ring-primary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ring-4">
                  <span className="text-primary text-xl font-bold">1</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">Open Haru</h3>
                <p className="text-muted-foreground font-mono text-sm">
                  Start your peaceful journey by opening the app. No
                  overwhelming setup, just a calm space to begin.
                </p>
              </div>
              {/* Arrow */}
              <div className="from-primary/40 to-accent/40 absolute top-8 -right-4 hidden h-0.5 w-8 bg-gradient-to-r lg:block" />
            </div>
          </AnimatedCard>

          {/* Step 2 */}
          <AnimatedCard delay={0.2}>
            <div className="relative">
              <div className="text-center">
                <div className="bg-accent/10 ring-accent/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ring-4">
                  <span className="text-accent text-xl font-bold">2</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Create Your Habit
                </h3>
                <p className="text-muted-foreground font-mono text-sm">
                  Set your intention with gentle guidance.
                </p>
              </div>
              {/* Arrow */}
              <div className="from-accent/40 to-secondary/40 absolute top-8 -right-4 hidden h-0.5 w-8 bg-gradient-to-r lg:block" />
            </div>
          </AnimatedCard>

          {/* Step 3 */}
          <AnimatedCard delay={0.3}>
            <div className="relative">
              <div className="text-center">
                <div className="bg-secondary/10 ring-secondary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ring-4">
                  <span className="text-secondary-foreground text-xl font-bold">
                    3
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">Check In Daily</h3>
                <p className="text-muted-foreground font-mono text-sm">
                  Share a photo of your progress each day. Simple proof of your
                  effort.
                </p>
              </div>
              {/* Arrow */}
              <div className="from-secondary/40 to-chart-1/40 absolute top-8 -right-4 hidden h-0.5 w-8 bg-gradient-to-r lg:block" />
            </div>
          </AnimatedCard>

          {/* Step 4 */}
          <AnimatedCard delay={0.4}>
            <div className="relative">
              <div className="text-center">
                <div className="bg-chart-1/10 ring-chart-1/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ring-4">
                  <span className="text-chart-1 text-xl font-bold">4</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">AI Validates</h3>
                <p className="text-muted-foreground font-mono text-sm">
                  Haru&apos;s AI quietly examines your proof. No judgment, just
                  gentle verification.
                </p>
              </div>
              {/* Arrow */}
              <div className="from-chart-1/40 to-chart-2/40 absolute top-8 -right-4 hidden h-0.5 w-8 bg-gradient-to-r lg:block" />
            </div>
          </AnimatedCard>

          {/* Step 5 */}
          <AnimatedCard delay={0.5}>
            <div className="relative">
              <div className="text-center">
                <div className="bg-chart-2/10 ring-chart-2/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ring-4">
                  <span className="text-chart-2 text-xl font-bold">5</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">Continue Journey</h3>
                <p className="text-muted-foreground font-mono text-sm">
                  If validated, your streak continues peacefully. If not, begin
                  again with gentle encouragement.
                </p>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}
