"use client";

import { useState } from "react";
import { FileDropzone } from "@/components/tools/file-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { splitPdf } from "@/lib/pdf";
import { FileText, Loader2, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import JSZip from "jszip";


export default function SplitPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultZipUrl, setResultZipUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setResultZipUrl(null);
    }
  };

  const handleSplit = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      const splitFiles = await splitPdf(file);
      
      const zip = new JSZip();
      splitFiles.forEach((f) => {
        zip.file(f.name, f.data);
      });
      
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipUrl = URL.createObjectURL(zipBlob);
      setResultZipUrl(zipUrl);

      toast({
        title: "Success",
        description: `Split into ${splitFiles.length} pages successfully!`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to split PDF. It might be corrupted or encrypted.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultZipUrl) {
      const a = document.createElement("a");
      a.href = resultZipUrl;
      a.download = `split_${file?.name.replace(".pdf", "")}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Split PDF</h1>
        <p className="text-muted-foreground">
          Extract every page of your PDF into separate files. 100% secure.
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
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">{file.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            {resultZipUrl && (
              <div className="mt-6 p-4 bg-primary/10 border-primary/20 border rounded-lg text-center">
                <p className="font-medium text-primary">Your PDF has been split into individual pages and packaged into a ZIP file!</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {!resultZipUrl ? (
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleSplit}
                disabled={isProcessing}
              >
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Split PDF
              </Button>
            ) : (
              <Button size="lg" className="w-full sm:w-auto" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download ZIP File
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => {
                setFile(null);
                if (resultZipUrl) {
                  URL.revokeObjectURL(resultZipUrl);
                  setResultZipUrl(null);
                }
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none mt-16 pt-8 border-t">
        <h2>How to split a PDF</h2>
        <ol>
          <li>Upload your PDF file above.</li>
          <li>Click the <strong>Split PDF</strong> button.</li>
          <li>We will instantly extract every page into a separate PDF file.</li>
          <li>Download the ZIP file containing all your new PDFs.</li>
        </ol>
      </div>
    </div>
  );
}
