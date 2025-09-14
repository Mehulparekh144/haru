import { env } from "@/env";
import { getLocalDates, logger } from "@/lib/utils";
import { db } from "@/server/db";

const WINDOW_MINUTES = 15; // 15 minutes before and after the hour

export const POST = async () => {
  const habits = await db.habit.findMany();

  // If the hour is 0 and the minute is less than the window minutes, we need to update the checkins
  let checkinsModified = 0;
  let checkinsUpserted = 0;
  for (const habit of habits) {
    const { today, yesterday, hour, minute } = getLocalDates(habit.timezone);

    if (!yesterday || !hour || !minute || !today) continue;

    if (
      (hour === 0 && minute < WINDOW_MINUTES) ||
      env.NODE_ENV === "development"
    ) {
      // 1. Update all pending checkins for yesterday to skipped
      const updated = await db.habitCheckin.updateMany({
        where: {
          habitId: habit.id,
          timestamp: new Date(yesterday),
          status: "PENDING",
        },
        data: {
          status: "SKIPPED",
        },
      });

      checkinsModified += updated.count;

      // 2. Upsert the pending checkin for today
      const data = await db.habit.findUnique({
        where: {
          id: habit.id,
        },
        select: {
          startDate: true,
        },
      });

      if (data && data.startDate > new Date(today)) {
        continue;
      }

      const upserted = await db.habitCheckin.upsert({
        where: {
          habitId_timestamp: {
            habitId: habit.id,
            timestamp: new Date(today),
          },
        },
        update: {},
        create: {
          habitId: habit.id,
          timestamp: new Date(today),
          status: "PENDING",
        },
      });

      checkinsUpserted += upserted ? 1 : 0;

      // 3. Update streaks
      const streaks = await db.habitCheckin.findMany({
        where: {
          habitId: habit.id,
        },
        orderBy: {
          timestamp: "desc",
        },
      });

      const { currentStreak, longestStreak } = streaks.reduce(
        (acc, streak) => {
          if (streak.status === "COMPLETED") {
            acc.currentStreak++;
            acc.longestStreak = Math.max(acc.longestStreak, acc.currentStreak);
          } else {
            acc.currentStreak = 0;
          }
          return acc;
        },
        {
          currentStreak: 0,
          longestStreak: 0,
        },
      );

      await db.habit.update({
        where: {
          id: habit.id,
        },
        data: {
          currentStreak,
          longestStreak,
        },
      });

      logger(
        `Updated habit ${habit.name} with ${checkinsModified} checkins modified and ${checkinsUpserted} checkins upserted`,
        "info",
      );
    }
  }
  return new Response(
    `Cron job completed with ${checkinsModified} checkins modified and ${checkinsUpserted} checkins upserted`,
    { status: 200 },
  );
};
