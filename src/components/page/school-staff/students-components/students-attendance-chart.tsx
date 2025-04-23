"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function StudentAttendanceChart() {
  // Sample student attendance data for the past week
  const attendanceData = [
    { day: "Monday", attendance: 42 },
    { day: "Tuesday", attendance: 38 },
    { day: "Wednesday", attendance: 45 },
    { day: "Thursday", attendance: 40 },
    { day: "Friday", attendance: 35 },
  ]

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Student Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            attendance: {
              label: "Students Present",
              color: "hsl(var(--primary))",
            },
          }}
          className="min-h-[300px]"
        >
          <BarChart
            accessibilityLayer
            data={attendanceData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 25,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              domain={[0, 50]}
              label={{
                value: "Students",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
                dy: 50,
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="attendance" fill="var(--color-attendance)" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ChartContainer>
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary"></div>
            <span>Total Students: 50 students</span>
          </div>
          <div>Last updated: Today at 3:00 PM</div>
        </div>
      </CardContent>
    </Card>
  )
}

