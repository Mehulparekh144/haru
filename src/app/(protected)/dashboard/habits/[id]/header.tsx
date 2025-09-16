import type { Habit } from "@prisma/client";

export const Header = ({ habit }: { habit: Habit }) => {
  return (
    <div className="mt-4 flex items-center gap-4">
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
        <span className="text-muted-foreground text-sm">
          {habit.habitCategory}
        </span>
      </div>
    </div>
  );
};
