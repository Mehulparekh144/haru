"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { TrendingUpIcon, UserIcon } from "lucide-react";

export const Profile = () => {
  const { data: session } = useSession();

  const { data: userStats, isLoading: isUserStatsLoading } =
    api.habit.getUserStats.useQuery(undefined, {
      enabled: !!session?.user,
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-xl font-semibold">Profile</h1>
        {!session?.user ? (
          <Skeleton className="mt-2 h-4 w-64" />
        ) : (
          <p className="text-muted-foreground text-sm">
            Manage your account information and view your progress
          </p>
        )}
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="size-5" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!session?.user ? (
            <div className="space-y-4">
              {/* Account Info Skeleton */}
              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Name</Label>
                  <Input value={session?.user.name ?? ""} readOnly />
                </div>
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input value={session?.user.email ?? ""} readOnly />
                </div>
              </div>

              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Member Since</Label>
                  <Input
                    value={
                      session?.user.createdAt
                        ? format(new Date(session.user.createdAt), "PPP")
                        : "Unknown"
                    }
                    readOnly
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Timezone</Label>
                  <Input
                    value={Intl.DateTimeFormat().resolvedOptions().timeZone}
                    readOnly
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUpIcon className="size-5" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isUserStatsLoading ? (
            <div className="space-y-4">
              {/* Statistics Grid Skeleton */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="space-y-1 text-center">
                    <Skeleton className="mx-auto h-8 w-12" />
                    <Skeleton className="mx-auto h-4 w-16" />
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Success Rate Skeleton */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-12" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            </div>
          ) : userStats ? (
            <>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="space-y-1 text-center">
                  <div className="text-primary text-2xl font-bold">
                    {userStats?.totalHabits ?? 0}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Total Habits
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {userStats?.activeHabits ?? 0}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Active Habits
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {userStats?.totalCheckins ?? 0}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Total Check-ins
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {userStats?.longestStreak ?? 0}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Longest Streak
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Success Rate</span>
                  <Badge variant="secondary">
                    {userStats?.successRate ?? 0}%
                  </Badge>
                </div>
                <div className="bg-muted h-2 w-full rounded-full">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${userStats?.successRate ?? 0}%` }}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No statistics available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
