"use client";

import { useState } from "react";
import { FileDropzone } from "@/components/tools/file-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { rotatePdf, downloadFile } from "@/lib/pdf";
import { FileText, Loader2, Download, RotateCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RotatePdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [rotationDegrees, setRotationDegrees] = useState<string>("90");
  const { toast } = useToast();

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setResult(null);
    }
  };

  const handleRotate = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      const rotatedBytes = await rotatePdf(file, parseInt(rotationDegrees, 10));
      setResult(rotatedBytes);
      toast({
        title: "Success",
        description: "PDF rotated successfully!",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to rotate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadFile(result, `rotated_${file?.name}`, "application/pdf");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Rotate PDF</h1>
        <p className="text-muted-foreground">
          Rotate all pages in your PDF document by 90°, 180°, or 270°.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <FileDropzone
            onDrop={handleDrop}
            accept={{ "application/pdf": [".pdf"] }}
            acceptLabel="PDF file"
            maxFiles={1}
          />
        </CardContent>
      </Card>

      {file && (
        <div className="space-y-6 mb-8">
          <div className="p-4 bg-muted/30 border rounded-lg">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">{file.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            {!result && (
              <div className="space-y-4">
                <h4 className="font-medium">Rotation Angle</h4>
                <Select value={rotationDegrees} onValueChange={(val) => setRotationDegrees(val || "90")}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Select angle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="90">90° Right (Clockwise)</SelectItem>
                    <SelectItem value="-90">90° Left (Counter-Clockwise)</SelectItem>
                    <SelectItem value="180">180° (Upside Down)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {result && (
              <div className="mt-4 p-4 bg-primary/10 border-primary/20 border rounded-lg flex items-center space-x-4">
                <RotateCw className="h-8 w-8 text-primary" />
                <p className="font-medium text-primary">Your PDF has been rotated.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {!result ? (
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleRotate}
                disabled={isProcessing}
              >
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Rotate PDF
              </Button>
            ) : (
              <Button size="lg" className="w-full sm:w-auto" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download Rotated PDF
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

      <div className="prose dark:prose-invert max-w-none mt-16 pt-8 border-t">
        <h2>How to rotate a PDF</h2>
        <ol>
          <li>Upload your PDF file.</li>
          <li>Select the rotation angle from the dropdown.</li>
          <li>Click the <strong>Rotate PDF</strong> button.</li>
          <li>Download your rotated PDF file.</li>
        </ol>
      </div>
    </div>
  );
}
