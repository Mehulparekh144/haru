import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createHabitSchema } from "@/app/(protected)/dashboard/create/validations";
import { HabitDuration } from "@prisma/client";
import { generateCategory } from "@/lib/ai/category-choosing-agent";
import { DateTime } from "luxon";
import { z } from "zod";

const getDuration = (duration: string): HabitDuration => {
  switch (duration) {
    case "14":
      return HabitDuration.FOURTEEN;
    case "30":
      return HabitDuration.THIRTY;
    case "60":
      return HabitDuration.SIXTY;
    case "90":
      return HabitDuration.NINETY;
    default:
      throw new Error(`Invalid duration: ${duration}`);
  }
};

export const habitRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createHabitSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, description, duration, startDate } = input;

      // Ensure startDate is at 00:00:00 in the user's timezone
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const normalizedStartDate = DateTime.fromJSDate(startDate)
        .setZone(userTimezone)
        .startOf("day")
        .toJSDate();

      const endDate = DateTime.fromJSDate(normalizedStartDate)
        .plus({ days: Number(duration) })
        .endOf("day")
        .toJSDate();

      const category = await generateCategory(input);

      const habit = await ctx.db.habit.create({
        data: {
          name,
          description,
          startDate: normalizedStartDate,
          endDate,
          habitCategory: category,
          timezone: userTimezone,
          duration: getDuration(duration),
          userId: ctx.user.id,
        },
      });

      for (let i = 0; i < Number(Math.min(14, Number(duration))); i++) {
        await ctx.db.habitCheckin.create({
          data: {
            habitId: habit.id,
            timestamp: DateTime.fromJSDate(normalizedStartDate)
              .plus({ days: i })
              .startOf("day")
              .toJSDate(),
            status: "PENDING",
          },
        });
      }

      return habit;
    }),

  getUserHabits: protectedProcedure.query(async ({ ctx }) => {
    const habits = await ctx.db.habit.findMany({
      where: {
        userId: ctx.user.id,
      },
      orderBy: {
        longestStreak: "desc",
      },
      include: {
        habitCheckins: true,
      },
    });
    return habits;
  }),

  getUserHabit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const habit = await ctx.db.habit.findUnique({
        where: { id },
        include: {
          habitCheckins: true,
        },
      });

      return habit;
    }),
});
