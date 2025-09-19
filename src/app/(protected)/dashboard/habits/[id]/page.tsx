import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { WeeklyCalendar } from "./weekly-calendar";
import { Header } from "./header";
import { Stats } from "./stats";
import { BottomNavigation } from "../../bottom-navigation";
import { CheckInDialog } from "./check-in-dialog";
import { DateTime } from "luxon";

export default async function HabitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const habit = await api.habit.getUserHabit({ id });

  if (!habit) {
    redirect("/not-found");
  }

  const todayCheckin = habit.habitCheckins.find((checkin) =>
    DateTime.fromJSDate(checkin.timestamp).hasSame(DateTime.now(), "day"),
  );

  return (
    <div className="relative h-full w-full space-y-6">
      <Header habit={habit} />
      <WeeklyCalendar habitCheckins={habit.habitCheckins} />
      <Stats habit={habit} />
      <BottomNavigation className="rounded-xl">
        <CheckInDialog habitId={id} todayCheckin={todayCheckin} />
      </BottomNavigation>
    </div>
  );
}
