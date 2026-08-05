import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDF Online - Combine PDF Files for Free",
  description: "Merge multiple PDF files into a single document easily and securely. Combine PDFs directly in your web browser with our free online tool.",
  keywords: ["merge pdf", "combine pdf", "join pdf", "pdf binder"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
