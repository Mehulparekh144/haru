import type { CreateHabitFormValues } from "@/app/(protected)/dashboard/create/validations";
import type { HabitCategory } from "@prisma/client";
import { generateObject } from "ai";
import z from "zod";
import { openrouter } from "./llms";

export const generateCategory = async (
  habit: CreateHabitFormValues,
): Promise<HabitCategory> => {
  const { object } = await generateObject({
    model: openrouter.chat("meta-llama/llama-3.3-70b-instruct:free"),
    schema: z.object({
      category: z.enum(["CODING", "GYM", "SELF_IMPROVEMENT"]),
    }),
    prompt: `
      You are classifying a new habit into one of three categories. 
      Do NOT make creative guesses — output only the most fitting match.

      Habit: "${habit.name}"
      Description: "${habit.description}"

      Rules:
      - CODING = for coding, deep focus, problem solving.  
      - GYM = for gym, workout, movement, building strength.  
      - SELF_IMPROVEMENT = for any small habits that are not related to coding or gym.  

      If the text clearly mentions coding/programming → choose CODING.  
      If it clearly mentions gym/exercise/walking/running → choose GYM.  
      If it clearly mentions reading/improving/self-improvement → choose SELF_IMPROVEMENT.  
      If ambiguous → choose the closest fit conservatively. 
    `,
  });

  return object.category;
};
