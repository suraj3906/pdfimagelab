import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator - Fast and Free Online Tool",
  description: "Calculate percentages, find what percent one number is of another, and calculate percentage increase or decrease.",
  keywords: ["percentage calculator", "calculate percentage", "percentage increase", "percentage decrease"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
