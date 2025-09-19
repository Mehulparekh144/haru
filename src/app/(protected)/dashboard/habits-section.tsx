"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, getHabitStyles } from "@/lib/utils";
import { api } from "@/trpc/react";
import { type Habit, type HabitCheckin } from "@prisma/client";
import { useRouter } from "next/navigation";
import { HabitTotalDoneProgress } from "./habits/habit-total-done-progress";
import { Badge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";

export const HabitsSection = () => {
  const router = useRouter();
  const { data, isLoading, isError, error } =
    api.habit.getUserHabits.useQuery();

  if (isError) {
    console.error(error);
  }

  return (
    <section className="mt-2">
      <h1 className="text-secondary-foreground my-4 text-xl font-bold">
        Your Current Habits
      </h1>
      <ScrollArea className="w-full">
        <div className="flex w-max gap-3 pb-4">
          {isLoading ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <Card
                  key={`skeleton-${index}`}
                  className="bg-muted/20 h-full w-full rounded-xl leading-none shadow-md backdrop-blur-3xl"
                >
                  <CardHeader className="flex h-max items-start justify-between">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="size-10 rounded-full" />
                  </CardHeader>
                  <CardContent className="h-full">
                    <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
                      <div className="relative">
                        <Skeleton className="h-24 w-24 rounded-full" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Skeleton className="h-6 w-8" />
                        </div>
                      </div>
                      <div className="space-y-2 text-center">
                        <Skeleton className="mx-auto h-4 w-20" />
                        <Skeleton className="mx-auto h-3 w-16" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-3 w-28" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            data?.map((habit) => (
              <Card
                key={habit.id}
                onClick={() => {
                  router.push(`/dashboard/habits/${habit.id}`);
                }}
                className={cn(
                  getHabitStyles(habit.habitCategory),
                  "h-full w-full rounded-xl leading-none shadow-md backdrop-blur-3xl",
                )}
              >
                <CardHeader className="h-max">
                  <CardTitle
                    className="line-clamp-1 text-base"
                    title={habit.name}
                  >
                    {habit.name}
                  </CardTitle>
                  <Badge variant={"outline"}>{habit.habitCategory}</Badge>
                </CardHeader>
                <CardContent className="h-full">
                  <HabitCardContent {...habit} />
                </CardContent>
              </Card>
            ))
          )}
        </div>
        {data?.length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <p className="font-mono text-base">
              Let&apos;s get started! Create your first habit by clicking the
              button below.
            </p>
            <ArrowDown className="size-4 animate-bounce" />
          </div>
        )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export const HabitCardContent = (
  habit: Habit & { habitCheckins: HabitCheckin[] },
) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center font-mono">
      <div className="my-4">
        <HabitTotalDoneProgress habit={habit} />
      </div>
      <div className="items-start space-y-2">
        <p className="text-secondary-foreground text-xs">
          Current Streak of {habit.currentStreak} days
        </p>
        <p className="text-secondary-foreground text-xs">
          Longest Streak of {habit.longestStreak} days
        </p>
      </div>
    </div>
  );
};
