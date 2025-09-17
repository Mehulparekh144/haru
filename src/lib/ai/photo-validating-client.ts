import type { Habit } from "@prisma/client";
import { generateObject } from "ai";
import z from "zod";
import { openrouter } from "./llms";

const photoValidationSchema = z.object({
  is_valid: z.boolean(),
  reason: z
    .string()
    .describe(
      "Required when is_valid is false, explaining why the photo doesn't meet validation criteria",
    ),
});

export const validatePhoto = async (
  photoUrl: string,
  habit: Habit,
): Promise<z.infer<typeof photoValidationSchema>> => {
  const { object } = await generateObject({
    model: openrouter.chat("meta-llama/llama-4-maverick"),
    schema: photoValidationSchema,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: photoUrl,
          },
          {
            type: "text",
            text: `Analyze this photo for the habit "${habit.name}", description "${habit.description}" and determine if it's a valid check-in.

VALIDATION CRITERIA:

For GYM and SELF_IMPROVEMENT habits:
- Accept camera photos of gym equipment, workout sessions, or physical activities
- Accept screenshots showing fitness data (calories burned, distance run, workout duration, heart rate, etc.)
- Accept photos of completed workouts, exercise equipment, or fitness tracking apps
- Accept before/after photos, progress photos, or workout selfies
- Reject generic stock photos, unrelated images, or photos that don't show actual activity

For CODING habits:
- Accept screenshots of coding platforms (VS Code, GitHub, LeetCode, HackerRank, etc.)
- Accept photos of code on screen, terminal output, or development environments
- Accept screenshots of completed coding challenges, commits, or pull requests
- Accept photos of coding books, tutorials, or learning materials being used
- Reject generic code snippets, stock photos, or unrelated screenshots

For other habits:
- Accept photos that clearly show the habit being performed
- Accept evidence of progress, completion, or engagement with the habit
- Reject unrelated images, stock photos, or photos that don't demonstrate the habit

GENERAL REJECTION CRITERIA:
- Reject AI-generated images, synthetic photos, or computer-generated content
- Reject stock photos, promotional images, or generic internet images
- Reject photos that appear to be screenshots of other people's content
- Reject images that don't show personal engagement with the habit
- Reject photos that are clearly staged or fake

Return true if the photo provides valid evidence of the habit being performed, false otherwise.

If returning false, provide a clear reason explaining why the photo doesn't meet the validation criteria for this specific habit.`,
          },
        ],
      },
    ],
  });
  return object;
};
