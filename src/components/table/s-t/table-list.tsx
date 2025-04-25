"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, Edit, Trash2, UserPlus, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Initial student data
const initialStudents = [
  {
    id: "1",
    name: "Student name",
    email: "example@email.com",
    gender: "Male",
    age: "18 Years",
    class: "L3",
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Student name",
    email: "example@email.com",
    gender: "Male",
    age: "18 Years",
    class: "L3",
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Student name",
    email: "example@email.com",
    gender: "Male",
    age: "18 Years",
    class: "L3",
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Student name",
    email: "example@email.com",
    gender: "Male",
    age: "18 Years",
    class: "L3",
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Student name",
    email: "example@email.com",
    gender: "Male",
    age: "18 Years",
    class: "L3",
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Another Student",
    email: "another@email.com",
    gender: "Female",
    age: "19 Years",
    class: "L2",
    phone: "0788123456",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "New Student",
    email: "new@email.com",
    gender: "Male",
    age: "20 Years",
    class: "L1",
    phone: "0788987654",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function TableList() {
  // State for selected students
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  // State for student data
  const [students, setStudents] = useState(initialStudents)

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const studentsPerPage = 5

  // State for filters
  const [searchTerm, setSearchTerm] = useState("")
  const [genderFilter, setGenderFilter] = useState("All gender")
  const [classFilter, setClassFilter] = useState("All education level")
  const [minAge, setMinAge] = useState("")
  const [maxAge, setMaxAge] = useState("")

  // State for new student form
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    gender: "Male",
    age: "",
    class: "L1",
    phone: "",
  })

  // State for edit student
  const [editingStudent, setEditingStudent] = useState<null | {
    id: string
    name: string
    email: string
    gender: string
    age: string
    class: string
    phone: string
  }>(null)

  // State for dialog open status
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null)
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)

  // Toggle student selection
  const toggleStudent = (id: string) => {
    setSelectedStudents((prev) => (prev.includes(id) ? prev.filter((studentId) => studentId !== id) : [...prev, id]))
  }

  // Toggle all students selection
  const toggleAllStudents = () => {
    if (selectedStudents.length === currentStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(currentStudents.map((student) => student.id))
    }
  }

  // Handle adding a new student
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email) return

    const newId = (students.length + 1).toString()
    const studentToAdd = {
      ...newStudent,
      id: newId,
      age: newStudent.age + " Years",
      image: "/placeholder.svg?height=40&width=40",
    }

    setStudents([...students, studentToAdd])

    // Reset form
    setNewStudent({
      name: "",
      email: "",
      gender: "Male",
      age: "",
      class: "L1",
      phone: "",
    })

    setIsAddDialogOpen(false)
  }

  // Prepare student for editing
  const prepareStudentForEdit = (student: (typeof initialStudents)[0]) => {
    const age = student.age.replace(" Years", "")
    setEditingStudent({
      id: student.id,
      name: student.name,
      email: student.email,
      gender: student.gender,
      age: age,
      class: student.class,
      phone: student.phone,
    })
    setIsEditDialogOpen(true)
  }

  // Handle editing a student
  const handleEditStudent = () => {
    if (!editingStudent) return

    setStudents(
      students.map((student) =>
        student.id === editingStudent.id
          ? {
              ...student,
              name: editingStudent.name,
              email: editingStudent.email,
              gender: editingStudent.gender,
              age: editingStudent.age.includes("Years") ? editingStudent.age : editingStudent.age + " Years",
              class: editingStudent.class,
              phone: editingStudent.phone,
            }
          : student,
      ),
    )

    setEditingStudent(null)
    setIsEditDialogOpen(false)
  }

  // Handle deleting a student
  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter((student) => student.id !== id))
    setSelectedStudents(selectedStudents.filter((studentId) => studentId !== id))
    setStudentToDelete(null)
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    setStudents(students.filter((student) => !selectedStudents.includes(student.id)))
    setSelectedStudents([])
    setIsBulkDeleteDialogOpen(false)
  }

  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    // Search filter
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())

    // Gender filter
    const matchesGender = genderFilter === "All gender" || student.gender === genderFilter

    // Class filter
    const matchesClass = classFilter === "All education level" || student.class === classFilter

    // Age filter
    const studentAge = Number.parseInt(student.age.split(" ")[0])
    const matchesMinAge = !minAge || studentAge >= Number.parseInt(minAge)
    const matchesMaxAge = !maxAge || studentAge <= Number.parseInt(maxAge)

    return matchesSearch && matchesGender && matchesClass && matchesMinAge && matchesMaxAge
  })

  // Calculate pagination
  const indexOfLastStudent = currentPage * studentsPerPage
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)

  // Reset to first page when filtered results change
  useEffect(() => {
    if (currentPage > Math.max(1, totalPages)) {
      setCurrentPage(Math.max(1, totalPages))
    }
  }, [filteredStudents.length, totalPages, currentPage])

  // Handle pagination
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="w-full rounded-md basic-card-no-p border shadow-md">
      <div className="text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-medium">All Students</h1>

        <div className="flex gap-2">
          {selectedStudents.length > 0 && (
            <Button variant="destructive" size="sm" onClick={() => setIsBulkDeleteDialogOpen(true)} className="mr-2">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          )}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="basic-title-sm hover:bg-gray-100">
                <UserPlus className="h-4 w-4 mr-2" />
                Add new Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      placeholder="Enter student name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={newStudent.gender}
                      onValueChange={(value) => setNewStudent({ ...newStudent, gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={newStudent.age}
                      onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                      placeholder="Enter age"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select
                      value={newStudent.class}
                      onValueChange={(value) => setNewStudent({ ...newStudent, class: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="L1">L1</SelectItem>
                        <SelectItem value="L2">L2</SelectItem>
                        <SelectItem value="L3">L3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddStudent}>Add Student</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-4 grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search" className="text-white">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name or email"
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1) // Reset to first page on search
              }}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender-filter" className="text-white">
            Gender
          </Label>
          <Select
            value={genderFilter}
            onValueChange={(value) => {
              setGenderFilter(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger id="gender-filter" className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 text-white border-slate-700">
              <SelectItem value="All gender">All gender</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="class-filter" className="text-white">
            Education Level
          </Label>
          <Select
            value={classFilter}
            onValueChange={(value) => {
              setClassFilter(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger id="class-filter" className="w-full">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 text-white border-slate-700">
              <SelectItem value="All education level">All education level</SelectItem>
              <SelectItem value="L1">L1</SelectItem>
              <SelectItem value="L2">L2</SelectItem>
              <SelectItem value="L3">L3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="age-filter" className="text-white">
            Age Range
          </Label>
          <div className="flex gap-2">
            <Input
              id="min-age"
              placeholder="Min"
              className="w-full"
              type="number"
              value={minAge}
              onChange={(e) => {
                setMinAge(e.target.value)
                setCurrentPage(1) // Reset to first page on filter change
              }}
            />
            <Input
              id="max-age"
              placeholder="Max"
              className="w-full"
              type="number"
              value={maxAge}
              onChange={(e) => {
                setMaxAge(e.target.value)
                setCurrentPage(1) // Reset to first page on filter change
              }}
            />
          </div>
        </div>
      </div>

      <Table>
        <TableHeader className="text-white">
          <TableRow className="border-none">
            <TableHead className="w-[50px]">
              <Checkbox
                checked={currentStudents.length > 0 && selectedStudents.length === currentStudents.length}
                onCheckedChange={toggleAllStudents}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Phone number</TableHead>
            <TableHead className="w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentStudents.length > 0 ? (
            currentStudents.map((student) => (
              <TableRow key={student.id} className="text-white border-t border-slate-400">
                <TableCell className="p-2">
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={() => toggleStudent(student.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      className="rounded-full"
                      src={student.image || "/placeholder.svg"}
                      width={40}
                      height={40}
                      alt={student.name}
                    />
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <span className="text-muted-foreground mt-0.5 text-xs">{student.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-slate-500">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-800 text-white border-slate-700">
                      <DropdownMenuItem
                        className="hover:bg-slate-700 focus:bg-slate-700"
                        onSelect={(e) => {
                          e.preventDefault()
                          prepareStudentForEdit(student)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500 hover:bg-slate-700 focus:bg-slate-700"
                        onSelect={(e) => {
                          e.preventDefault()
                          setStudentToDelete(student.id)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-white">
                No students found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center p-4 text-white">
        <div>
          {filteredStudents.length > 0 && (
            <p>
              Showing {indexOfFirstStudent + 1} to {Math.min(indexOfLastStudent, filteredStudents.length)} of{" "}
              {filteredStudents.length} students
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-white basic-title-sm hover:bg-gray-100"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            className="bg-white basic-title-sm hover:bg-gray-100"
            onClick={goToNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
          </DialogHeader>
          {editingStudent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={editingStudent.name}
                    onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingStudent.email}
                    onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-gender">Gender</Label>
                  <Select
                    value={editingStudent.gender}
                    onValueChange={(value) => setEditingStudent({ ...editingStudent, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 text-white border-slate-700">
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-age">Age</Label>
                  <Input
                    id="edit-age"
                    type="number"
                    value={editingStudent.age}
                    onChange={(e) => setEditingStudent({ ...editingStudent, age: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-class">Class</Label>
                  <Select
                    value={editingStudent.class}
                    onValueChange={(value) => setEditingStudent({ ...editingStudent, class: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 text-white border-slate-700">
                      <SelectItem value="L1">L1</SelectItem>
                      <SelectItem value="L2">L2</SelectItem>
                      <SelectItem value="L3">L3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={editingStudent.phone}
                    onChange={(e) => setEditingStudent({ ...editingStudent, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditStudent}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-800 text-white border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              Are you sure you want to delete this student? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                if (studentToDelete) {
                  handleDeleteStudent(studentToDelete)
                }
                setIsDeleteDialogOpen(false)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={isBulkDeleteDialogOpen} onOpenChange={setIsBulkDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-800 text-white border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Bulk Deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              Are you sure you want to delete {selectedStudents.length} selected students? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 text-white hover:bg-red-700" onClick={handleBulkDelete}>
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
