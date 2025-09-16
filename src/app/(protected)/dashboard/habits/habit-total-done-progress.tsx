import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { getDurationInNumber } from "@/lib/utils";
import type { Habit, HabitCheckin } from "@prisma/client";

export const HabitTotalDoneProgress = ({
  habit,
}: {
  habit: Habit & { habitCheckins: HabitCheckin[] };
}) => {
  const totalDays = getDurationInNumber(habit.duration);
  const doneDays = habit.habitCheckins.reduce((acc, checkin) => {
    acc += checkin.status === "COMPLETED" ? 1 : 0;
    return acc;
  }, 0);

  const percentage = (doneDays / totalDays) * 100;
  return (
    <AnimatedCircularProgressBar
      label={`${doneDays} / ${totalDays} days`}
      value={percentage}
      max={100}
      gaugePrimaryColor="var(--primary)"
      gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
    />
  );
};
