import z from "zod";

export const createHabitSchema = z.object({
  name: z.string().min(1),
  duration: z.enum(["14", "30", "60", "90"]), // days
  frequency: z.enum(["DAILY", "WEEKLY", "BIWEEKLY"]),
  startDate: z.date(),
  description: z.string().optional(),
});

export type CreateHabitFormValues = z.infer<typeof createHabitSchema>;
