import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { WeeklyCalendar } from "./weekly-calendar";
import { Header } from "./header";
import { Stats } from "./stats";
import { BottomNavigation } from "../../bottom-navigation";
import { Button } from "@/components/ui/button";
import { CalendarArrowUp } from "lucide-react";

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
        <Button
          className="group"
          size={"lg"}
          variant={"default"}
          title="Check In"
        >
          Check In <CalendarArrowUp className="size-4" />
        </Button>
      </BottomNavigation>
    </div>
  );
}
