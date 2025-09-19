import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { LogOut, Settings } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <>
      <nav className="border-offset flex items-center justify-between pt-3">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Haru" width={32} height={32} />
            <h1 className="text-2xl font-bold">Haru</h1>
          </div>
        </Link>
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
    redirect("/get-started");
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
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings" className="flex w-full items-center">
            <Settings className="mr-2" />
            Settings
          </Link>
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
