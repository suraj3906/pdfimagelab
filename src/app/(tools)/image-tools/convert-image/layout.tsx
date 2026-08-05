import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convert Image Online - JPG, PNG, WEBP Converter",
  description: "Convert images between formats online for free. Support for JPG, PNG, and WEBP. Fast, secure, and private client-side processing.",
  keywords: ["convert image", "image converter", "jpg to png", "png to webp"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
