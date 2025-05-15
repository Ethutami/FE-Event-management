"use client";

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  revenue: {
    label: "revenue",
    color: "var(--chart-3)",
  }
} satisfies ChartConfig;

export default function AppBarChart() {
  const chartData = [
    { month: "January", revenue: 1860000},
    { month: "February", revenue: 3050000},
    { month: "March", revenue: 2370000},
    { month: "April", revenue: 7300000},
    { month: "May", revenue: 2090000},
    { month: "June", revenue: 2140000},
  ];
  return (
    <div>
      <h1 className="text-lg font-medium mb-6">Total Revenue</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
