"use client";

import * as React from "react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileDropzoneProps extends Omit<DropzoneOptions, "onDrop"> {
  onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
  className?: string;
  acceptLabel?: string;
}

export function FileDropzone({
  onDrop,
  className,
  acceptLabel = "PDF files",
  ...props
}: FileDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      ...props,
    });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/20 px-6 py-14 text-center transition-all hover:bg-muted/50",
        isDragActive && "border-primary bg-primary/5",
        isDragReject && "border-destructive bg-destructive/5",
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4 text-muted-foreground">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-sm group-hover:scale-105 transition-transform">
          <UploadCloud className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            <span className="text-primary hover:underline">Click to upload</span>{" "}
            or drag and drop
          </p>
          <p className="text-xs">Supports {acceptLabel}</p>
        </div>
      </div>
    </div>
  );
}
