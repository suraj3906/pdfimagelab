import Link from "next/link";
import { Calculator, Percent, Coins, Landmark, ArrowRight } from "lucide-react";

export default function CalculatorsCategoryPage() {
  const tools = [
    {
      title: "Percentage Calculator",
      description: "Calculate percentages, percentage change, and more.",
      href: "/calculators/percentage",
      icon: <Percent className="h-6 w-6" />,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400",
    },
    {
      title: "EMI Calculator",
      description: "Calculate your Equated Monthly Installment (EMI) for loans.",
      href: "/calculators/emi",
      icon: <Landmark className="h-6 w-6" />,
      color: "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400",
    },
    {
      title: "GST Calculator",
      description: "Easily calculate Goods and Services Tax (GST).",
      href: "/calculators/gst",
      icon: <Coins className="h-6 w-6" />,
      color: "text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-600 rounded-full mb-2 dark:bg-green-900/20 dark:text-green-400">
          <Calculator className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Calculators</h1>
        <p className="text-xl text-muted-foreground max-w-[700px]">
          Free, fast, and easy-to-use calculators for everyday math and financial needs.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="group flex flex-col justify-between p-6 bg-card border rounded-xl hover:shadow-md transition-all hover:border-primary/50"
          >
            <div>
              <div className={`inline-flex p-3 rounded-lg mb-4 ${tool.color}`}>
                {tool.icon}
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {tool.title}
              </h2>
              <p className="text-muted-foreground">{tool.description}</p>
            </div>
            <div className="flex items-center text-sm font-medium text-primary mt-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
              Calculate <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
