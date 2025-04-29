"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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
import { Button } from "@/components/ui/button";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const chartData = [
  { subject: "Math", score: 85 },
  { subject: "Science", score: 78 },
  { subject: "History", score: 92 },
  { subject: "English", score: 88 },
  { subject: "Art", score: 95 },
  { subject: "Music", score: 80 },
  { subject: "Geography", score: 83 },
  { subject: "Physical", score: 90 },
  { subject: "Computer", score: 87 },
  { subject: "Economics", score: 76 },
  { subject: "Biology", score: 89 },
  { subject: "Chemistry", score: 82 },
  { subject: "Physics", score: 91 },
];

const chartConfig = {
  score: {
    label: "Score",
    color: "#0059a7", // Using the first chart color
  },
} satisfies ChartConfig;

export default function StudentPerformanceCard() {
  // Calculate average score for potential use in footer
  const totalScore = chartData.reduce((sum, item) => sum + item.score, 0);
  const averageScore = (totalScore / chartData.length).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle>Student Performance by Subject this team</CardTitle>
          <Button variant={"ghost"} shape={"circle"} library="daisy">
            <HiOutlineDotsHorizontal size={24} />
          </Button>
        </div>
        <CardDescription>Scores across different subjects</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="subject" // Use 'subject' as the data key for the X-axis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // Remove tickFormatter as full subject names are desired
            />
            <YAxis // Add Y-axis for scores
              dataKey="score"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="score" fill="var(--color-score)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Average Score: {averageScore}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing performance for selected subjects.
        </div>
      </CardFooter>
    </Card>
  );
}
