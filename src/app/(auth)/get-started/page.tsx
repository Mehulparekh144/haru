import Image from "next/image";
import { GetStartedTabs } from "./get-started-tabs";
import { Motion } from "@/components/motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Box } from "@/components/box";
import { Suspense } from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started | Bloom With Haru",
  description:
    "Start your journey to build better habits with your AI companion",
};

export default function GetStartedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box>
        <main className="flex h-full flex-col items-start gap-4 pt-36 md:justify-start">
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-1.5">
              <h1 className="text-4xl font-bold">Get Started</h1>
              <p className="text-accent-foreground font-mono text-sm">
                Your streak begins with a single day.
              </p>
              <div className="mt-10">
                <GetStartedTabs />
              </div>
            </div>
            <div className="ml-auto hidden lg:block">
              <Motion show={true} duration={800} delay={200}>
                <div className="relative">
                  <div className="from-primary/20 via-accent/20 to-secondary/20 absolute inset-0 scale-110 animate-pulse rounded-full bg-gradient-to-r blur-3xl" />
                  <div className="relative">
                    <Image
                      src="/images/get-started.png"
                      alt="Get Started"
                      width={500}
                      height={500}
                      className="drop-shadow-2xl"
                    />
                  </div>
                </div>
              </Motion>
            </div>
          </div>

          <Footer className="mx-auto mt-auto py-4 text-center" />
        </main>
      </Box>
    </Suspense>
  );
}

const Footer = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="text-muted-foreground text-sm">
        By continuing, you agree to our{" "}
        <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>
      </p>
    </div>
  );
};
