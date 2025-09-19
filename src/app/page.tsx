import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MorphingText } from "@/components/ui/morphing-text";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Brain,
  Heart,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Haru - Gentle Accountability",
  description:
    "The calm accountability app that helps you build real habits through gentle, proof-based check-ins.",
};

export default function Home() {
  return (
    <div className="from-background via-background to-muted/20 min-h-screen bg-gradient-to-br">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 animate-pulse">
              <Target className="mr-2 h-4 w-4" />
              Gentle Accountability
            </Badge>

            <div className="mb-8">
              {/* Logo */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="from-primary/20 via-accent/20 to-secondary/20 absolute inset-0 scale-110 animate-pulse rounded-full bg-gradient-to-r blur-xl" />
                  <div className="relative">
                    <Image
                      src="/images/logo.png"
                      alt="Haru Logo"
                      width={120}
                      height={120}
                      className="drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>

              <MorphingText
                className="mb-4 text-4xl font-bold tracking-tight sm:text-6xl lg:text-8xl"
                texts={["Haru", "Growth", "Peace", "Balance", "Harmony"]}
              />
              <p className="text-muted-foreground text-xl sm:text-2xl">
                Your gentle companion for real habits
              </p>
            </div>

            <p className="text-muted-foreground mx-auto mb-12 max-w-2xl font-serif text-lg">
              Haru helps you build genuine habits through calm, proof-based
              check-ins. No pressure, no judgment—just peaceful accountability
              that works.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="group">
                <Link href="/get-started" className="flex items-center">
                  Begin Your Journey
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="from-primary/20 to-accent/20 absolute top-20 left-10 h-20 w-20 animate-pulse rounded-full bg-gradient-to-r blur-xl" />
        <div className="from-accent/20 to-primary/20 absolute top-40 right-20 h-32 w-32 animate-pulse rounded-full bg-gradient-to-r blur-xl delay-1000" />
        <div className="from-secondary/20 to-accent/20 absolute bottom-20 left-1/4 h-16 w-16 animate-pulse rounded-full bg-gradient-to-r blur-xl delay-2000" />
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Calm, Consistent Growth
            </h2>
            <p className="text-muted-foreground mt-4 font-serif text-lg">
              Build real habits through gentle accountability and peaceful
              progress tracking
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How Haru Works
            </h2>
            <p className="text-muted-foreground mt-4 font-serif text-lg">
              Simple steps to build real habits with gentle accountability
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {/* Step 1 */}
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

            {/* Step 2 */}
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

            {/* Step 3 */}
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

            {/* Step 4 */}
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

            {/* Step 5 */}
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-muted-foreground font-serif">
              Your gentle companion for building real habits
            </p>
            <div className="text-muted-foreground mt-8 text-sm">
              © 2024 Haru. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
