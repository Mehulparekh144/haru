"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MorphingText } from "@/components/ui/morphing-text";
import { Target, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ParallaxHero } from "@/components/parallax-hero";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0 }}
          >
            <Badge variant="secondary" className="mb-6 animate-pulse">
              <Target className="mr-2 h-4 w-4" />
              Gentle Accountability
            </Badge>
          </motion.div>

          <div className="mb-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
              className="mb-6 flex justify-center"
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              <MorphingText
                className="mb-4"
                texts={["Haru", "Growth", "Peace", "Balance", "Harmony"]}
              />
              <p className="text-muted-foreground text-xl sm:text-2xl">
                Your gentle companion for real habits
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-lg">
              Haru helps you build genuine habits through calm, proof-based
              check-ins. No pressure, no judgment—just peaceful accountability
              that works.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
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
          </motion.div>
        </div>
      </div>

      {/* Parallax Floating Elements */}
      <ParallaxHero />
    </section>
  );
}
