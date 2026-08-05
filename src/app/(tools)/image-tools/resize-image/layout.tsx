import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resize Image Online - Change Width and Height Free",
  description: "Resize images easily and securely in your browser. Change width, height, and maintain aspect ratio for JPG, PNG, and WEBP formats.",
  keywords: ["resize image", "change image size", "image resizer", "scale image"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
