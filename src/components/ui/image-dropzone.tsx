"use client";

import * as React from "react";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Camera, Image as ImageIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ImageDropzoneProps {
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  selectedFile?: File | null;
  previewUrl?: string | null;
  className?: string;
  disabled?: boolean;
  accept?: Record<string, string[]>;
  maxSize?: number;
  placeholder?: string;
  showPreview?: boolean;
}

export function ImageDropzone({
  onFileSelect,
  onFileRemove,
  selectedFile,
  previewUrl,
  className,
  disabled = false,
  accept = { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
  maxSize = 5 * 1024 * 1024, // 5MB
  placeholder = "Drag & drop an image here, or click to select",
  showPreview = true,
}: ImageDropzoneProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept,
      maxSize,
      multiple: false,
      disabled,
    });

  const handlePaste = useCallback(
    (event: React.ClipboardEvent) => {
      const items = event.clipboardData.items;
      for (const item of items) {
        if (item.type.includes("image")) {
          const blob = item.getAsFile();
          if (blob) {
            onFileSelect(blob);
          }
          break;
        }
      }
    },
    [onFileSelect],
  );

  const handleCameraCapture = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect],
  );

  const handleRemoveFile = useCallback(() => {
    if (onFileRemove) {
      onFileRemove();
    }
  }, [onFileRemove]);

  const handleCameraClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    cameraInputRef.current?.click();
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("w-full", className)}>
      <Card
        className={cn(
          "transition-all duration-200 hover:shadow-md",
          isDragActive && !isDragReject && "border-primary bg-primary/5",
          isDragReject && "border-destructive bg-destructive/5",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <CardContent className="p-6">
          {selectedFile && showPreview ? (
            <div className="space-y-4">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl ?? URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="mx-auto max-h-48 w-full rounded-lg object-cover"
                />
                {onFileRemove && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={handleRemoveFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-muted-foreground text-xs">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Dropzone area */}
              <div
                {...getRootProps()}
                className={cn(
                  "border-muted-foreground/25 cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors",
                  isDragActive &&
                    !isDragReject &&
                    "border-primary bg-primary/5",
                  isDragReject && "border-destructive bg-destructive/5",
                  disabled && "cursor-not-allowed opacity-50",
                )}
                onPaste={handlePaste}
              >
                <input {...getInputProps()} />

                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-muted rounded-full p-4">
                    {isDragActive ? (
                      <Upload className="text-primary h-8 w-8" />
                    ) : (
                      <ImageIcon className="text-muted-foreground h-8 w-8" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      {isDragActive
                        ? "Drop the image here"
                        : isDragReject
                          ? "File type not supported"
                          : placeholder}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Supports PNG, JPG, JPEG, GIF, WebP up to{" "}
                      {formatFileSize(maxSize)}
                    </p>
                  </div>

                  <p className="text-muted-foreground text-xs">
                    Or paste an image from your clipboard
                  </p>
                </div>
              </div>

              {/* Action buttons outside dropzone */}
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  disabled={disabled}
                  onClick={handleCameraClick}
                  className="flex-1 md:hidden"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onFileSelect(file);
          }
        }}
        disabled={disabled}
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleCameraCapture}
        disabled={disabled}
      />
    </div>
  );
}
