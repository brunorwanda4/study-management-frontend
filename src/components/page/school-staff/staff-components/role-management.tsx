"use client"

import { Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function RoleManagement() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Role Management</CardTitle>
          <Button size="sm" className="h-8 gap-1">
            <Plus className="h-4 w-4" />
            Create Role
          </Button>
        </div>
        <CardDescription>Define roles and assign permissions to staff members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="rounded-lg border">
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold">Administrator</h3>
                <p className="text-sm  ">Full system access and management</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>3 Users</Badge>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
            <Separator />
            <div className="p-4">
              <h4 className="mb-2 text-sm font-medium">Permissions</h4>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                <Badge variant="outline" className="justify-start">
                  User Management
                </Badge>
                <Badge variant="outline" className="justify-start">
                  Content Management
                </Badge>
                <Badge variant="outline" className="justify-start">
                  System Settings
                </Badge>
                <Badge variant="outline" className="justify-start">
                  Role Management
                </Badge>
                <Badge variant="outline" className="justify-start">
                  Reports Access
                </Badge>
                <Badge variant="outline" className="justify-start">
                  Financial Management
                </Badge>
              </div>
            </div>
          </div>

          <div className="rounded-lg border">
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold">Teacher</h3>
                <p className="text-sm  ">Teaching staff with content creation access</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>24 Users</Badge>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
            <Separator />
            <div className="p-4">
              <h4 className="mb-2 text-sm font-medium">Permissions</h4>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                <Badge variant="outline" className="justify-start">
                  Content Creation
                </Badge>
                <Badge variant="outline" className="justify-start">
                  Student Management
                </Badge>
                <Badge variant="outline" className="justify-start">
                  Grade Management
                </Badge>
                <Badge variant="outline" className="justify-start">
                  Attendance Tracking
                </Badge>
              </div>
            </div>
          </div>

          <div className="rounded-lg border">
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold">Librarian</h3>
                <p className="text-sm  ">Library resource management</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>2 Users</Badge>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
            <Separator />
            <div className="p-4">
              <h4 className="mb-2 text-sm font-medium">Permissions</h4>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                <Badge variant="outline" className="justify-start">
                  Resource Management
                </Badge>
                <Badge variant="outline" className="justify-start">
                  Borrowing System
                </Badge>
                <Badge variant="outline" className="justify-start">
                  Content Creation
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
