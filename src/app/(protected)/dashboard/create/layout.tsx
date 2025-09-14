import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Habit | Bloom With Haru",
  description:
    "Create a new habit and get matched with your perfect AI companion",
};

export default function CreateHabitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
