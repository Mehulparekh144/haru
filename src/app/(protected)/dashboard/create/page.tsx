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
import { capitalize } from "@/lib/utils";
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
import type { HabitAgent } from "@prisma/client";
import { toast } from "sonner";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function CreateHabitPage() {
  const form = useForm<CreateHabitFormValues>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: {
      name: "",
      description: "",
      duration: "30",
      frequency: "DAILY",
      startDate: new Date(),
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [companion, setCompanion] = useState<"AURI" | "KIRO" | "SANA" | null>(
    null,
  );

  const { mutate: createHabit, isPending } = api.habit.create.useMutation();

  const onSubmit = async (data: CreateHabitFormValues) => {
    createHabit(data, {
      onSuccess: (res) => {
        setShowModal(true);
        setCompanion(res.agent);
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
                  Please provide a description for your habit. This will help
                  your companion better understand your habit and help you
                  achieve your goals.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                      <SelectTrigger>
                        <SelectValue>
                          {field.value
                            ? `${field.value} days`
                            : "Select Duration"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
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
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue>
                          {field.value
                            ? `${capitalize(field.value)}`
                            : "Select Frequency"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {(["DAILY", "WEEKLY", "BIWEEKLY"] as const).map(
                          (frequency) => (
                            <SelectItem key={frequency} value={frequency}>
                              {capitalize(frequency)}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={`${new Date().toLocaleDateString()}`}
                    type="date"
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : typeof field.value === "string"
                          ? field.value
                          : ""
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value ? new Date(value) : undefined);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton loading={isPending} type="submit">
            Create Habit
          </LoadingButton>
        </form>
      </Form>
      {companion && (
        <CreateHabitSuccessModal
          open={showModal}
          onOpenChange={setShowModal}
          companion={companion}
        />
      )}
    </div>
  );
}

// interface AgentCardProps {
//   agent: "AURI" | "KIRO" | "SANA";
//   description: string;
//   isSelected: boolean;
//   onSelect: (agent: "AURI" | "KIRO" | "SANA") => void;
// }

// const AgentCard = ({
//   agent,
//   description,
//   isSelected,
//   onSelect,
// }: AgentCardProps) => {
//   return (
//     <motion.div
//       onClick={() => onSelect(agent)}
//       whileHover={{ y: -2 }}
//       transition={{ type: "spring", stiffness: 280, damping: 20, mass: 0.6 }}
//       className="group relative cursor-pointer"
//     >
//       {/* Selected state glow - always visible when selected */}
//       {isSelected && (
//         <div className="from-primary/60 via-primary/30 pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br to-transparent blur-2xl" />
//       )}

//       {/* Card container */}
//       <div
//         className={`relative aspect-square overflow-hidden rounded-lg ring-1 backdrop-blur-sm transition-all duration-500 group-hover:rounded-xl ${
//           isSelected
//             ? "ring-primary/60 bg-primary/10 shadow-primary/20 shadow-lg"
//             : "ring-border/50 bg-secondary/40"
//         }`}
//       >
//         {/* Image */}
//         <Image
//           src={`/images/agents/${agent.toLowerCase()}.png`}
//           alt={agent}
//           width={300}
//           height={300}
//           className={`h-full w-full object-cover transition-all duration-700 ease-out ${
//             isSelected ? "scale-105 brightness-110" : "group-hover:scale-105"
//           }`}
//         />

//         {/* Selected state overlay */}
//         {isSelected && (
//           <div className="bg-primary/20 absolute inset-0 rounded-lg backdrop-blur-sm" />
//         )}

//         {/* Translucent glass overlay - only on hover when not selected */}
//         {!isSelected && (
//           <div className="backdrop-blur-0 absolute inset-0 rounded-lg bg-black/0 opacity-0 transition-all duration-500 group-hover:bg-black/35 group-hover:opacity-100 group-hover:backdrop-blur-sm" />
//         )}

//         {/* Details - always visible when selected, hover when not selected - hidden on mobile */}
//         <div
//           className={`pointer-events-none absolute inset-x-0 bottom-0 hidden p-3 text-white transition-all duration-500 md:block ${
//             isSelected
//               ? "translate-y-0 opacity-100"
//               : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
//           }`}
//         >
//           <div className="text-sm leading-tight font-semibold">
//             {capitalize(agent)}
//           </div>
//           <div className="text-xs text-white/80">{description}</div>
//         </div>

//         {/* Selected indicator */}
//         {isSelected && (
//           <div className="bg-primary text-primary-foreground absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full">
//             <CheckIcon className="size-4" />
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

const CreateHabitSuccessModal = ({
  open,
  onOpenChange,
  companion,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companion: HabitAgent;
}) => {
  const companionDescriptions = {
    AURI: "Auri is a calm, focused, and thoughtful companion. Best for coding, deep work, or creative problem solving.",
    KIRO: "Kiro is an energetic, supportive, and consistent companion. Great for gym, movement, or habits needing daily push.",
    SANA: "Sana is a gentle, wise, and patient companion. Perfect for study, reading, or slow, steady learning.",
  };

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
        <Separator className="my-1" />
        <div className="flex flex-col items-center justify-center">
          <p className="text-foreground text-center text-base font-bold">
            Your companion is {capitalize(companion)}.
          </p>
          <p className="text-muted-foreground text-center text-sm">
            {companionDescriptions[companion]}
          </p>
          <Image
            src={`/images/agents/${companion.toLowerCase()}.png`}
            alt={companion}
            width={200}
            height={200}
            className="mx-auto mt-4 rounded-lg object-cover"
          />
        </div>

        <DialogFooter>
          <Button variant={"secondary"} asChild>
            <Link href="/dashboard">Continue</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
