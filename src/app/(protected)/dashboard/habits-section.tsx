"use client";

import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, getHabitStyles } from "@/lib/utils";
import { api } from "@/trpc/react";
import type { Habit } from "@prisma/client";
import { HabitDuration } from "@prisma/client";
import { useRouter } from "next/navigation";

export const HabitsSection = () => {
  const router = useRouter();
  const { data, isLoading, isError, error } =
    api.habit.getUserHabits.useQuery();

  if (isError) {
    console.error(error);
  }

  return (
    <section className="mt-2">
      <h1 className="text-secondary-foreground text-lg font-bold">
        Your Current Habits
      </h1>
      <ScrollArea className="mt-4 w-full">
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
                  getHabitStyles(habit.agent),
                  "h-full w-full rounded-xl leading-none shadow-md backdrop-blur-3xl",
                )}
              >
                <CardHeader className="flex h-max items-start justify-between">
                  <CardTitle
                    className="line-clamp-2 text-base"
                    title={habit.name}
                  >
                    {habit.name}
                  </CardTitle>
                  <Avatar className="ring-primary size-10 ring-1">
                    <AvatarImage
                      src={`images/agents/${habit.agent.toLocaleLowerCase()}.png`}
                      alt={habit.agent}
                    />
                    <AvatarFallback>{habit.agent.charAt(0)}</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent className="h-full">
                  <HabitCardContent {...habit} />
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export const HabitCardContent = (habit: Habit) => {
  const getDurationInNumber = (duration: HabitDuration) => {
    switch (duration) {
      case HabitDuration.FOURTEEN:
        return 14;
      case HabitDuration.THIRTY:
        return 30;
      case HabitDuration.SIXTY:
        return 60;
      case HabitDuration.NINETY:
        return 90;
      default:
        return 0;
    }
  };

  const percentage =
    (habit.currentStreak / getDurationInNumber(habit.duration)) * 100;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center font-mono">
      <AnimatedCircularProgressBar
        label={`${habit.currentStreak} / ${getDurationInNumber(habit.duration)} days`}
        value={percentage}
        max={100}
        className="my-4 text-sm"
        gaugePrimaryColor="var(--primary)"
        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
      />
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
