"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DialogDescription } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import {
  AlertCircleIcon,
  CalendarArrowUp,
  CheckCircleIcon,
} from "lucide-react";
import { ImageDropzone } from "@/components/ui/image-dropzone";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { api } from "@/trpc/react";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { HabitCheckin } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  {
    title: "Upload Photo",
  },
  {
    title: "Validate Photo",
  },
  { title: "Check In" },
];

export const CheckInDialog = ({
  habitId,
  todayCheckin,
}: {
  habitId: string;
  todayCheckin: HabitCheckin | undefined;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!open) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setSelectedFile(null);
      setPreviewUrl(null);
      setCurrentStep(1);
    }
  }, [open, previewUrl]);

  const queryClient = useQueryClient();

  const {
    data: results,
    mutate: validateHabitPhoto,
    isPending: isValidateHabitPhotoPending,
    error: isValidateHabitPhotoError,
  } = api.habit.validateHabitPhoto.useMutation();

  const { mutate: checkInHabit } = api.habit.checkIn.useMutation({
    retry: true,
    onError: (error) => {
      toast.error("Failed to check in habit", {
        description: "Please try again.",
      });
      console.error(error);
      setCurrentStep(1);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["habit.getUserHabit", { id: habitId }],
      });
    },
  });

  const {
    mutate: uploadPhoto,
    isPending: isUploadPhotoPending,
    error: isUploadPhotoError,
  } = useMutation({
    mutationFn: async () => {
      if (!selectedFile) throw new Error("No file selected");
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("habitId", habitId);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload photo");
      }
      return (await response.json()) as { url: string };
    },
    onError: () => {
      toast.error("Failed to upload photo", {
        description: "Please try again.",
      });
    },
    onSuccess: (data) => {
      validateHabitPhoto(
        {
          id: habitId,
          photoURL: data.url,
        },
        {
          onSuccess: (data) => {
            if (data.is_valid) {
              checkInHabit({
                id: habitId,
                photoURL: data.photoURL,
                description,
              });
              setCurrentStep(currentStep + 1);
            }
          },
        },
      );
    },
  });

  const handleStepButtonClick = async () => {
    if (currentStep > 3) return;

    if (currentStep === 1) {
      if (!selectedFile) {
        return;
      }
      uploadPhoto();
    } else if (currentStep === 2) {
      if (
        isValidateHabitPhotoError ||
        isUploadPhotoError ||
        !results?.is_valid
      ) {
        setCurrentStep(1);
        return;
      }
    } else if (currentStep === 3) {
      setOpen(false);
    }

    setCurrentStep(currentStep + 1);
  };

  const stepButtonLabels = useMemo(() => {
    if (currentStep === 1) return "Next";
    if (currentStep === 2) {
      if (isValidateHabitPhotoPending || isUploadPhotoPending)
        return "Validating...";
      if (isValidateHabitPhotoError || isUploadPhotoError || !results?.is_valid)
        return "Retry";
      return "Complete";
    }
    if (currentStep === 3) {
      return "Complete";
    }
  }, [
    currentStep,
    isValidateHabitPhotoPending,
    isUploadPhotoPending,
    isUploadPhotoError,
    isValidateHabitPhotoError,
    results?.is_valid,
  ]);

  console.log(todayCheckin);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="group"
          size={"lg"}
          variant={"default"}
          title={
            todayCheckin?.status !== "PENDING"
              ? "You have already checked in today"
              : "Check In"
          }
          disabled={todayCheckin?.status !== "PENDING"}
        >
          {todayCheckin?.status !== "PENDING" ? "Check In Done" : "Check In"}
          <CalendarArrowUp className="size-4 transition-transform duration-300 group-hover:scale-110" />
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Check In {currentStep}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground m-0">
            {format(new Date(), "PPP")}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Stepper
          value={currentStep}
          onValueChange={setCurrentStep}
          className="space-y-8"
        >
          <StepperNav className="mb-5 gap-3.5">
            {steps.map((step, index) => {
              return (
                <StepperItem
                  key={index}
                  step={index + 1}
                  className="relative flex-1 items-start"
                >
                  <StepperTrigger
                    disabled={index + 1 > currentStep}
                    className="flex grow flex-col items-start justify-center gap-3.5"
                  >
                    <StepperIndicator className="bg-border data-[state=active]:bg-primary h-1 w-full rounded-full"></StepperIndicator>
                    <div className="flex flex-col items-start gap-1">
                      <StepperTitle className="group-data-[state=inactive]/step:text-muted-foreground text-start font-semibold">
                        {step.title}
                      </StepperTitle>
                    </div>
                  </StepperTrigger>
                </StepperItem>
              );
            })}
          </StepperNav>

          <StepperPanel className="text-sm">
            <StepperContent
              value={1}
              className="flex items-center justify-center"
            >
              <CheckInForm
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl}
                description={description}
                setDescription={setDescription}
              />
            </StepperContent>
            <StepperContent
              value={2}
              className="flex items-center justify-center"
            >
              <ValidatePhotoForm
                results={results}
                isValidateHabitPhotoPending={
                  isValidateHabitPhotoPending || isUploadPhotoPending
                }
                isValidateHabitPhotoError={
                  isUploadPhotoError
                    ? "Failed to upload photo"
                    : (isValidateHabitPhotoError?.message ?? null)
                }
              />
            </StepperContent>
            <StepperContent
              value={3}
              className="flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-4 p-8">
                <div className="text-center">
                  <h3 className="text-primary text-lg font-semibold">
                    Check-in Successful!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Your habit has been recorded for today. Good going!
                  </p>
                </div>
              </div>
            </StepperContent>
          </StepperPanel>
        </Stepper>

        <DialogFooter>
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={
              (!selectedFile && currentStep === 1) ||
              (currentStep === 2 &&
                (isValidateHabitPhotoPending || isUploadPhotoPending))
            }
            onClick={handleStepButtonClick}
          >
            {stepButtonLabels}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

