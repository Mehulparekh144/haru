import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { WeeklyCalendar } from "./weekly-calendar";
import { Header } from "./header";
import { Stats } from "./stats";
import { BottomNavigation } from "../../bottom-navigation";
import { CheckInDialog } from "./check-in-dialog";

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

  return (
    <div className="relative h-full w-full space-y-6">
      <Header habit={habit} />
      <WeeklyCalendar habitCheckins={habit.habitCheckins} />
      <Stats habit={habit} />
      <BottomNavigation className="rounded-xl">
        <CheckInDialog />
      </BottomNavigation>
    </div>
  );
}
