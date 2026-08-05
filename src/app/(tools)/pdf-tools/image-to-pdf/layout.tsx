import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to PDF - Convert JPG and PNG to PDF Free",
  description: "Convert multiple JPG and PNG images into a single PDF document. Secure client-side processing directly in your browser.",
  keywords: ["image to pdf", "jpg to pdf", "png to pdf", "convert to pdf", "pdf converter"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
