import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createHabitSchema } from "@/app/(protected)/dashboard/create/validations";
import type { HabitAgent, HabitFrequency } from "@prisma/client";
import { HabitDuration } from "@prisma/client";
import { generateCompanion } from "@/lib/ai/companion-choosing-agent";

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
      const { name, description, duration, frequency, startDate } = input;
      const endDate = new Date(
        startDate.getTime() + Number(duration) * 24 * 60 * 60 * 1000,
      );

      const companion = await generateCompanion(input);
      console.log("companion", companion);

      const habit = await ctx.db.habit.create({
        data: {
          name,
          description,
          startDate,
          endDate,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          agent: companion as HabitAgent,
          duration: getDuration(duration),
          frequency: frequency as HabitFrequency,
          userId: ctx.user.id,
        },
      });

      return habit;
    }),
});
