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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  newStudentFormSchema,
  editStudentFormSchema,
  type NewStudentForm,
  type EditStudentForm,
} from "@/lib/schema/table-forms/forms"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

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

  // State for dialog open status
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null)
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)

  // Form for adding a new student
  const addStudentForm = useForm<NewStudentForm>({
    resolver: zodResolver(newStudentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "Male",
      age: "",
      class: "L1",
      phone: "",
    },
  })

  // Form for editing a student
  const editStudentForm = useForm<EditStudentForm>({
    resolver: zodResolver(editStudentFormSchema),
    defaultValues: {
      id: "",
      name: "",
      email: "",
      gender: "Male",
      age: "",
      class: "L1",
      phone: "",
    },
  })

  // Form for filters
  const filterForm = useForm({
    defaultValues: {
      searchTerm: "",
      genderFilter: "All gender",
      classFilter: "All education level",
      minAge: "",
      maxAge: "",
    },
  })

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
  const handleAddStudent = (data: NewStudentForm) => {
    const newId = (students.length + 1).toString()
    const studentToAdd = {
      ...data,
      id: newId,
      age: data.age + " Years",
      image: "/placeholder.svg?height=40&width=40",
    }

    setStudents([...students, studentToAdd])
    setIsAddDialogOpen(false)
    addStudentForm.reset()
  }

  // Prepare student for editing
  const prepareStudentForEdit = (student: (typeof initialStudents)[0]) => {
    const age = student.age.replace(" Years", "")
    editStudentForm.reset({
      id: student.id,
      name: student.name,
      email: student.email,
      gender: student.gender as "Male" | "Female",
      age: age,
      class: student.class as "L1" | "L2" | "L3",
      phone: student.phone,
    })
    setIsEditDialogOpen(true)
  }

  // Handle editing a student
  const handleEditStudent = (data: EditStudentForm) => {
    setStudents(
      students.map((student) =>
        student.id === data.id
          ? {
              ...student,
              name: data.name,
              email: data.email,
              gender: data.gender,
              age: data.age.includes("Years") ? data.age : data.age + " Years",
              class: data.class,
              phone: data.phone,
            }
          : student,
      ),
    )

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

  // Apply filters from form
  const applyFilters = (data: any) => {
    setSearchTerm(data.searchTerm || "")
    setGenderFilter(data.genderFilter)
    setClassFilter(data.classFilter)
    setMinAge(data.minAge || "")
    setMaxAge(data.maxAge || "")
    setCurrentPage(1) // Reset to first page on filter change
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

  // Update filter form when filter state changes
  useEffect(() => {
    filterForm.setValue("searchTerm", searchTerm)
    filterForm.setValue("genderFilter", genderFilter as any)
    filterForm.setValue("classFilter", classFilter as any)
    filterForm.setValue("minAge", minAge)
    filterForm.setValue("maxAge", maxAge)
  }, [searchTerm, genderFilter, classFilter, minAge, maxAge, filterForm])

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
          <Dialog
            open={isAddDialogOpen}
            onOpenChange={(open) => {
              setIsAddDialogOpen(open)
              if (!open) addStudentForm.reset()
            }}
          >
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
              <Form {...addStudentForm}>
                <form onSubmit={addStudentForm.handleSubmit(handleAddStudent)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={addStudentForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter student name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addStudentForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="Enter email address" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={addStudentForm.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addStudentForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter phone number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={addStudentForm.control}
                      name="class"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select class" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="L1">L1</SelectItem>
                              <SelectItem value="L2">L2</SelectItem>
                              <SelectItem value="L3">L3</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                  </div>

                  <DialogFooter>
                    <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Student</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Form {...filterForm}>
        <form onChange={filterForm.handleSubmit(applyFilters)} className="p-4 grid grid-cols-4 gap-4">
          <FormField
            control={filterForm.control}
            name="searchTerm"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-white">Search</FormLabel>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Search by name or email"
                      className="w-full pl-8"
                      onChange={(e) => {
                        field.onChange(e)
                        setSearchTerm(e.target.value)
                        setCurrentPage(1) // Reset to first page on search
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={filterForm.control}
            name="genderFilter"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-white">Gender</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    setGenderFilter(value)
                    setCurrentPage(1)
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger id="gender-filter" className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-800 text-white border-slate-700">
                    <SelectItem value="All gender">All gender</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={filterForm.control}
            name="classFilter"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-white">Education Level</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    setClassFilter(value)
                    setCurrentPage(1)
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger id="class-filter" className="w-full">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-800 text-white border-slate-700">
                    <SelectItem value="All education level">All education level</SelectItem>
                    <SelectItem value="L1">L1</SelectItem>
                    <SelectItem value="L2">L2</SelectItem>
                    <SelectItem value="L3">L3</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <Label htmlFor="age-filter" className="text-white">
              Age Range
            </Label>
            <div className="flex gap-2">
              <FormField
                control={filterForm.control}
                name="minAge"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        id="min-age"
                        placeholder="Min"
                        type="number"
                        onChange={(e) => {
                          field.onChange(e)
                          setMinAge(e.target.value)
                          setCurrentPage(1)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={filterForm.control}
                name="maxAge"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        id="max-age"
                        placeholder="Max"
                        type="number"
                        onChange={(e) => {
                          field.onChange(e)
                          setMaxAge(e.target.value)
                          setCurrentPage(1)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>

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
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open)
          if (!open) editStudentForm.reset()
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
          </DialogHeader>
          <Form {...editStudentForm}>
            <form onSubmit={editStudentForm.handleSubmit(handleEditStudent)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editStudentForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter student name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editStudentForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="Enter email address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editStudentForm.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-800 text-white border-slate-700">
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editStudentForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter phone number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editStudentForm.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-800 text-white border-slate-700">
                          <SelectItem value="L1">L1</SelectItem>
                          <SelectItem value="L2">L2</SelectItem>
                          <SelectItem value="L3">L3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
              </div>

              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
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
