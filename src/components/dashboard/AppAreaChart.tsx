"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  atendee: {
    label: "atendee",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", atendee: 1800 },
  { month: "February", atendee: 2000 },
  { month: "March", atendee: 1200 },
  { month: "April", atendee: 1900 },
  { month: "May", atendee: 1300 },
  { month: "June", atendee: 1400 },
];

export default function AppAreaChart() {
  return (
    <div>
      <h1 className="text-lg font-medium mb-6">Atendee Trend</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <AreaChart accessibilityLayer data={chartData}>
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
          <defs>
            <linearGradient id="fillatendee" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-atendee)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-atendee)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="atendee"
            type="natural"
            fill="url(#fillatendee)"
            fillOpacity={0.4}
            stroke="var(--color-atendee)"
            stackId="a"
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill="url(#fillDesktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
