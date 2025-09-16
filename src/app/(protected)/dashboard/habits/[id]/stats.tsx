import { Card, CardContent } from "@/components/ui/card";
import type { Habit, HabitCheckin } from "@prisma/client";
import { HabitTotalDoneProgress } from "../habit-total-done-progress";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const Stats = ({
  habit,
}: {
  habit: Habit & { habitCheckins: HabitCheckin[] };
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} className="mb-4 md:hidden" size={"sm"}>
              <BarChart3 className="size-4" />
              View More Stats
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>More Stats</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 md:grid-cols-2">
              <StreakCard streak={habit.currentStreak} label="Current Streak" />
              <StreakCard streak={habit.longestStreak} label="Longest Streak" />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="flex aspect-square w-full items-center justify-center p-0">
          <CardContent className="flex items-center justify-center">
            <HabitTotalDoneProgress habit={habit} />
          </CardContent>
        </Card>
        <StreakCard
          streak={habit.currentStreak}
          label="Current Streak"
          className="hidden md:flex"
        />
        <StreakCard
          streak={habit.longestStreak}
          label="Longest Streak"
          className="hidden md:flex"
        />
      </div>
    </div>
  );
};

const StreakCard = ({
  streak,
  label,
  className,
}: {
  streak: number;
  label: string;
  className?: string;
}) => {
  return (
    <Card
      className={cn(
        "bg-primary/5 border-primary/20 flex aspect-square w-full items-center justify-center",
        className,
      )}
    >
      <CardContent className="p-6 text-center">
        <div className="text-primary mb-1 font-medium">{label}</div>
        <div className="text-primary text-5xl font-bold">{streak}</div>
      </CardContent>
    </Card>
  );
};
