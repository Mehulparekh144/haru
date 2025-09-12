import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Plus } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/get-started");
  }
  return (
    <div className="relative h-full w-full">
      Dashboard
      <Button
        className="group absolute bottom-4 left-1/2 -translate-x-1/2"
        variant={"default"}
        asChild
      >
        <Link href="/dashboard/create">
          Create Habit
          <Plus className="transition-transform duration-300 group-hover:scale-110" />
        </Link>
      </Button>
    </div>
  );
}
