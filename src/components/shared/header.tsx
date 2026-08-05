import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto px-4 sm:px-8">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/pdf-tools"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              PDF Tools
            </Link>
            <Link
              href="/image-tools"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Image Tools
            </Link>
            <Link
              href="/calculators"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Calculators
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search will go here */}
          </div>
          <nav className="flex items-center space-x-2">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
