"use client";

import { AnimatedContainer } from "@/components/animated-container";
import { cn } from "@/lib/utils";

export const BottomNavigation = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <AnimatedContainer
      fadeDelay={0.7}
      className={cn(
        "bg-secondary/50 fixed bottom-4 left-1/2 flex w-max -translate-x-1/2 gap-2 rounded-full p-1.5 backdrop-blur-3xl",
        className,
      )}
    >
      {children}
    </AnimatedContainer>
  );
};
