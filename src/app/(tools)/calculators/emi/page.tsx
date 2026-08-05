"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function EmiCalculatorPage() {
  const [principal, setPrincipal] = useState<string>("500000");
  const [rate, setRate] = useState<string>("8.5");
  const [tenureYears, setTenureYears] = useState<string>("10");

  const calculateEmi = () => {
    const p = Number(principal);
    const rNum = Number(rate);
    const nNum = Number(tenureYears);

    if (isNaN(p) || isNaN(rNum) || isNaN(nNum) || p <= 0 || rNum <= 0 || nNum <= 0) {
      return { emi: 0, totalInterest: 0, totalAmount: 0 };
    }
    
    const r = rNum / 12 / 100;
    const n = nNum * 12;
    
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - p;

    return {
      emi: emi,
      totalInterest: totalInterest,
      totalAmount: totalAmount,
    };
  };

  const results = calculateEmi();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">EMI Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your Equated Monthly Installment (EMI) for home, car, or personal loans.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
            <CardDescription>Adjust the sliders or enter values manually.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Loan Amount (Principal)</Label>
                <Input 
                  type="number" 
                  value={principal} 
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-32 text-right"
                />
              </div>
              <Slider
                value={[Number(principal) || 0]}
                onValueChange={(val) => setPrincipal(String(Array.isArray(val) ? val[0] : val))}
                max={10000000}
                step={10000}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Interest Rate (p.a. %)</Label>
                <Input 
                  type="number" 
                  value={rate} 
                  onChange={(e) => setRate(e.target.value)}
                  className="w-32 text-right"
                />
              </div>
              <Slider
                value={[Number(rate) || 0]}
                onValueChange={(val) => setRate(String(Array.isArray(val) ? val[0] : val))}
                max={25}
                step={0.1}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Loan Tenure (Years)</Label>
                <Input 
                  type="number" 
                  value={tenureYears} 
                  onChange={(e) => setTenureYears(e.target.value)}
                  className="w-32 text-right"
                />
              </div>
              <Slider
                value={[Number(tenureYears) || 0]}
                onValueChange={(val) => setTenureYears(String(Array.isArray(val) ? val[0] : val))}
                max={30}
                step={1}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Repayment Summary</CardTitle>
            <CardDescription>Breakdown of your loan repayment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-primary/10 border-primary/20 border rounded-lg text-center">
              <p className="text-sm font-medium text-muted-foreground mb-1">Monthly EMI</p>
              <p className="text-4xl font-bold text-primary">{formatCurrency(results.emi)}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded border">
                <span className="text-muted-foreground">Principal Amount</span>
                <span className="font-semibold">{formatCurrency(Number(principal) || 0)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded border">
                <span className="text-muted-foreground">Total Interest</span>
                <span className="font-semibold">{formatCurrency(results.totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded border">
                <span className="text-muted-foreground">Total Payment</span>
                <span className="font-semibold">{formatCurrency(results.totalAmount)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="prose dark:prose-invert max-w-none mt-16 pt-8 border-t">
        <h2>What is an EMI?</h2>
        <p>
          Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. 
          Equated monthly installments are applied to both interest and principal each month so that over a specified number of years, the loan is paid off in full.
        </p>
      </div>
    </div>
  );
}
