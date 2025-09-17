"use client";

import { useState, useEffect } from "react";
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
import { CalendarArrowUp } from "lucide-react";
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

const steps = [
  { title: "Upload Photo" },
  { title: "Validate Photo" },
  { title: "Check In" },
];

export const CheckInDialog = () => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);

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
      setOpen(false);
    }
  }, [open, previewUrl]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="group"
          size={"lg"}
          variant={"default"}
          title="Check In"
        >
          Check In{" "}
          <CalendarArrowUp className="size-4 transition-transform duration-300 group-hover:scale-110" />
        </Button>
      </DialogTrigger>
      <DialogContent>
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
              />
            </StepperContent>
            <StepperContent
              value={2}
              className="flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-4 p-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">
                    Validating your check-in
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Please wait while we process your image...
                  </p>
                </div>
              </div>
            </StepperContent>
            <StepperContent
              value={3}
              className="flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-4 p-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-green-600">
                    Check-in Successful!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Your habit has been recorded for today.
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
            disabled={!selectedFile && currentStep < 3}
            onClick={() => {
              if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
              }
            }}
          >
            {currentStep === 1
              ? "Next"
              : currentStep === 2
                ? "Complete"
                : "Check In"}
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
}: {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <Label className="text-muted-foreground text-base font-medium">
        Upload/Capture a photo of your check-in
      </Label>
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
    </div>
  );
}
