"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function GstCalculatorPage() {
  const [amount, setAmount] = useState<string>("1000");
  const [gstRate, setGstRate] = useState<string>("18");
  const [calcMode, setCalcMode] = useState<"add" | "remove">("add");
  const [gstType, setGstType] = useState<"intra" | "inter">("intra"); // intra = CGST+SGST, inter = IGST

  const calculateGst = () => {
    const p = parseFloat(amount);
    const r = parseFloat(gstRate);

    if (isNaN(p) || isNaN(r) || p < 0 || r < 0) {
      return { netAmount: 0, gstAmount: 0, cgst: 0, sgst: 0, igst: 0, totalAmount: 0 };
    }

    let gstAmount = 0;
    let netAmount = 0;
    let totalAmount = 0;

    if (calcMode === "add") {
      gstAmount = (p * r) / 100;
      netAmount = p;
      totalAmount = p + gstAmount;
    } else {
      // Removing GST: The entered amount is the total amount inclusive of GST.
      gstAmount = p - (p * (100 / (100 + r)));
      netAmount = p - gstAmount;
      totalAmount = p;
    }

    const cgst = gstType === "intra" ? gstAmount / 2 : 0;
    const sgst = gstType === "intra" ? gstAmount / 2 : 0;
    const igst = gstType === "inter" ? gstAmount : 0;

    return {
      netAmount,
      gstAmount,
      cgst,
      sgst,
      igst,
      totalAmount,
    };
  };

  const results = calculateGst();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Indian GST Calculator</h1>
        <p className="text-muted-foreground">
          Accurately calculate Indian Goods and Services Tax (GST) with CGST, SGST, and IGST breakdowns.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tax Details</CardTitle>
            <CardDescription>Enter amount and GST specifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Calculation Mode</Label>
              <RadioGroup value={calcMode} onValueChange={(val) => setCalcMode(val as "add" | "remove")} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 border p-3 rounded bg-background cursor-pointer">
                  <RadioGroupItem value="add" id="add" />
                  <Label htmlFor="add" className="cursor-pointer font-medium">Add GST (Exclusive)</Label>
                </div>
                <div className="flex items-center space-x-2 border p-3 rounded bg-background cursor-pointer">
                  <RadioGroupItem value="remove" id="remove" />
                  <Label htmlFor="remove" className="cursor-pointer font-medium">Remove GST (Inclusive)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>GST Type (Intra-state vs Inter-state)</Label>
              <RadioGroup value={gstType} onValueChange={(val) => setGstType(val as "intra" | "inter")} className="flex flex-row space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intra" id="intra" />
                  <Label htmlFor="intra" className="cursor-pointer">CGST + SGST (Same State)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inter" id="inter" />
                  <Label htmlFor="inter" className="cursor-pointer">IGST (Other State)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">GST Rate (%)</Label>
              <div className="flex gap-2 flex-wrap">
                {["0.25", "3", "5", "12", "18", "28"].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setGstRate(rate)}
                    className={`px-3 py-1.5 rounded border text-sm font-medium transition-colors ${
                      gstRate === rate 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-background hover:bg-muted"
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
              <Input
                id="rate"
                type="number"
                value={gstRate}
                onChange={(e) => setGstRate(e.target.value)}
                placeholder="18"
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calculation Result</CardTitle>
            <CardDescription>Breakdown of the tax amount.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-primary/10 border-primary/20 border rounded-lg text-center">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {calcMode === "add" ? "Total Amount (Post-GST)" : "Net Amount (Pre-GST)"}
              </p>
              <p className="text-4xl font-bold text-primary">
                {formatCurrency(calcMode === "add" ? results.totalAmount : results.netAmount)}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded border">
                <span className="text-muted-foreground">Net Amount</span>
                <span className="font-semibold">{formatCurrency(results.netAmount)}</span>
              </div>

              {gstType === "intra" ? (
                <>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded border text-orange-600 dark:text-orange-400">
                    <span className="font-medium">CGST ({Number(gstRate) / 2}%)</span>
                    <span className="font-bold">+{formatCurrency(results.cgst)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded border text-orange-600 dark:text-orange-400">
                    <span className="font-medium">SGST ({Number(gstRate) / 2}%)</span>
                    <span className="font-bold">+{formatCurrency(results.sgst)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded border text-orange-600 dark:text-orange-400">
                  <span className="font-medium">IGST ({gstRate}%)</span>
                  <span className="font-bold">+{formatCurrency(results.igst)}</span>
                </div>
              )}

              <div className="flex justify-between items-center p-3 bg-muted/50 rounded border">
                <span className="text-muted-foreground font-medium">Total Amount</span>
                <span className="font-bold">{formatCurrency(results.totalAmount)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="prose dark:prose-invert max-w-none mt-16 pt-8 border-t">
        <h2>About Indian GST Calculation</h2>
        <p>
          In India, the Goods and Services Tax (GST) is categorized into three types based on the transaction:
        </p>
        <ul>
          <li><strong>CGST (Central GST):</strong> Collected by the Central Government on intra-state sales (e.g. sale within Maharashtra).</li>
          <li><strong>SGST (State GST):</strong> Collected by the State Government on intra-state sales. CGST and SGST are always equal (half of the total GST rate each).</li>
          <li><strong>IGST (Integrated GST):</strong> Collected by the Central Government on inter-state sales (e.g. sale from Maharashtra to Gujarat).</li>
        </ul>
        <p>Common GST rates in India include 0.25%, 3%, 5%, 12%, 18%, and 28%.</p>
      </div>
    </div>
  );
}
