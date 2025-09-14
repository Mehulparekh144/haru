import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BottomNavigation } from "./bottom-navigation";
import { getUserHabits } from "./actions";
import { Suspense } from "react";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/get-started");
  }

  const habits = await getUserHabits(session.user.id);

  return (
    <div className="relative h-full w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <pre>{JSON.stringify(habits, null, 2)}</pre>
      </Suspense>

      <BottomNavigation />
    </div>
  );
}
