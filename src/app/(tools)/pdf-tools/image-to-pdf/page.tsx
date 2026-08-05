"use client";

import { useState } from "react";
import { FileDropzone } from "@/components/tools/file-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { downloadFile } from "@/lib/pdf";
import { ImageIcon, Loader2, Download, ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<Uint8Array | null>(null);
  const { toast } = useToast();

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
    setResult(null);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setResult(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setFiles((prev) => {
      const newFiles = [...prev];
      const temp = newFiles[index - 1];
      newFiles[index - 1] = newFiles[index];
      newFiles[index] = temp;
      return newFiles;
    });
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    setFiles((prev) => {
      const newFiles = [...prev];
      const temp = newFiles[index + 1];
      newFiles[index + 1] = newFiles[index];
      newFiles[index] = temp;
      return newFiles;
    });
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    try {
      setIsProcessing(true);
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        let image;
        if (file.type === "image/png") {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else if (file.type === "image/jpeg" || file.type === "image/jpg") {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else {
          continue; // Skip unsupported formats
        }

        const dims = image.scale(1);
        const page = pdfDoc.addPage([dims.width, dims.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: dims.width,
          height: dims.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      setResult(pdfBytes);
      
      toast({
        title: "Success",
        description: "Images converted to PDF successfully!",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to convert images to PDF.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadFile(result, "images_converted.pdf", "application/pdf");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Image to PDF</h1>
        <p className="text-muted-foreground">
          Convert JPG, PNG images to a single PDF file.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <FileDropzone
            onDrop={handleDrop}
            accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] }}
            acceptLabel="JPG or PNG images"
          />
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold">Images ({files.length})</h2>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-muted/30 border rounded-md"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <ImageIcon className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="truncate text-sm font-medium">{file.name}</span>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => moveUp(index)} disabled={index === 0} className="h-8 w-8">
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => moveDown(index)} disabled={index === files.length - 1} className="h-8 w-8">
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="h-8 w-8 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {!result ? (
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleConvert}
                disabled={isProcessing}
              >
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Convert to PDF
              </Button>
            ) : (
              <Button size="lg" className="w-full sm:w-auto" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => {
                setFiles([]);
                setResult(null);
              }}
            >
              Clear All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
