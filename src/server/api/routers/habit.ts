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
      const endDate = DateTime.fromJSDate(startDate)
        .plus({ days: Number(duration) })
        .toJSDate();

      const category = await generateCategory(input);

      const habit = await ctx.db.habit.create({
        data: {
          name,
          description,
          startDate,
          endDate,
          habitCategory: category,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          duration: getDuration(duration),
          userId: ctx.user.id,
        },
      });

      for (let i = 0; i < Number(Math.min(14, Number(duration))); i++) {
        await ctx.db.habitCheckin.create({
          data: {
            habitId: habit.id,
            timestamp: DateTime.fromJSDate(startDate)
              .plus({ days: i })
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
