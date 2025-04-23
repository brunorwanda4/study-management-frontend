"use client"

import { useState } from "react"
import { BarChart3, ClipboardList, UserCog, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AssignRoleDialog } from "./assign-role-dialog"

interface StaffOverviewProps {
  staffMembers: any[]
}

export function StaffOverview({ staffMembers }: StaffOverviewProps) {
  const [openRoleDialog, setOpenRoleDialog] = useState(false)

  // Mock data for posts
  const recentPosts = [
    {
      id: 1,
      title: "End of Year Ceremony",
      author: "Alex Johnson",
      date: "2023-12-10",
      type: "Announcement",
      likes: 24,
    },
    {
      id: 2,
      title: "Science Fair Registration",
      author: "Sarah Williams",
      date: "2023-12-08",
      type: "Event",
      likes: 18,
    },
    {
      id: 3,
      title: "New Library Resources",
      author: "Michael Brown",
      date: "2023-12-05",
      type: "Information",
      likes: 12,
    },
  ]

  // Mock data for role requests
  const roleRequests = [
    {
      id: 1,
      name: "James Smith",
      currentRole: "Assistant",
      requestedRole: "Teacher",
      date: "2023-12-09",
      status: "Pending",
    },
    {
      id: 2,
      name: "Patricia Moore",
      currentRole: "Teacher",
      requestedRole: "Department Head",
      date: "2023-12-07",
      status: "Pending",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4  " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs  ">+4 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <UserCog className="h-4 w-4  " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs  ">90.5% of total staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <ClipboardList className="h-4 w-4  " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs  ">All departments staffed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posts This Month</CardTitle>
            <BarChart3 className="h-4 w-4  " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs  ">+8 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Staff Activity</CardTitle>
            <CardDescription>Latest posts and updates from staff members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-start gap-4 rounded-lg border p-3">
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{post.title}</p>
                    <div className="flex items-center text-sm  ">
                      <span>{post.author}</span>
                      <span className="mx-1">•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Badge variant="outline">{post.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Posts
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Role Change Requests</CardTitle>
            <CardDescription>Staff members requesting role changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roleRequests.map((request) => (
                <div key={request.id} className="flex items-start gap-4 rounded-lg border p-3">
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{request.name}</p>
                    <div className="flex items-center text-sm  ">
                      <span>
                        {request.currentRole} → {request.requestedRole}
                      </span>
                      <span className="mx-1">•</span>
                      <span>{request.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Deny
                    </Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <AssignRoleDialog
              open={openRoleDialog}
              onOpenChange={setOpenRoleDialog}
              staffMembers={staffMembers}
              trigger={
                <Button variant="outline" className="w-full">
                  Assign New Role
                </Button>
              }
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
