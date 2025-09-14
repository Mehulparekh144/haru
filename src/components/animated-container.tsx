"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { type ReactNode } from "react";

interface AnimatedContainerProps
  extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition"> {
  children: ReactNode;
  bounceDistance?: number;
  fadeDelay?: number;
  fadeDuration?: number;
  springStiffness?: number;
  springDamping?: number;
  springMass?: number;
}

export const AnimatedContainer = ({
  children,
  bounceDistance = 100,
  fadeDelay = 0.2,
  fadeDuration = 0.6,
  springStiffness = 300,
  springDamping = 20,
  springMass = 0.8,
  ...props
}: AnimatedContainerProps) => {
  return (
    <motion.div
      initial={{ y: bounceDistance, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: springStiffness,
        damping: springDamping,
        mass: springMass,
        opacity: { duration: fadeDuration, delay: fadeDelay },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
