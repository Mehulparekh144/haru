"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export const Preferences = () => {
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    const permission = Notification.permission;

    if (permission === "granted") {
      setNotifications(true);
    }
  }, [notifications]);

  const handleNotifications = async () => {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      setNotifications(true);
    } else {
      toast.error("Notifcations are not allowed on this browser");
      setNotifications(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-xl font-semibold">Preferences</h1>
        <p className="text-muted-foreground text-sm">Manage your preferences</p>
      </div>

      <Card className="space-y-1.5">
        <CardContent>
          <h2 className="text-lg font-semibold">Theme</h2>
          <div className="grid grid-cols-3 gap-4">
            <ThemeCard title="Light" currentTheme="light" />
            <ThemeCard title="Dark" currentTheme="dark" />
            <ThemeCard title="System" currentTheme="system" />
          </div>
        </CardContent>
      </Card>

      <Card className="space-y-1.5">
        <CardContent>
          <h2 className="text-lg font-semibold">Notifications</h2>
          <div className="flex items-center justify-between space-y-1.5">
            <Label className="text-sm font-medium">
              Push Notifications from Browser
            </Label>
            <Switch
              checked={notifications}
              onCheckedChange={handleNotifications}
            />
          </div>
          <p className="text-muted-foreground text-sm">
            To Disable Notifications, you can turn off the browser notifications
            in your browser settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export const ThemeCard = ({
  title,
  currentTheme,
}: {
  title: string;
  currentTheme: string;
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="h-full w-full rounded-lg p-2"
      onClick={() => setTheme(currentTheme)}
    >
      <div
        className={cn(
          "bg-primary/50 ring-ring/70 group aspect-square h-full w-full rounded-xl p-1.5 shadow-lg ring backdrop-blur-3xl transition-all duration-300 hover:scale-105",
          theme === currentTheme && "ring-ring ring-2 ring-offset-2",
        )}
      >
        <Image
          className="h-full w-full cursor-pointer rounded-2xl object-cover object-left"
          src={`/images/${currentTheme}.png`}
          alt={title}
          width={500}
          height={500}
        />
      </div>
      <div className="mt-2 text-center text-sm font-medium">{title}</div>
    </div>
  );
};
