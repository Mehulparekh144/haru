// File to run any individual commands for Typescript

import { HabitDuration } from "@prisma/client";
import { validatePhoto } from "./ai/photo-validating-client";

console.log("Test your scripts here! 🚀");

const photo = await validatePhoto(
  "https://upoevdcxa3.ufs.sh/f/IN4OjmY4wMHB6iLqmzw9tEi8mJaFDce5vNKwx1PIrjA7bGkV",
  {
    name: "Gym",
    description: "Gym",
    id: "1",
    duration: HabitDuration.FOURTEEN,
    startDate: new Date(),
    timezone: "America/New_York",
    endDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    habitCategory: "GYM",
    userId: "",
    currentStreak: 0,
    longestStreak: 0,
  },
);

console.log(photo);
