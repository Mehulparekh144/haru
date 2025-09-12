import type { CreateHabitFormValues } from "@/app/(protected)/dashboard/create/validations";
import { env } from "@/env";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import z from "zod";

const openrouter = createOpenRouter({
  apiKey: String(env.OPENAI_API_KEY),
});

export const generateCompanion = async (habit: CreateHabitFormValues) => {
  const { object } = await generateObject({
    model: openrouter.chat("qwen/qwen3-4b:free"),
    schema: z.object({
      companion: z.enum(["AURI", "KIRO", "SANA"]),
    }),
    prompt: `
    Choose the best companion for the habit: ${habit.name}
    The habit is about: ${habit.description}
    The habit is scheduled to start on: ${habit.startDate.toISOString()}
    The habit is scheduled to repeat every: ${habit.frequency}
    The habit is scheduled to last for: ${habit.duration} days

    Each companion brings a different personality and guidance style.  
    Pick the one that feels most motivating for you:  

    🌱 Auri — Calm, focused, and thoughtful. Best for coding, deep work, or creative problem solving.  
    💪 Kiro — Energetic, supportive, and consistent. Great for gym, movement, or habits needing daily push.  
    📖 Sana — Gentle, wise, and patient. Perfect for study, reading, or slow, steady learning.  
    `,
  });

  return object.companion;
};
