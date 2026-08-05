import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EMI Calculator - Calculate Loan Equated Monthly Installments",
  description: "Calculate your Equated Monthly Installment (EMI) for home loans, car loans, and personal loans easily.",
  keywords: ["emi calculator", "loan calculator", "monthly installment", "interest calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
