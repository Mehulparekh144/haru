import { env } from "@/env";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from "luxon";
import { HabitDuration, type HabitCategory } from "@prisma/client";
import { put, type PutBlobResult } from "@vercel/blob";

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

export function getHabitStyles(habitCategory: HabitCategory) {
  switch (habitCategory) {
    case "CODING": // Coding
      return "bg-gradient-to-br from-[var(--gradient-auri-from)] via-[var(--gradient-auri-via)] to-[var(--gradient-auri-to)]";

    case "GYM": // Gym
      return "bg-gradient-to-br from-[var(--gradient-kiro-from)] via-[var(--gradient-kiro-via)] to-[var(--gradient-kiro-to)]";

    case "SELF_IMPROVEMENT": // Study
      return "bg-gradient-to-br from-[var(--gradient-sana-from)] via-[var(--gradient-sana-via)] to-[var(--gradient-sana-to)]";

    default:
      return "bg-card";
  }
}

export function getThisWeekDates() {
  const now = DateTime.now();
  const startOfWeek = now.startOf("week");

  const weekDates = Array.from({ length: 7 }).map((_, index) => {
    return {
      date: startOfWeek.plus({ days: index }).toISODate(),
      day: startOfWeek.plus({ days: index }).toFormat("EEEE"),
    };
  });

  return {
    weekDates,
  };
}

export const getDurationInNumber = (duration: HabitDuration) => {
  switch (duration) {
    case HabitDuration.FOURTEEN:
      return 14;
    case HabitDuration.THIRTY:
      return 30;
    case HabitDuration.SIXTY:
      return 60;
    case HabitDuration.NINETY:
      return 90;
    default:
      return 0;
  }
};

export async function getPhotoUrl(
  photo: File,
  path: string,
): Promise<string | undefined> {
  try {
    const result: PutBlobResult = await put(path, photo, {
      access: "public",
    });
    return result.url;
  } catch (error) {
    console.error(`Failed to get photo URL ${error as string}`);
    return undefined;
  }
}
