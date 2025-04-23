"use client"

import { useState } from "react"
import { MoreHorizontal, UserPlus } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RegisterStaffDialog } from "./register-staff-dialog"
import { AssignRoleDialog } from "./assign-role-dialog"

interface StaffListProps {
  staffMembers: any[]
}

export function StaffList({ staffMembers }: StaffListProps) {
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false)
  const [openRoleDialog, setOpenRoleDialog] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<any>(null)

  const handleEditStaff = (staff: any) => {
    setSelectedStaff(staff)
    setOpenRegisterDialog(true)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Staff Directory</CardTitle>
          <Button
            size="sm"
            className="h-8 gap-1"
            onClick={() => {
              setSelectedStaff(null)
              setOpenRegisterDialog(true)
            }}
          >
            <UserPlus className="h-4 w-4" />
            Add Staff
          </Button>
        </div>
        <CardDescription>Manage all staff members, their roles, and permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Posts</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffMembers.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={staff.avatar} alt={staff.name} />
                      <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{staff.name}</div>
                      <div className="text-xs text-muted-foreground">{staff.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>{staff.department}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      staff.status === "Active" ? "default" : staff.status === "On Leave" ? "outline" : "secondary"
                    }
                  >
                    {staff.status}
                  </Badge>
                </TableCell>
                <TableCell>{staff.joinDate}</TableCell>
                <TableCell>{staff.posts}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEditStaff(staff)}>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedStaff(staff)
                          setOpenRoleDialog(true)
                        }}
                      >
                        Change Role
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Posts</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Deactivate Account</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>5</strong> of <strong>42</strong> staff members
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>

      <RegisterStaffDialog
        open={openRegisterDialog}
        onOpenChange={setOpenRegisterDialog}
        selectedStaff={selectedStaff}
      />

      <AssignRoleDialog open={openRoleDialog} onOpenChange={setOpenRoleDialog} staffMembers={staffMembers} />
    </Card>
  )
}
