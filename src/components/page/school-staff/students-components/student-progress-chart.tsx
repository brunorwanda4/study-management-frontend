"use client";

import { TrendingUp } from "lucide-react";
import * as React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Data for both exam types
const examData = {
  periodExams: [
    { performance: "excellent", percentage: 22, color: "hsl(var(--chart-1))" },
    { performance: "good", percentage: 38, color: "hsl(var(--chart-2))" },
    { performance: "average", percentage: 25, color: "hsl(var(--chart-3))" },
    {
      performance: "belowAverage",
      percentage: 10,
      color: "hsl(var(--chart-4))",
    },
    { performance: "poor", percentage: 5, color: "hsl(var(--chart-5))" },
  ],
  mainExams: [
    { performance: "excellent", percentage: 18, color: "hsl(var(--chart-1))" },
    { performance: "good", percentage: 32, color: "hsl(var(--chart-2))" },
    { performance: "average", percentage: 28, color: "hsl(var(--chart-3))" },
    {
      performance: "belowAverage",
      percentage: 15,
      color: "hsl(var(--chart-4))",
    },
    { performance: "poor", percentage: 7, color: "hsl(var(--chart-5))" },
  ],
};

const chartConfig = {
  percentage: {
    label: "Percentage",
  },
  excellent: {
    label: "Excellent (A)",
    color: "hsl(var(--chart-1))",
  },
  good: {
    label: "Good (B)",
    color: "hsl(var(--chart-2))",
  },
  average: {
    label: "Average (C)",
    color: "hsl(var(--chart-3))",
  },
  belowAverage: {
    label: "Below Average (D)",
    color: "hsl(var(--chart-4))",
  },
  poor: {
    label: "Poor (F)",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

// Performance labels with descriptions
const performanceLabels = {
  excellent: "Excellent (A)",
  good: "Good (B)",
  average: "Average (C)",
  belowAverage: "Below Average (D)",
  poor: "Poor (F)",
};

interface props {
  title: string;
}

export function StudentProgressChart({ title }: props) {
  const [examType, setExamType] = React.useState<"periodExams" | "mainExams">(
    "periodExams",
  );

  const chartData = examData[examType];

  // const totalPercentage = React.useMemo(() => {
  //   return chartData.reduce((acc, curr) => acc + curr.percentage, 0)
  // }, [chartData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>Academic Year 2023-2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <Tabs
          defaultValue="periodExams"
          className="mb-4"
          onValueChange={(value) =>
            setExamType(value as "periodExams" | "mainExams")
          }
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="periodExams">Period Exams</TabsTrigger>
            <TabsTrigger value="mainExams">Main Exams</TabsTrigger>
          </TabsList>
        </Tabs>

        <ChartContainer config={chartConfig} className="mx-auto h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 10,
              }}
            >
              <XAxis
                dataKey="performance"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  // Shorten labels for better display on x-axis
                  const shortLabels = {
                    excellent: "A",
                    good: "B",
                    average: "C",
                    belowAverage: "D",
                    poor: "F",
                  };
                  return shortLabels[value as keyof typeof shortLabels];
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                domain={[0, "dataMax + 10"]}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) =>
                      performanceLabels[label as keyof typeof performanceLabels]
                    }
                    formatter={(value) => `${value}%`}
                  />
                }
              />
              <Bar
                dataKey="percentage"
                radius={[4, 4, 0, 0]}
                fill="var(--color-excellent)"
                fillOpacity={0.9}
                barSize={40}
                name="Percentage"
                isAnimationActive={true}
                animationDuration={800}
                label={{
                  position: "top",
                  formatter: (value: number) => `${value}%`,
                  fill: "var(--foreground)",
                  fontSize: 12,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {chartData.map((item) => (
            <div key={item.performance} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="text-xs">
                {
                  performanceLabels[
                    item.performance as keyof typeof performanceLabels
                  ]
                }
                : {item.percentage}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {examType === "periodExams"
            ? "Period exam performance improved by 5.2% this term"
            : "Main exam performance improved by 3.8% this year"}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none  ">
          Based on {examType === "periodExams" ? "mid-term" : "final"}{" "}
          examination results across all subjects
        </div>
      </CardFooter>
    </Card>
  );
}
