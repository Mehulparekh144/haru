"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  show?: boolean;
  onAnimationComplete?: () => void;
}

export const Motion = ({
  children,
  className,
  delay = 0,
  duration = 300,
  show = true,
  onAnimationComplete,
}: MotionProps) => {
  const [isVisible, setIsVisible] = useState(show);
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
        onAnimationComplete?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, delay, duration, onAnimationComplete]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={cn(
        "transition-opacity ease-in-out",
        isVisible ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: show ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
};

// Convenience components for common animations
export const FadeIn = ({ children, ...props }: Omit<MotionProps, "show">) => (
  <Motion show={true} {...props}>
    {children}
  </Motion>
);

export const FadeOut = ({ children, ...props }: Omit<MotionProps, "show">) => (
  <Motion show={false} {...props}>
    {children}
  </Motion>
);

// Hook for controlling fade animations
export const useFade = (initialShow = true) => {
  const [show, setShow] = useState(initialShow);

  const fadeIn = () => setShow(true);
  const fadeOut = () => setShow(false);
  const toggle = () => setShow((prev) => !prev);

  return {
    show,
    fadeIn,
    fadeOut,
    toggle,
  };
};
