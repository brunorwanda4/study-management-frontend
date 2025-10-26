"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTheme } from "next-themes";
import { ViewDataClassDto } from "@/lib/schema/class/view-data-class.dto";

const chartConfig = {
  students: {
    label: "Students",
    color: "#727272",
  },
} satisfies ChartConfig;

interface SchoolStudentAndClassChartProps {
  classes: ViewDataClassDto[];
}

// 🛠️ Function to extract clean class name (removes school name and year)
function extractClassName(fullName: string) {
  const parts = fullName.split(" ");
  if (
    parts.length >= 2 &&
    (parts[0].startsWith("S") || parts[0].startsWith("P"))
  ) {
    return parts[0] + (parts[1] ? ` ${parts[1]}` : "");
  }
  return parts[0];
}

export default function SchoolStudentAndClassChart({
  classes,
}: SchoolStudentAndClassChartProps) {
  const { theme } = useTheme();

  const chartData = classes.map((cls) => ({
    class: extractClassName(cls.name),
    students: cls._count.students,
  }));

  return (
    <Card className="w-2/3">
      <CardHeader className="flex flex-row justify-between items-center pb-4 border-b border-base-300">
        <CardTitle>Class & Students</CardTitle>
        {/* <Button variant={"ghost"} shape={"circle"} library="daisy">
          <HiOutlineDotsHorizontal size={24} />
        </Button> */}
      </CardHeader>
      <CardContent>
        <ChartContainer
          data-theme={theme}
          config={chartConfig}
          className="min-h-[200px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 10,
              left: 10,
              bottom: 5,
            }}
            data-theme={theme}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="class"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="text-base-content"
              data-theme={theme}
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
    </Card>
  );
}
