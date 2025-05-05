"use client";

import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { Button } from "../ui/button";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import MyImage from "../myComponents/myImage";
const chartData = [
  { browser: "REB", visitors: 200, fill: "var(--color-safari)" },
  { browser: "TVET", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "Primary", visitors: 173, fill: "var(--color-edge)" },
  { browser: "Ordinary Level", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  chrome: {
    label: "Chrome",
    color: "#0059a7",
  },
  safari: {
    label: "Safari",
    color: "#0088ff",
  },
  firefox: {
    label: "Firefox",
    color: "#a9d7ff",
  },
  edge: {
    label: "Edge",
    color: "#5b9bd3",
  },
  other: {
    label: "Other",
    color: "#1893ff",
  },
} satisfies ChartConfig;

export default function SchoolEducationChart() {
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col w-1/3">
      <CardHeader className=" flex justify-between items-center pb-0 border-b border-base-300">
        <CardTitle>School Education</CardTitle>
        <Button variant={"ghost"} shape={"circle"} library="daisy">
          <HiOutlineDotsHorizontal size={24}/>
        </Button>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
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
              dataKey="visitors"
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
                          className="text-3xl font-bold text-primary-content"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Educations
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className=" grid grid-cols-3 space-x-4 text-sm ">
        <div className=" flex flex-col space-y-1 items-center">
          <MyImage className=" size-6" src="/icons/rwanda.png" />
          <div className=" flex space-x-1">
            <div className=" size-2 rounded-full bg-[#1100ff]" />
            <span className=" text-sm">Primary</span>
          </div>
        </div>
        <div className=" flex flex-col space-y-1 items-center">
          <MyImage className=" size-6" src="/icons/english.png" />
          <div className=" flex space-x-1">
            <div className=" size-2 rounded-full bg-[#0088ff]" />
            <span className=" text-sm">Ordinary Level</span>
          </div>
        </div>
        <div className=" flex flex-col space-y-1 items-center">
          <MyImage className=" size-6" src="/icons/classroom.png" />
          <div className=" flex space-x-1">
            <div className=" size-2 rounded-full bg-[#a9d7ff]" />
            <span className=" text-sm">Primary</span>
          </div>
        </div>
        <div className=" flex flex-col space-y-1 items-center">
          <MyImage className=" size-6" src="/icons/education.png" />
          <div className=" flex space-x-1">
            <div className=" size-2 rounded-full bg-[#1100ff]" />
            <span className=" text-sm">Primary</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
