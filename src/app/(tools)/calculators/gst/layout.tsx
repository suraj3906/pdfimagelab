import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GST Calculator - Calculate Goods and Services Tax",
  description: "Calculate GST (Goods and Services Tax) easily. Add GST to a base amount or remove GST from a total amount.",
  keywords: ["gst calculator", "tax calculator", "goods and services tax", "inclusive gst", "exclusive gst"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
