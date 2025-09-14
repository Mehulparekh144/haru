"use client";

import { Button } from "@/components/ui/button";
import { AnimatedContainer } from "@/components/animated-container";
import { Calendar1, Plus } from "lucide-react";
import Link from "next/link";

export const BottomNavigation = () => {
  return (
    <AnimatedContainer
      fadeDelay={0.7}
      className="bg-secondary/50 fixed bottom-4 left-1/2 flex w-max -translate-x-1/2 gap-2 rounded-xl p-2 backdrop-blur-3xl"
    >
      <Button className="group" variant={"default"} asChild>
        <Link href="/dashboard/create">
          Create Habit
          <Plus className="transition-transform duration-300 group-hover:scale-110" />
        </Link>
      </Button>
    </AnimatedContainer>
  );
};
