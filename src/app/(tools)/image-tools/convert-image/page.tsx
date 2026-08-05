"use client";

import { useState } from "react";
import { FileDropzone } from "@/components/tools/file-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Download, ImageIcon, FileImage } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Label } from "@/components/ui/label";

export default function ConvertImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>("image/jpeg");
  const { toast } = useToast();

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setResult(null);
    }
  };

  const getExtension = (mimeType: string) => {
    if (mimeType === "image/jpeg") return "jpg";
    if (mimeType === "image/png") return "png";
    if (mimeType === "image/webp") return "webp";
    return "jpg";
  };

  const handleConvert = () => {
    if (!file) return;

    if (file.type === targetFormat) {
      toast({
        title: "Already in format",
        description: `The file is already a ${getExtension(targetFormat).toUpperCase()} image.`,
      });
      return;
    }

    setIsProcessing(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        setIsProcessing(false);
        return;
      }
      
      // If converting to JPEG, fill background with white first (since JPEG doesn't support transparency)
      if (targetFormat === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);
      
      const convertedDataUrl = canvas.toDataURL(targetFormat, 0.92);
      setResult(convertedDataUrl);
      setIsProcessing(false);
      
      toast({
        title: "Success",
        description: "Image converted successfully!",
      });
    };
    img.onerror = () => {
      setIsProcessing(false);
      toast({
        title: "Error",
        description: "Failed to load image for conversion.",
        variant: "destructive",
      });
    };
    img.src = URL.createObjectURL(file);
  };

  const handleDownload = () => {
    if (result && file) {
      const a = document.createElement("a");
      a.href = result;
      
      // Get base filename without extension
      const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      const newExt = getExtension(targetFormat);
      
      a.download = `${baseName}_converted.${newExt}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Convert Image</h1>
        <p className="text-muted-foreground">
          Convert your images between JPG, PNG, and WEBP formats seamlessly.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <FileDropzone
            onDrop={handleDrop}
            accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"] }}
            acceptLabel="Any Image Format"
            maxFiles={1}
          />
        </CardContent>
      </Card>

      {file && (
        <div className="space-y-6 mb-8">
          <div className="p-4 bg-muted/30 border rounded-lg">
            <div className="flex items-center space-x-3 mb-6">
              <ImageIcon className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">{file.name}</h3>
                <p className="text-sm text-muted-foreground uppercase">
                  Current format: {file.type.split('/')[1] || "Unknown"}
                </p>
              </div>
            </div>

            {!result && (
              <div className="space-y-4">
                <Label className="text-base font-medium">Convert to format:</Label>
                <Select value={targetFormat} onValueChange={(val) => setTargetFormat(val || "image/jpeg")}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image/jpeg">JPG / JPEG</SelectItem>
                    <SelectItem value="image/png">PNG</SelectItem>
                    <SelectItem value="image/webp">WEBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {result && (
              <div className="mt-4 p-4 bg-primary/10 border-primary/20 border rounded-lg flex items-center space-x-4">
                <FileImage className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium text-primary">Your image is ready!</p>
                  <p className="text-sm text-muted-foreground">
                    Converted to {getExtension(targetFormat).toUpperCase()}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {!result ? (
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleConvert}
                disabled={isProcessing}
              >
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Convert Image
              </Button>
            ) : (
              <Button size="lg" className="w-full sm:w-auto" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download Converted Image
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => {
                setFile(null);
                setResult(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
