import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, SettingsIcon, UserIcon } from "lucide-react";
import type { Metadata } from "next";
import { Profile } from "./profile";
import { Preferences } from "./preferences";
import Link from "next/link";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Settings | Bloom With Haru",
  description: "Manage your settings",
};

const columns = [
  {
    title: "Profile",
    key: "profile",
    content: <Profile />,
    icon: UserIcon,
  },
  {
    title: "Preferences",
    key: "preferences",
    content: <Preferences />,
    icon: SettingsIcon,
  },
];

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ column: string }>;
}) {
  const { column } = await searchParams;

  if (!column) {
    redirect("/dashboard/settings?column=profile");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeftIcon className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      <div className="grid h-full w-full grid-cols-4 gap-4">
        <div className="col-span-1 flex h-full flex-col gap-2">
          {columns.map((c) => (
            <Button
              key={c.key}
              variant={column === c.key ? "default" : "ghost"}
              className="flex w-full items-center justify-start gap-2"
              asChild
            >
              <Link href={`/dashboard/settings?column=${c.key}`}>
                <c.icon className="size-4" />
                {c.title}
              </Link>
            </Button>
          ))}
        </div>
        <div className="col-span-3">
          {columns.find((c) => c.key === column)?.content}
        </div>
      </div>
    </div>
  );
}

/*

Profile
Preferences ( Theme, Language, etc. )
Notification ( Push, etc. )
*/
