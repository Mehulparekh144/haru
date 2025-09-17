import { env } from "@/env";
import { getLocalDates, logger } from "@/lib/utils";
import { db } from "@/server/db";
import { DateTime } from "luxon";

export const POST = async (req: Request) => {
  if (req.headers.get("x-cron-secret") !== env.CRON_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const habits = await db.habit.findMany();

  // If the hour is 0 and the minute is less than the window minutes, we need to update the checkins
  let checkinsModified = 0;
  let checkinsUpserted = 0;
  for (const habit of habits) {
    const { today, yesterday, hour, minute } = getLocalDates(habit.timezone);

    if (!yesterday || !hour || !minute || !today) continue;

    // 1. Update all pending checkins for yesterday and earlier to skipped
    const yesterdayDate = DateTime.fromISO(yesterday)
      .setZone(habit.timezone)
      .endOf("day")
      .toJSDate();

    const updated = await db.habitCheckin.updateMany({
      where: {
        habitId: habit.id,
        timestamp: {
          lte: yesterdayDate,
        },
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

    if (data && DateTime.fromJSDate(data.startDate) > DateTime.fromISO(today)) {
      continue;
    }

    const todayDate = DateTime.fromISO(today)
      .setZone(habit.timezone)
      .startOf("day")
      .toJSDate();

    const upserted = await db.habitCheckin.upsert({
      where: {
        habitId_timestamp: {
          habitId: habit.id,
          timestamp: todayDate,
        },
      },
      update: {},
      create: {
        habitId: habit.id,
        timestamp: todayDate,
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
  return new Response(
    `Cron job completed with ${checkinsModified} checkins modified and ${checkinsUpserted} checkins upserted`,
    { status: 200 },
  );
};
