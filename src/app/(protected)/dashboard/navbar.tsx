import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { LogOut, Plus, User2 } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const Navbar = () => {
  return (
    <>
      <nav className="border-offset flex items-center justify-between pt-3">
        <h1 className="text-2xl font-bold">Haru</h1>
        <UserDropdown />
      </nav>
      <Separator className="my-2" />
    </>
  );
};

const UserDropdown = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const handleLogout = async () => {
    "use server";
    await auth.api.signOut({
      headers: await headers(),
    });
    redirect("/get-started");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={session.user.image ?? ""}
            alt={session.user.name ?? ""}
          />
          <AvatarFallback>
            {session.user.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-col gap-1 text-sm font-medium">
          {session.user.name}
          <span className="text-muted-foreground text-xs">
            {session.user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User2 className="mr-2" />
          Profile
        </DropdownMenuItem>
        <form action={handleLogout}>
          <DropdownMenuItem asChild>
            <button type="submit" className="flex w-full items-center">
              <LogOut className="mr-2" />
              Logout
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
