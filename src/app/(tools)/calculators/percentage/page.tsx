"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PercentageCalculatorPage() {
  // Calc 1: What is X% of Y?
  const [val1A, setVal1A] = useState<string>("");
  const [val1B, setVal1B] = useState<string>("");

  // Calc 2: X is what % of Y?
  const [val2A, setVal2A] = useState<string>("");
  const [val2B, setVal2B] = useState<string>("");

  // Calc 3: Percentage increase/decrease from X to Y
  const [val3A, setVal3A] = useState<string>("");
  const [val3B, setVal3B] = useState<string>("");

  const calcPercentageOf = (percentage: string, number: string) => {
    const p = parseFloat(percentage);
    const n = parseFloat(number);
    if (isNaN(p) || isNaN(n)) return "0";
    return ((p / 100) * n).toLocaleString(undefined, { maximumFractionDigits: 4 });
  };

  const calcWhatPercent = (part: string, whole: string) => {
    const p = parseFloat(part);
    const w = parseFloat(whole);
    if (isNaN(p) || isNaN(w) || w === 0) return "0";
    return ((p / w) * 100).toLocaleString(undefined, { maximumFractionDigits: 4 }) + "%";
  };

  const calcPercentageChange = (oldVal: string, newVal: string) => {
    const o = parseFloat(oldVal);
    const n = parseFloat(newVal);
    if (isNaN(o) || isNaN(n) || o === 0) return "0%";
    const change = ((n - o) / Math.abs(o)) * 100;
    const sign = change >= 0 ? "+" : "";
    return sign + change.toLocaleString(undefined, { maximumFractionDigits: 4 }) + "%";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Percentage Calculator</h1>
        <p className="text-muted-foreground">
          Quickly calculate percentages, find out what percent a number is of another, or calculate percentage increase/decrease.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Calculator 1 */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>What is X% of Y?</CardTitle>
            <CardDescription>Find a percentage of a number.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Label className="w-16 flex-shrink-0 text-right">What is</Label>
                <Input
                  type="number"
                  placeholder="20"
                  value={val1A}
                  onChange={(e) => setVal1A(e.target.value)}
                  className="w-20 text-center"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label className="w-16 flex-shrink-0 text-right">% of</Label>
                <Input
                  type="number"
                  placeholder="150"
                  value={val1B}
                  onChange={(e) => setVal1B(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border mt-4">
              <span className="text-muted-foreground font-medium">Result:</span>
              <span className="text-2xl font-bold text-primary">{calcPercentageOf(val1A, val1B)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Calculator 2 */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>X is what % of Y?</CardTitle>
            <CardDescription>Find out what percentage a number represents.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="30"
                  value={val2A}
                  onChange={(e) => setVal2A(e.target.value)}
                  className="w-24 text-center"
                />
                <Label className="flex-shrink-0">is what % of</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="150"
                  value={val2B}
                  onChange={(e) => setVal2B(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border mt-4">
              <span className="text-muted-foreground font-medium">Result:</span>
              <span className="text-2xl font-bold text-primary">{calcWhatPercent(val2A, val2B)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Calculator 3 */}
        <Card className="flex flex-col md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Percentage Change</CardTitle>
            <CardDescription>Calculate % increase or decrease.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Label className="w-12 flex-shrink-0 text-right">From</Label>
                <Input
                  type="number"
                  placeholder="50"
                  value={val3A}
                  onChange={(e) => setVal3A(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label className="w-12 flex-shrink-0 text-right">To</Label>
                <Input
                  type="number"
                  placeholder="75"
                  value={val3B}
                  onChange={(e) => setVal3B(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border mt-4">
              <span className="text-muted-foreground font-medium">Result:</span>
              <span className={`text-2xl font-bold ${calcPercentageChange(val3A, val3B).startsWith("-") ? "text-destructive" : "text-green-600 dark:text-green-400"}`}>
                {calcPercentageChange(val3A, val3B)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="prose dark:prose-invert max-w-none mt-16 pt-8 border-t">
        <h2>How to use the percentage calculator</h2>
        <p>
          Percentages are everywhere, from calculating discounts to figuring out your test score. Our free percentage calculator helps you solve three main problems:
        </p>
        <ul>
          <li><strong>Finding the percentage of a number:</strong> e.g., finding 15% of $200.</li>
          <li><strong>Finding what percentage one number is of another:</strong> e.g., finding out what percentage 45 is of 100.</li>
          <li><strong>Finding the percentage increase or decrease:</strong> e.g., seeing how much a price changed from $50 to $60.</li>
        </ul>
      </div>
    </div>
  );
}
