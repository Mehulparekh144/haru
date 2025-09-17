import { env } from "@/env";
import { logger } from "@/lib/utils";
import { db } from "@/server/db";
import { DateTime } from "luxon";

export const POST = async (req: Request) => {
  if (req.headers.get("x-cron-secret") !== env.CRON_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const habits = await db.habit.findMany();
  let checkinsModified = 0;
  let checkinsUpserted = 0;

  for (const habit of habits) {
    const now = DateTime.now().setZone(habit.timezone);
    const today = now.startOf("day");
    const yesterday = now.minus({ days: 1 }).startOf("day");

    // Only mark as skipped if we're past 23:59:59 of yesterday
    const yesterdayEnd = yesterday.endOf("day");

    if (now > yesterdayEnd) {
      // 1. Mark all pending checkins from yesterday and earlier as skipped
      const updated = await db.habitCheckin.updateMany({
        where: {
          habitId: habit.id,
          timestamp: {
            lte: yesterdayEnd.toJSDate(),
          },
          status: "PENDING",
        },
        data: {
          status: "SKIPPED",
        },
      });
      checkinsModified += updated.count;
    }

    // 2. Create today's checkin if habit has started
    const habitStartDate = DateTime.fromJSDate(habit.startDate).setZone(
      habit.timezone,
    );

    if (today >= habitStartDate.startOf("day")) {
      const todayStart = today.startOf("day");

      const upserted = await db.habitCheckin.upsert({
        where: {
          habitId_timestamp: {
            habitId: habit.id,
            timestamp: todayStart.toJSDate(),
          },
        },
        update: {},
        create: {
          habitId: habit.id,
          timestamp: todayStart.toJSDate(),
          status: "PENDING",
        },
      });
      checkinsUpserted += upserted ? 1 : 0;
    }

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
