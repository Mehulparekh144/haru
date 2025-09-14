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
    model: openrouter.chat("meta-llama/llama-3.3-70b-instruct:free"),
    schema: z.object({
      companion: z.enum(["AURI", "KIRO", "SANA"]),
    }),
    prompt: `
      You are classifying a new habit into one of three companions. 
      Do NOT make creative guesses — output only the most fitting match.

      Habit: "${habit.name}"
      Description: "${habit.description}"

      Rules:
      - Auri = for coding, deep focus, problem solving.  
      - Kiro = for gym, workout, movement, building strength.  
      - Sana = for study, reading, learning.  

      If the text clearly mentions coding/programming → choose AURI.  
      If it clearly mentions gym/exercise/walking/running → choose KIRO.  
      If it clearly mentions studying/reading/learning/exams → choose SANA.  
      If ambiguous → choose the closest fit conservatively. 
    `,
  });

  return object.companion;
};
