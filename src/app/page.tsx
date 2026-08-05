import Link from "next/link";
import { ArrowRight, FileText, Image as ImageIcon, Calculator, Zap, Lock, Settings } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AdPlaceholder } from "@/components/ad-placeholder";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 text-center px-4">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Free Online PDF & File Tools
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                The ultimate collection of premium, blazing fast, and privacy-focused tools. Everything runs locally in your browser.
              </p>
            </div>
            <div className="space-x-4 mt-8">
              <Link href="/pdf-tools" className={buttonVariants({ size: "lg", className: "rounded-full" })}>
                Explore PDF Tools <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/image-tools" className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full" })}>
                Image Tools
              </Link>
            </div>
            
            <div className="w-full max-w-4xl mx-auto pt-12">
              <AdPlaceholder type="banner" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Powered by modern WebAssembly. No waiting for uploads or server queues.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">100% Private</h3>
              <p className="text-muted-foreground">
                Your files never leave your device. All processing happens directly in your browser.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">No Limits</h3>
              <p className="text-muted-foreground">
                Use all tools for free, without registration, watermarks, or hidden paywalls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Popular Categories</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Choose from our wide variety of powerful utilities.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            
            {/* Category Card */}
            <Link href="/pdf-tools" className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">PDF Tools</h3>
                  <p className="text-sm text-muted-foreground">Merge, compress, split, convert</p>
                </div>
              </div>
            </Link>

            <Link href="/image-tools" className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                  <ImageIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Image Tools</h3>
                  <p className="text-sm text-muted-foreground">Compress, resize, convert formats</p>
                </div>
              </div>
            </Link>

            <Link href="/calculators" className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                  <Calculator className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Calculators</h3>
                  <p className="text-sm text-muted-foreground">Percentage, EMI, GST, dates</p>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}
