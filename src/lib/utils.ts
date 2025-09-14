import { env } from "@/env";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from "luxon";

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
