import { Badge } from "@/components/ui/badge";
import type { Habit } from "@prisma/client";
import { format } from "date-fns";

export const Header = ({ habit }: { habit: Habit }) => {
  return (
    <div className="mt-4 flex items-center gap-4">
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">{habit.name}</h1>
            {habit.description && (
              <p
                className="text-muted-foreground line-clamp-2 text-sm"
                title={habit.description}
              >
                {habit.description}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant={"outline"}>{habit.habitCategory}</Badge>
            <Badge>Start Date: {format(habit.startDate, "MMM d, yyyy")}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
