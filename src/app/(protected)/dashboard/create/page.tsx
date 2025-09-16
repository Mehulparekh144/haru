"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { type CreateHabitFormValues, createHabitSchema } from "./validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingButton } from "@/components/ui/loading-button";
import { api } from "@/trpc/react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { DateTime } from "luxon";
import DatePicker from "@/components/date-picker/date-picker";

export default function CreateHabitPage() {
  const form = useForm<CreateHabitFormValues>({
    resolver: zodResolver(createHabitSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      duration: "30",
      startDate: DateTime.now().plus({ days: 1 }).toJSDate(),
    },
  });

  const [showModal, setShowModal] = useState(false);

  const { mutate: createHabit, isPending } = api.habit.create.useMutation();

  const onSubmit = async (data: CreateHabitFormValues) => {
    createHabit(data, {
      onSuccess: () => {
        setShowModal(true);
      },
      onError: (error) => {
        toast.error("Something went wrong", {
          description:
            "It seems like there was an error creating your habit. Please try again.",
        });
        console.error(error);
      },
    });
  };

  return (
    <div className="mt-14 flex h-full w-full flex-col items-start justify-start">
      <h1 className="text-2xl font-bold">Create A New Habit</h1>
      <p className="text-muted-foreground font-mono text-sm">
        Reaching this page is itself a new milestone for you. Continue your
        journey to build a better you.
      </p>

      <Form {...form}>
        <form
          className="mt-6 w-full space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Habit Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Go to the GYM daily" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Habit Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="This habit is about..."
                    className="h-24"
                  />
                </FormControl>
                <FormDescription>
                  Be specific about what you want to achieve. Example:
                  &quot;Read 30 minutes daily&quot;
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 place-items-start gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {field.value
                            ? `${field.value} days`
                            : "Select Duration"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Research shows that it takes 21 days to form a habit.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DatePicker date={field.value} setDate={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <LoadingButton loading={isPending} type="submit">
            Create Habit
          </LoadingButton>
        </form>
      </Form>

      <CreateHabitSuccessModal open={showModal} onOpenChange={setShowModal} />
    </div>
  );
}

const CreateHabitSuccessModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You&apos;re Ready 🌱</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Congratulations! The first step is to initiate, and you have done it.
          Now, let&apos;s start building a better you.
        </DialogDescription>

        <DialogFooter>
          <Button variant={"secondary"} asChild>
            <Link href="/dashboard">Continue</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
