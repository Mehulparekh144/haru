"use server";

import { db } from "@/server/db";

export const getUserHabits = async (userId: string) => {
  const habits = await db.habit.findMany({
    where: {
      userId: userId,
    },
    include: {
      habitCheckins: true,
    },
  });

  return habits;
};
