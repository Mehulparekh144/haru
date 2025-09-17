import { Button } from "@/components/ui/button";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bloom With Haru",
  description: "Build better habits with your AI companion",
};

export default async function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Haru</h1>
      <p className="text-muted-foreground">Coming Soon...</p>
      <Button variant={"link"} asChild>
        <Link href="/dashboard">Get Started</Link>
      </Button>
    </div>
  );
}