function CheckInForm({
  selectedFile,
  setSelectedFile,
  previewUrl,
  setPreviewUrl,
  description,
  setDescription,
}: {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
  description: string;
  setDescription: (description: string) => void;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <Label className="text-muted-foreground text-base font-medium">
        Upload/Capture a photo of your check-in
      </Label>
      <p className="text-muted-foreground text-sm">
        Remember, you are not cheating the AI, you are cheating yourself.
      </p>
      {selectedFile && (
        <p className="text-muted-foreground text-sm">
          Selected: {selectedFile.name} (
          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
        </p>
      )}
      <ImageDropzone
        onFileSelect={(file) => {
          setSelectedFile(file);
          setPreviewUrl(URL.createObjectURL(file));
        }}
        onFileRemove={() => {
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
          }
          setSelectedFile(null);
          setPreviewUrl(null);
        }}
        selectedFile={selectedFile}
        previewUrl={previewUrl}
      />

      <Textarea
        placeholder="Describe your check-in"
        className="mt-4 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
}

function ValidatePhotoForm({
  isValidateHabitPhotoPending,
  isValidateHabitPhotoError,
  results,
}: {
  isValidateHabitPhotoPending: boolean;
  isValidateHabitPhotoError: string | null;
  results:
    | {
        is_valid: boolean;
        reason: string;
      }
    | undefined;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4 p-8">
      <div className="w-full text-center">
        <h3 className="text-lg font-semibold">Validating your check-in</h3>
        {isValidateHabitPhotoPending ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-muted-foreground text-sm">
              Please wait while we process your image...
            </p>
            <Spinner className="text-foreground my-3 w-20" />
          </div>
        ) : isValidateHabitPhotoError ? (
          <Alert className="my-3 w-full" variant="destructive">
            <AlertCircleIcon className="text-destructive size-4" />
            <AlertTitle>We couldn&apos;t validate your check-in</AlertTitle>
            <AlertDescription className="flex items-center justify-center">
              {isValidateHabitPhotoError}
            </AlertDescription>
          </Alert>
        ) : results?.is_valid ? (
          <Alert className="my-3 w-full" variant="default">
            <CheckCircleIcon className="size-4" />
            <AlertTitle>Your check-in has been validated</AlertTitle>
          </Alert>
        ) : (
          <Alert className="my-3 w-full" variant="destructive">
            <AlertCircleIcon className="text-destructive size-4" />
            <AlertTitle>Your check-in has not been validated</AlertTitle>
            <AlertDescription className="flex items-center justify-center">
              {results?.reason}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
