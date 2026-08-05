import Link from "next/link";
import { FileText, Minimize, Split, RotateCw, Trash2, ArrowRight, ImageIcon } from "lucide-react";

export default function PdfToolsCategoryPage() {
  const tools = [
    {
      title: "Merge PDF",
      description: "Combine multiple PDF files into one document.",
      href: "/pdf-tools/merge-pdf",
      icon: <FileText className="h-6 w-6" />,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400",
    },
    {
      title: "Compress PDF",
      description: "Reduce the file size of your PDF without losing quality.",
      href: "/pdf-tools/compress-pdf",
      icon: <Minimize className="h-6 w-6" />,
      color: "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400",
    },
    {
      title: "Split PDF",
      description: "Extract pages from your PDF or save each page as a separate PDF.",
      href: "/pdf-tools/split-pdf",
      icon: <Split className="h-6 w-6" />,
      color: "text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400",
    },
    {
      title: "Rotate PDF",
      description: "Rotate your PDF files the way you want them.",
      href: "/pdf-tools/rotate-pdf",
      icon: <RotateCw className="h-6 w-6" />,
      color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400",
    },
    {
      title: "Delete Pages",
      description: "Remove specific pages from a PDF document.",
      href: "/pdf-tools/delete-pages",
      icon: <Trash2 className="h-6 w-6" />,
      color: "text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400",
    },
    {
      title: "Image to PDF",
      description: "Convert JPG or PNG images to a single PDF document.",
      href: "/pdf-tools/image-to-pdf",
      icon: <ImageIcon className="h-6 w-6" />,
      color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-red-100 text-red-600 rounded-full mb-2 dark:bg-red-900/20 dark:text-red-400">
          <FileText className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">PDF Tools</h1>
        <p className="text-xl text-muted-foreground max-w-[700px]">
          Every tool you need to work with PDFs in one place. All 100% free, secure, and processed locally in your browser.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="group flex flex-col justify-between p-6 bg-card border rounded-xl hover:shadow-md transition-all hover:border-primary/50"
          >
            <div>
              <div className={`inline-flex p-3 rounded-lg mb-4 ${tool.color}`}>
                {tool.icon}
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {tool.title}
              </h2>
              <p className="text-muted-foreground">{tool.description}</p>
            </div>
            <div className="flex items-center text-sm font-medium text-primary mt-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
              Use Tool <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
