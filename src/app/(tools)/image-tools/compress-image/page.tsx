"use client";

import { useState } from "react";
import { FileDropzone } from "@/components/tools/file-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Download, ImageIcon, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import imageCompression from "browser-image-compression";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";


export default function CompressImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<File | null>(null);
  const [quality, setQuality] = useState<number[]>([80]);
  const { toast } = useToast();

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setResult(null);
    }
  };

  const handleCompress = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      
      const options = {
        maxSizeMB: file.size / 1024 / 1024, // keep same max size
        maxWidthOrHeight: 4000,
        useWebWorker: true,
        initialQuality: quality[0] / 100,
      };

      const compressedFile = await imageCompression(file, options);
      setResult(compressedFile);
      
      toast({
        title: "Success",
        description: "Image compressed successfully!",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to compress image.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const url = URL.createObjectURL(result);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed_${file?.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Compress Image</h1>
        <p className="text-muted-foreground">
          Reduce the file size of your JPG, PNG, or WEBP images with high quality.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <FileDropzone
            onDrop={handleDrop}
            accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
            acceptLabel="Images (JPG, PNG, WEBP)"
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
                <p className="text-sm text-muted-foreground">
                  Original Size: {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            {!result && (
              <div className="space-y-6 px-2">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-base font-medium">Quality / Compression Level</Label>
                    <span className="font-semibold text-primary">{quality[0]}%</span>
                  </div>
                  <Slider
                    value={quality}
                    onValueChange={(val) => setQuality(val as number[])}
                    max={100}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Smaller File (Lower Quality)</span>
                    <span>Larger File (Better Quality)</span>
                  </div>
                </div>
              </div>
            )}

            {result && (
              <div className="mt-4 p-4 bg-primary/10 border-primary/20 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium">Original</p>
                    <p className="text-2xl font-bold">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  <div className="text-right">
                    <p className="text-sm font-medium">Compressed</p>
                    <p className="text-2xl font-bold text-primary">{(result.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    {file.size > result.size 
                      ? `${Math.round((1 - result.size / file.size) * 100)}% smaller!` 
                      : "File is already optimized"}
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
                onClick={handleCompress}
                disabled={isProcessing}
              >
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Compress Image
              </Button>
            ) : (
              <Button size="lg" className="w-full sm:w-auto" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download Compressed Image
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
        <h2>How to compress an image</h2>
        <ol>
          <li>Upload your JPG, PNG, or WEBP file.</li>
          <li>Adjust the quality slider. Lower quality means a smaller file size.</li>
          <li>Click the <strong>Compress Image</strong> button.</li>
          <li>Download your optimized image instantly.</li>
        </ol>
      </div>
    </div>
  );
}
