import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BottomNavigation } from "./bottom-navigation";
import { type Metadata } from "next";
import { HabitsSection } from "./habits-section";
import { RandomQuote } from "./random-quote";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { env } from "@/env";

export const metadata: Metadata = {
  title: "Dashboard | Bloom With Haru",
  description: "Track your habits and progress with your AI companion",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/get-started");
  }

  await fetch(`${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/cron`, {
    next: {
      revalidate: 0.5 * 60 * 60, // 0.5 hours
    },
  });

  return (
    <div className="relative h-full w-full space-y-4">
      <div className="space-y-1.5">
        <h1 className="from-primary to-accent bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
          Welcome Back, {session.user.name}
        </h1>
        <p className="text-muted-foreground font-mono text-xs">
          What are you up to today?
        </p>
      </div>
      <RandomQuote />
      <HabitsSection />
      <BottomNavigation>
        <Button
          className="group rounded-full"
          variant={"default"}
          size={"icon"}
          title="Create Habit"
          asChild
        >
          <Link href="/dashboard/create">
            <Plus className="text-fo size-6 transition-transform duration-300 group-hover:scale-110" />
          </Link>
        </Button>
      </BottomNavigation>
    </div>
  );
}
