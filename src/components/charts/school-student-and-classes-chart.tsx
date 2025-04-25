"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "../ui/button";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useTheme } from "next-themes";
const chartData = [
  { class: "P1", students: 86 },
  { class: "P2", students: 305 },
  { class: "P3", students: 237 },
  { class: "P4", students: 73 },
  { class: "P5", students: 128 },
  { class: "P6", students: 209 },
  { class: "S1", students: 214 },
  { class: "S2", students: 190 },
  { class: "S3", students: 176 },
  { class: "S4 MPC", students: 162 },
  { class: "S5 MPC", students: 149 },
  { class: "S6 MPC", students: 134 },
  { class: "S4 PCB", students: 25 },
  { class: "S5 PCB", students: 92 },
  { class: "S6 PCB", students: 87 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#727272",
  },
} satisfies ChartConfig;

export default function SchoolStudentAndClassChart() {
  const {theme} = useTheme()
  return (
    <Card className=" w-2/3">
      <CardHeader className=" flex justify-between items-center pb-0 border-b border-base-content/20">
        <CardTitle>Class & Students</CardTitle>
        <Button variant={"ghost"} shape={"circle"} library="daisy">
          <HiOutlineDotsHorizontal size={24}/>
        </Button>
      </CardHeader>
      <CardContent>
        <ChartContainer data-theme={theme} config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
            data-theme={theme}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="class"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className=" text-base-content"
              data-theme={theme}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              data-theme={theme}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="students" fill="#0059a7" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter> */}
    </Card>
  );
}
