import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createHabitSchema } from "@/app/(protected)/dashboard/create/validations";
import { HabitDuration } from "@prisma/client";
import { generateCategory } from "@/lib/ai/category-choosing-agent";
import { DateTime } from "luxon";
import { z } from "zod";
import { validatePhoto } from "@/lib/ai/photo-validating-client";

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

  validateHabitPhoto: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        photoURL: z.url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, photoURL } = input;

      const habit = await ctx.db.habit.findUnique({
        where: { id },
      });
      if (!habit) {
        throw new Error("Habit not found");
      }

      const validation = await validatePhoto(photoURL, habit);

      return { ...validation, photoURL };
    }),

  checkIn: protectedProcedure
    .input(
      z.object({ id: z.string(), description: z.string(), photoURL: z.url() }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, description, photoURL } = input;

      const habit = await ctx.db.habit.findUnique({
        where: { id },
      });
      if (!habit) {
        throw new Error("Habit not found");
      }

      const startOfDay = DateTime.now().startOf("day").toJSDate();
      const endOfDay = DateTime.now().endOf("day").toJSDate();
      const checkin = await ctx.db.habitCheckin.findFirst({
        where: {
          habitId: id,
          timestamp: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      const longestStreak = habit.longestStreak;
      const currentStreak = habit.currentStreak;

      if (checkin) {
        await ctx.db.habitCheckin.update({
          where: { id: checkin.id },
          data: { photoURL, status: "COMPLETED", description },
        });
      } else {
        await ctx.db.habitCheckin.create({
          data: {
            habitId: id,
            photoURL,
            status: "COMPLETED",
            timestamp: new Date(),
            description,
          },
        });
      }

      await ctx.db.habit.update({
        where: { id },
        data: {
          longestStreak: Math.max(longestStreak, currentStreak + 1),
          currentStreak: currentStreak + 1,
        },
      });

      return checkin;
    }),

  getUserStats: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;

    // Get all habits for the user
    const habits = await ctx.db.habit.findMany({
      where: { userId },
      include: {
        habitCheckins: true,
      },
    });

    // Calculate statistics
    const totalHabits = habits.length;
    const activeHabits = habits.filter((habit) => {
      const now = new Date();
      return new Date(habit.startDate) <= now && new Date(habit.endDate) >= now;
    }).length;

    const totalCheckins = habits.reduce(
      (sum, habit) =>
        sum +
        habit.habitCheckins.filter((checkin) => checkin.status === "COMPLETED")
          .length,
      0,
    );

    const longestStreak = Math.max(
      ...habits.map((habit) => habit.longestStreak),
      0,
    );

    const totalPossibleCheckins = habits.reduce((sum, habit) => {
      const startDate = new Date(habit.startDate);
      const endDate = new Date(habit.endDate);
      const now = new Date();
      const actualEndDate = now < endDate ? now : endDate;
      const daysDiff = Math.ceil(
        (actualEndDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      return sum + Math.max(0, daysDiff);
    }, 0);

    const successRate =
      totalPossibleCheckins > 0
        ? Math.round((totalCheckins / totalPossibleCheckins) * 100)
        : 0;

    return {
      totalHabits,
      activeHabits,
      totalCheckins,
      longestStreak,
      successRate,
    };
  }),
});
