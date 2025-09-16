import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, getThisWeekDates } from "@/lib/utils";
import type { HabitCheckin, HabitCheckinStatus } from "@prisma/client";
import { CircleCheck, CircleX, Clock } from "lucide-react";
import { DateTime } from "luxon";

export const WeeklyCalendar = ({
  habitCheckins,
}: {
  habitCheckins: HabitCheckin[];
}) => {
  const { weekDates } = getThisWeekDates();

  function getHabitCheckinStyles(habitCheckin: HabitCheckinStatus) {
    switch (habitCheckin) {
      case "PENDING":
        return {
          className: "bg-secondary",
          icon: <Clock className="text-secondary-foreground/50 size-full" />,
        };
      case "COMPLETED":
        return {
          className: "bg-primary",
          icon: (
            <CircleCheck className="text-primary-foreground/50 size-full" />
          ),
        };
      case "SKIPPED":
        return {
          className: "bg-destructive",
          icon: (
            <CircleX className="text-destructive-foreground/50 size-full" />
          ),
        };
    }
  }

  return (
    <Card>
      <ScrollArea>
        <CardContent className="flex w-full items-center justify-center gap-4">
          {weekDates.map((date) => {
            const habitCheckin = habitCheckins?.find(
              (checkin) =>
                DateTime.fromJSDate(checkin.timestamp).toISODate() ===
                date.date,
            );
            return (
              <Tooltip key={date.date}>
                <TooltipTrigger asChild>
                  <div className="flex w-full flex-col items-center justify-center gap-2">
                    <div
                      className={cn(
                        "flex aspect-square w-full items-center justify-center rounded-md p-4",

                        getHabitCheckinStyles(habitCheckin?.status ?? "PENDING")
                          .className,
                      )}
                    >
                      {
                        getHabitCheckinStyles(habitCheckin?.status ?? "PENDING")
                          .icon
                      }
                    </div>
                    <span className="font-mono text-sm font-bold">
                      {date.day.slice(0, 3)}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <span>{date.date}</span>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </CardContent>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  );
};
