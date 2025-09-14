import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createHabitSchema } from "@/app/(protected)/dashboard/create/validations";
import type { HabitAgent } from "@prisma/client";
import { HabitDuration } from "@prisma/client";
import { generateCompanion } from "@/lib/ai/companion-choosing-agent";
import { DateTime } from "luxon";

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

      const companion = await generateCompanion(input);

      const habit = await ctx.db.habit.create({
        data: {
          name,
          description,
          startDate,
          endDate,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          agent: companion as HabitAgent,
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
});
