"use client";

import { useState, useEffect } from "react";
import { FileDropzone } from "@/components/tools/file-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { removePagesFromPdf, getPdfPageCount, downloadFile } from "@/lib/pdf";
import { FileText, Loader2, Download, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function DeletePagesPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<Uint8Array | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (file) {
      getPdfPageCount(file).then((count) => setPageCount(count));
    }
  }, [file]);

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setResult(null);
    }
  };

  const togglePageSelection = (pageIndex: number) => {
    setSelectedPages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(pageIndex)) {
        newSet.delete(pageIndex);
      } else {
        newSet.add(pageIndex);
      }
      return newSet;
    });
  };

  const handleDelete = async () => {
    if (!file) return;
    if (selectedPages.size === 0) {
      toast({
        title: "No pages selected",
        description: "Please select at least one page to delete.",
        variant: "destructive",
      });
      return;
    }
    if (selectedPages.size === pageCount) {
      toast({
        title: "Cannot delete all pages",
        description: "A PDF must have at least one page.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);
      const updatedBytes = await removePagesFromPdf(file, Array.from(selectedPages));
      setResult(updatedBytes);
      toast({
        title: "Success",
        description: "Pages deleted successfully!",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete pages. The file might be corrupted.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadFile(result, `updated_${file?.name}`, "application/pdf");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Delete PDF Pages</h1>
        <p className="text-muted-foreground">
          Remove unnecessary pages from your PDF file easily.
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
                  {pageCount} Pages • {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            {!result && pageCount > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Select pages to delete:</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedPages(new Set())}
                    disabled={selectedPages.size === 0}
                  >
                    Clear Selection
                  </Button>
                </div>
                
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                  {Array.from({ length: pageCount }).map((_, index) => {
                    const isSelected = selectedPages.has(index);
                    return (
                      <div
                        key={index}
                        onClick={() => togglePageSelection(index)}
                        className={`
                          relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border-2 transition-all
                          ${isSelected ? "border-destructive bg-destructive/10" : "border-border hover:border-primary/50 bg-background"}
                        `}
                      >
                        <span className={`text-lg font-medium ${isSelected ? "text-destructive" : ""}`}>
                          {index + 1}
                        </span>
                        {isSelected && (
                          <div className="absolute top-1 right-1">
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {result && (
              <div className="mt-4 p-4 bg-primary/10 border-primary/20 border rounded-lg flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <FileText className="h-6 w-6 text-primary" />
                  <p className="font-medium text-primary">PDF updated successfully!</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Original pages: {pageCount} <br />
                  Pages deleted: {selectedPages.size} <br />
                  New page count: {pageCount - selectedPages.size}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {!result ? (
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleDelete}
                disabled={isProcessing || selectedPages.size === 0}
              >
                {isProcessing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-4 w-4" />
                )}
                Delete {selectedPages.size > 0 ? selectedPages.size : ""} Pages
              </Button>
            ) : (
              <Button size="lg" className="w-full sm:w-auto" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download Updated PDF
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => {
                setFile(null);
                setResult(null);
                setPageCount(0);
                setSelectedPages(new Set());
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none mt-16 pt-8 border-t">
        <h2>How to delete pages from a PDF</h2>
        <ol>
          <li>Upload your PDF document using the box above.</li>
          <li>Click on the page numbers you want to remove. They will be marked in red.</li>
          <li>Click the <strong>Delete Pages</strong> button.</li>
          <li>Download your new PDF without the deleted pages.</li>
        </ol>
      </div>
    </div>
  );
}
