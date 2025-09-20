"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className="absolute inset-0">
      {/* Floating Elements with Parallax */}
      <motion.div
        className="from-primary/20 to-accent/20 absolute top-20 left-10 h-20 w-20 animate-pulse rounded-full bg-gradient-to-r blur-xl"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]),
        }}
      />
      <motion.div
        className="from-accent/20 to-primary/20 absolute top-40 right-20 h-32 w-32 animate-pulse rounded-full bg-gradient-to-r blur-xl delay-1000"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]),
        }}
      />
      <motion.div
        className="from-secondary/20 to-accent/20 absolute bottom-20 left-1/4 h-16 w-16 animate-pulse rounded-full bg-gradient-to-r blur-xl delay-2000"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]),
        }}
      />
    </motion.div>
  );
}
