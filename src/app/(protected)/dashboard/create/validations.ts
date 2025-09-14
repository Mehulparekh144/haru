import z from "zod";

export const createHabitSchema = z.object({
  name: z.string().min(1),
  duration: z.enum(["14", "30", "60", "90"]), // days
  startDate: z.date().refine((date) => date > new Date(), {
    message: "Start date must be in the future",
  }),
  description: z.string().optional(),
});

export type CreateHabitFormValues = z.infer<typeof createHabitSchema>;
