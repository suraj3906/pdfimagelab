"use client";

import { useState } from "react";
import { FileDropzone } from "@/components/tools/file-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mergePdfs, downloadFile } from "@/lib/pdf";
import { Trash2, ArrowUp, ArrowDown, FileText, Loader2, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";


export default function MergePdfPage() {
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

  const handleMerge = async () => {
    if (files.length < 2) {
      toast({
        title: "Not enough files",
        description: "Please select at least 2 PDF files to merge.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);
      const mergedBytes = await mergePdfs(files);
      setResult(mergedBytes);
      toast({
        title: "Success",
        description: "PDFs merged successfully!",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to merge PDFs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadFile(result, "merged.pdf", "application/pdf");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Merge PDF</h1>
        <p className="text-muted-foreground">
          Combine multiple PDF files into one document in your browser. 100% secure.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <FileDropzone
            onDrop={handleDrop}
            accept={{ "application/pdf": [".pdf"] }}
            acceptLabel="PDF files"
          />
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold">Selected Files ({files.length})</h2>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-muted/30 border rounded-md"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="truncate text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="h-8 w-8"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveDown(index)}
                    disabled={index === files.length - 1}
                    className="h-8 w-8"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
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
                onClick={handleMerge}
                disabled={isProcessing || files.length < 2}
              >
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Merge PDFs
              </Button>
            ) : (
              <Button size="lg" className="w-full sm:w-auto" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download Merged PDF
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

      {/* SEO Content Section */}
      <div className="prose dark:prose-invert max-w-none mt-16 pt-8 border-t">
        <h2>How to merge PDF files</h2>
        <ol>
          <li>Drag and drop your PDF files into the upload area above.</li>
          <li>Reorder the files using the up and down arrows if needed.</li>
          <li>Click the <strong>Merge PDFs</strong> button to combine them.</li>
          <li>Download your new merged PDF file.</li>
        </ol>
        <h3>Is it secure?</h3>
        <p>
          Yes! All processing happens locally in your browser. Your files are <strong>never</strong> uploaded to any server. This ensures complete privacy and security for your sensitive documents.
        </p>
      </div>
    </div>
  );
}
