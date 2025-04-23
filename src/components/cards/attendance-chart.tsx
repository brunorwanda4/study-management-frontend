"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"
import { RefreshCw } from 'lucide-react'

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

type AttendanceData = {
  day: string
  students: number
  teachers: number
  staff: number
  isCurrentDay?: boolean
}

export default function AttendanceChart({
  refreshInterval = 60000,
  showRefreshButton = true,
  title = "School Attendance"
}: {
  refreshInterval?: number
  showRefreshButton?: boolean
  title?: string
}) {
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([])
  const [totals] = useState({
    students: 520,
    teachers: 42,
    staff: 25
  })
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Generate mock data function
  const generateMockData = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = new Date()
    const currentDay = today.getDay()
    
    const mockData: AttendanceData[] = []
    
    for (let i = 1; i <= 5; i++) {
      const dayFactor = i === 1 || i === 5 ? 0.92 : 0.96
      const randomFactor = 0.98 + (Math.random() * 0.04)
      
      mockData.push({
        day: days[i],
        students: Math.floor(totals.students * dayFactor * randomFactor),
        teachers: Math.floor(totals.teachers * (dayFactor + 0.02) * randomFactor),
        staff: Math.floor(totals.staff * (dayFactor + 0.01) * randomFactor),
        isCurrentDay: i === currentDay
      })
    }
    
    return mockData
  }

  const fetchAttendanceData = async () => {
    try {
      setLoading(true)
      
      // Instead of fetching from API, generate mock data directly
      // When your API is working, uncomment this code:
      /*
      const response = await fetch('/api/attendance')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setAttendanceData(data.data)
      setTotals({
        students: data.totalStudents,
        teachers: data.totalTeachers,
        staff: data.totalStaff
      })
      */
      
      // For now, use mock data directly:
      const mockData = generateMockData()
      setAttendanceData(mockData)
      
      setLastUpdated(new Date().toLocaleTimeString())
      setError(null)
    } catch (err) {
      console.error("Error fetching attendance data:", err)
      setError("Failed to fetch attendance data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAttendanceData()
    
    const intervalId = setInterval(fetchAttendanceData, refreshInterval)
    return () => clearInterval(intervalId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshInterval])

  const handleRefresh = () => {
    fetchAttendanceData()
  }

  if (loading && attendanceData.length === 0) {
    return (
      <div className="w-full p-6 bg-background rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <Skeleton className="h-20 w-32" />
          <Skeleton className="h-20 w-32" />
          <Skeleton className="h-20 w-32" />
        </div>
        <Skeleton className="h-[350px] w-full" />
      </div>
    )
  }

  return (
    <div className="w-full p-6 basic-card rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {showRefreshButton && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        )}
      </div>
      
      {lastUpdated && (
        <p className="text-xs   mb-4">
          Last updated: {lastUpdated}
        </p>
      )}
      
      {error ? (
        <div className="bg-muted p-6 rounded-md text-center">
          <p className=" ">{error}</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-muted/30 p-3 rounded-md">
              <p className="text-sm  ">Total Students</p>
              <p className="text-2xl font-bold">{totals.students}</p>
            </div>
            <div className="bg-muted/30 p-3 rounded-md">
              <p className="text-sm  ">Total Teachers</p>
              <p className="text-2xl font-bold">{totals.teachers}</p>
            </div>
            <div className="bg-muted/30 p-3 rounded-md">
              <p className="text-sm  ">Total Staff</p>
              <p className="text-2xl font-bold">{totals.staff}</p>
            </div>
          </div>
          
          <ChartContainer
            config={{
              students: {
                label: "Students",
                color: "hsl(var(--chart-1))",
              },
              teachers: {
                label: "Teachers",
                color: "hsl(var(--chart-2))",
              },
              staff: {
                label: "School Staff",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="min-h-[350px]"
          >
            <BarChart
              accessibilityLayer
              data={attendanceData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                label={{ value: "Attendance Count", angle: -90, position: "insideLeft", offset: -5 }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Legend />
              <Bar 
                dataKey="students" 
                fill="var(--color-students)" 
                radius={[4, 4, 0, 0]} 
                name="Students"
              />
              <Bar 
                dataKey="teachers" 
                fill="var(--color-teachers)" 
                radius={[4, 4, 0, 0]} 
                name="Teachers"
              />
              <Bar 
                dataKey="staff" 
                fill="var(--color-staff)" 
                radius={[4, 4, 0, 0]} 
                name="School Staff"
              />
            </BarChart>
          </ChartContainer>
        </>
      )}
    </div>
  )
}