/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { MoreHorizontal, Plus } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PostsManagementProps {
  staffMembers: any[]
}

export function PostsManagement({ staffMembers }: PostsManagementProps) {
  // Mock data for posts
  const posts = [
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
    {
      id: 4,
      title: "Teacher Training Workshop",
      author: "Emily Davis",
      date: "2023-12-03",
      type: "Event",
      likes: 32,
    },
    {
      id: 5,
      title: "Updated Curriculum Guidelines",
      author: "Alex Johnson",
      date: "2023-12-01",
      type: "Information",
      likes: 27,
    },
    {
      id: 6,
      title: "Holiday Schedule",
      author: "David Wilson",
      date: "2023-11-28",
      type: "Announcement",
      likes: 45,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Staff Posts</CardTitle>
          <Button size="sm" className="h-8 gap-1">
            <Plus className="h-4 w-4" />
            Create Post
          </Button>
        </div>
        <CardDescription>View and manage posts created by staff members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
                <SelectItem value="event">Events</SelectItem>
                <SelectItem value="information">Information</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-staff">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-staff">All Staff</SelectItem>
                {staffMembers.map((staff) => (
                  <SelectItem key={staff.id} value={staff.id.toString()}>
                    {staff.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{post.type}</Badge>
                  </TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>{post.likes} likes</TableCell>
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
                        <DropdownMenuItem>View Post</DropdownMenuItem>
                        <DropdownMenuItem>Edit Post</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete Post</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-sm  ">
          Showing <strong>6</strong> of <strong>24</strong> posts
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
    </Card>
  )
}
