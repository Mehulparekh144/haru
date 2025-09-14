import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BottomNavigation } from "./bottom-navigation";
import { type Metadata } from "next";
import { HabitsSection } from "./habits-section";
import { RandomQuote } from "./random-quote";

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

  return (
    <div className="relative h-full w-full space-y-4">
      <div className="space-y-1.5">
        <h1 className="text-secondary-foreground text-2xl font-bold">
          Welcome Back, {session.user.name}
        </h1>
        <p className="text-muted-foreground font-mono text-xs">
          What are you up to today?
        </p>
      </div>
      <RandomQuote />
      <HabitsSection />
      <BottomNavigation />
    </div>
  );
}
