"use client";

import { AnimatedSection, AnimatedCard } from "@/components/animated-section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, Heart, Target, TrendingUp, Users, Zap } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection delay={0}>
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Calm, Consistent Growth
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Build real habits through gentle accountability and peaceful
              progress tracking
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatedCard delay={0.1}>
            <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <Target className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>Daily Streaks</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Set a habit (Gym, Code, or Study). Show gentle proof each day.
                  Miss once? Start fresh. Simple. Calm. Consistent.
                </CardDescription>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 rounded-lg p-2">
                    <Brain className="text-accent h-6 w-6" />
                  </div>
                  <CardTitle>Gentle AI Validation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Share your progress → AI gently verifies it. Gym: recognizes
                  your effort. Code: acknowledges your work. Study: celebrates
                  your learning. No pressure.
                </CardDescription>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.3}>
            <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 rounded-lg p-2">
                    <TrendingUp className="text-secondary-foreground h-6 w-6" />
                  </div>
                  <CardTitle>Peaceful Progress</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Weekly view (✅ / ❌ / pending). Monthly calendar: calm,
                  clear. Current & longest streak stats. No pressure, just
                  awareness.
                </CardDescription>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.4}>
            <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-chart-1/10 rounded-lg p-2">
                    <Heart className="text-chart-1 h-6 w-6" />
                  </div>
                  <CardTitle>Gentle Reminders</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Calm, supportive messaging. &quot;You&apos;re building
                  something beautiful.&quot; AI as your peaceful companion,
                  encouraging without pressure.
                </CardDescription>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.5}>
            <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-chart-2/10 rounded-lg p-2">
                    <Zap className="text-chart-2 h-6 w-6" />
                  </div>
                  <CardTitle>Minimal Design</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  No distractions, no overwhelming features. AI = one peaceful
                  role: gently validate your progress. Build your chain, one day
                  at a time.
                </CardDescription>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard delay={0.6}>
            <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-chart-3/10 rounded-lg p-2">
                    <Users className="text-chart-3 h-6 w-6" />
                  </div>
                  <CardTitle>Peaceful Accountability</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Other apps rely on self-reporting. Haru offers gentle external
                  validation → proof-based progress. Show up → Continue your
                  journey. Miss once → Begin again.
                </CardDescription>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}
