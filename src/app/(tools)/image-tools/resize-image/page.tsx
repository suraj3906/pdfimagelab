"use client";

import { useState } from "react";
import { FileDropzone } from "@/components/tools/file-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Download, ImageIcon, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function ResizeImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [maintainRatio, setMaintainRatio] = useState<boolean>(true);
  
  const { toast } = useToast();

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setResult(null);

      // Load image to get original dimensions
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width.toString());
        setHeight(img.height.toString());
      };
      img.src = URL.createObjectURL(selectedFile);
    }
  };

  const handleWidthChange = (val: string) => {
    setWidth(val);
    if (maintainRatio && originalWidth > 0 && val !== "") {
      const newWidth = parseInt(val, 10);
      if (!isNaN(newWidth)) {
        const ratio = originalHeight / originalWidth;
        setHeight(Math.round(newWidth * ratio).toString());
      }
    }
  };

  const handleHeightChange = (val: string) => {
    setHeight(val);
    if (maintainRatio && originalHeight > 0 && val !== "") {
      const newHeight = parseInt(val, 10);
      if (!isNaN(newHeight)) {
        const ratio = originalWidth / originalHeight;
        setWidth(Math.round(newHeight * ratio).toString());
      }
    }
  };

  const handleResize = () => {
    if (!file) return;

    const targetWidth = parseInt(width, 10);
    const targetHeight = parseInt(height, 10);

    if (isNaN(targetWidth) || targetWidth <= 0 || isNaN(targetHeight) || targetHeight <= 0) {
      toast({
        title: "Invalid dimensions",
        description: "Please enter valid width and height values.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      
      const resizedDataUrl = canvas.toDataURL(file.type);
      setResult(resizedDataUrl);
      setIsProcessing(false);
      
      toast({
        title: "Success",
        description: "Image resized successfully!",
      });
    };
    img.onerror = () => {
      setIsProcessing(false);
      toast({
        title: "Error",
        description: "Failed to load image for resizing.",
        variant: "destructive",
      });
    };
    img.src = URL.createObjectURL(file);
  };

  const handleDownload = () => {
    if (result) {
      const a = document.createElement("a");
      a.href = result;
      a.download = `resized_${file?.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Resize Image</h1>
        <p className="text-muted-foreground">
          Change the width and height of your images perfectly.
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
                  Original Dimensions: {originalWidth} x {originalHeight}px
                </p>
              </div>
            </div>

            {!result && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (px)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={width}
                      onChange={(e) => handleWidthChange(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (px)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => handleHeightChange(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="aspect" 
                    checked={maintainRatio} 
                    onCheckedChange={(checked) => setMaintainRatio(checked === true)} 
                  />
                  <Label htmlFor="aspect">Maintain aspect ratio</Label>
                </div>
              </div>
            )}

            {result && (
              <div className="mt-4 p-4 bg-primary/10 border-primary/20 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Original</p>
                    <p className="text-xl font-bold">{originalWidth} x {originalHeight}</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  <div className="text-right">
                    <p className="text-sm font-medium">Resized</p>
                    <p className="text-xl font-bold text-primary">{width} x {height}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {!result ? (
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleResize}
                disabled={isProcessing}
              >
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Resize Image
              </Button>
            ) : (
              <Button size="lg" className="w-full sm:w-auto" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download Resized Image
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
