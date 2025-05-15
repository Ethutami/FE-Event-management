"use client";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
const chartData = [
  { browser: "Teknologi", events: 275, fill: "var(--color-chrome)" },
  { browser: "Self-dev", events: 200, fill: "var(--color-safari)" }
];

const chartConfig = {
  events: {
    label: "events",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-2)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-3)",
  }
} satisfies ChartConfig;

export default function AppPieChart() {
    const totalevents = chartData.reduce(
      (acc, curr) => acc + curr.events,
      0
    );
  return (
    <div>
      <h1 className="text-lg font-medium mb-6">Total Event Held</h1>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="events"
            nameKey="browser"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalevents.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        events
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-4 flex flex-col gap-2 items-center">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total events for the last month
        </div>
      </div>
    </div>
  );
}
