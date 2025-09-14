import { env } from "@/env";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from "luxon";
import type { HabitAgent } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

type Variant = "info" | "error" | "warn" | "debug";

export function logger(message: string, variant: Variant = "info") {
  if (env.NODE_ENV !== "development") return;

  switch (variant) {
    case "info":
      console.log(`[${new Date().toISOString()}] ${message}`);
      break;
    case "error":
      console.error(`[${new Date().toISOString()}] ${message}`);
      break;
    case "warn":
      console.warn(`[${new Date().toISOString()}] ${message}`);
      break;
    case "debug":
      console.debug(`[${new Date().toISOString()}] ${message}`);
      break;
  }
}

export function getLocalDates(tz: string) {
  const now = DateTime.now().setZone(tz);

  return {
    today: now.toISODate(),
    yesterday: now.minus({ days: 1 }).toISODate(),
    hour: now.hour,
    minute: now.minute,
  };
}

export function getHabitStyles(habitCompanion: HabitAgent) {
  switch (habitCompanion) {
    case "AURI": // Coding
      return "bg-gradient-to-br from-[var(--gradient-auri-from)] via-[var(--gradient-auri-via)] to-[var(--gradient-auri-to)]";

    case "KIRO": // Gym
      return "bg-gradient-to-br from-[var(--gradient-kiro-from)] via-[var(--gradient-kiro-via)] to-[var(--gradient-kiro-to)]";

    case "SANA": // Study
      return "bg-gradient-to-br from-[var(--gradient-sana-from)] via-[var(--gradient-sana-via)] to-[var(--gradient-sana-to)]";

    default:
      return "bg-card";
  }
}
