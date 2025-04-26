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
  newTeacherFormSchema,
  editTeacherFormSchema,
  type NewTeacherForm,
  type EditTeacherForm,
} from "@/lib/schema/table-forms/teacher-forms"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"

// Available classes and subjects
const availableClasses = ["L1", "L2", "L3"]
const availableSubjects = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
]

// Initial teacher data
const initialTeachers = [
  {
    id: "1",
    name: "Teacher name",
    email: "example@email.com",
    gender: "Male",
    experience: "5 Years",
    classes: ["L1", "L2"],
    subjects: ["Mathematics", "Physics"],
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Teacher name",
    email: "example@email.com",
    gender: "Female",
    experience: "8 Years",
    classes: ["L3"],
    subjects: ["Biology", "Chemistry"],
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Teacher name",
    email: "example@email.com",
    gender: "Male",
    experience: "3 Years",
    classes: ["L1"],
    subjects: ["English", "History"],
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Teacher name",
    email: "example@email.com",
    gender: "Female",
    experience: "10 Years",
    classes: ["L2", "L3"],
    subjects: ["Computer Science"],
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Teacher name",
    email: "example@email.com",
    gender: "Male",
    experience: "7 Years",
    classes: ["L1", "L3"],
    subjects: ["Geography", "History"],
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function TeacherList() {
  // State for selected teachers
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])

  // State for teacher data
  const [teachers, setTeachers] = useState(initialTeachers)

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const teachersPerPage = 5

  // State for filters
  const [searchTerm, setSearchTerm] = useState("")
  const [genderFilter, setGenderFilter] = useState("All gender")
  const [classFilter, setClassFilter] = useState("All classes")
  const [subjectFilter, setSubjectFilter] = useState("All subjects")
  const [minExperience, setMinExperience] = useState("")
  const [maxExperience, setMaxExperience] = useState("")

  // State for dialog open status
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [teacherToDelete, setTeacherToDelete] = useState<string | null>(null)
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)

  // Form for adding a new teacher
  const addTeacherForm = useForm<NewTeacherForm>({
    resolver: zodResolver(newTeacherFormSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "Male",
      experience: "",
      classes: [],
      subjects: [],
      phone: "",
    },
  })

  // Form for editing a teacher
  const editTeacherForm = useForm<EditTeacherForm>({
    resolver: zodResolver(editTeacherFormSchema),
    defaultValues: {
      id: "",
      name: "",
      email: "",
      gender: "Male",
      experience: "",
      classes: [],
      subjects: [],
      phone: "",
    },
  })

  // Form for filters
  const filterForm = useForm({
    defaultValues: {
      searchTerm: "",
      genderFilter: "All gender",
      classFilter: "All classes",
      subjectFilter: "All subjects",
      minExperience: "",
      maxExperience: "",
    },
  })

  // Toggle teacher selection
  const toggleTeacher = (id: string) => {
    setSelectedTeachers((prev) => (prev.includes(id) ? prev.filter((teacherId) => teacherId !== id) : [...prev, id]))
  }

  // Toggle all teachers selection
  const toggleAllTeachers = () => {
    if (selectedTeachers.length === currentTeachers.length) {
      setSelectedTeachers([])
    } else {
      setSelectedTeachers(currentTeachers.map((teacher) => teacher.id))
    }
  }

  // Handle adding a new teacher
  const handleAddTeacher = (data: NewTeacherForm) => {
    const newId = (teachers.length + 1).toString()
    const teacherToAdd = {
      ...data,
      id: newId,
      experience: data.experience + " Years",
      image: "/placeholder.svg?height=40&width=40",
    }

    setTeachers([...teachers, teacherToAdd])
    setIsAddDialogOpen(false)
    addTeacherForm.reset()
  }

  // Prepare teacher for editing
  const prepareTeacherForEdit = (teacher: (typeof initialTeachers)[0]) => {
    const experience = teacher.experience.replace(" Years", "")
    editTeacherForm.reset({
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      gender: teacher.gender as "Male" | "Female",
      experience: experience,
      classes: teacher.classes,
      subjects: teacher.subjects,
      phone: teacher.phone,
    })
    setIsEditDialogOpen(true)
  }

  // Handle editing a teacher
  const handleEditTeacher = (data: EditTeacherForm) => {
    setTeachers(
      teachers.map((teacher) =>
        teacher.id === data.id
          ? {
              ...teacher,
              name: data.name,
              email: data.email,
              gender: data.gender,
              experience: data.experience.includes("Years") ? data.experience : data.experience + " Years",
              classes: data.classes,
              subjects: data.subjects,
              phone: data.phone,
            }
          : teacher,
      ),
    )

    setIsEditDialogOpen(false)
  }

  // Handle deleting a teacher
  const handleDeleteTeacher = (id: string) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id))
    setSelectedTeachers(selectedTeachers.filter((teacherId) => teacherId !== id))
    setTeacherToDelete(null)
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    setTeachers(teachers.filter((teacher) => !selectedTeachers.includes(teacher.id)))
    setSelectedTeachers([])
    setIsBulkDeleteDialogOpen(false)
  }

  // Apply filters from form
  const applyFilters = (data: any) => {
    setSearchTerm(data.searchTerm || "")
    setGenderFilter(data.genderFilter)
    setClassFilter(data.classFilter)
    setSubjectFilter(data.subjectFilter)
    setMinExperience(data.minExperience || "")
    setMaxExperience(data.maxExperience || "")
    setCurrentPage(1) // Reset to first page on filter change
  }

  // Filter teachers based on search and filters
  const filteredTeachers = teachers.filter((teacher) => {
    // Search filter
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())

    // Gender filter
    const matchesGender = genderFilter === "All gender" || teacher.gender === genderFilter

    // Class filter
    const matchesClass = classFilter === "All classes" || teacher.classes.includes(classFilter)

    // Subject filter
    const matchesSubject = subjectFilter === "All subjects" || teacher.subjects.includes(subjectFilter)

    // Experience filter
    const teacherExperience = Number.parseInt(teacher.experience.split(" ")[0])
    const matchesMinExperience = !minExperience || teacherExperience >= Number.parseInt(minExperience)
    const matchesMaxExperience = !maxExperience || teacherExperience <= Number.parseInt(maxExperience)

    return (
      matchesSearch && matchesGender && matchesClass && matchesSubject && matchesMinExperience && matchesMaxExperience
    )
  })

  // Calculate pagination
  const indexOfLastTeacher = currentPage * teachersPerPage
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher)
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage)

  // Reset to first page when filtered results change
  useEffect(() => {
    if (currentPage > Math.max(1, totalPages)) {
      setCurrentPage(Math.max(1, totalPages))
    }
  }, [filteredTeachers.length, totalPages, currentPage])

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
    filterForm.setValue("subjectFilter", subjectFilter as any)
    filterForm.setValue("minExperience", minExperience)
    filterForm.setValue("maxExperience", maxExperience)
  }, [searchTerm, genderFilter, classFilter, subjectFilter, minExperience, maxExperience, filterForm])

  return (
    <div className="w-full rounded-md basic-card-no-p border shadow-md">
      <div className="text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-medium">All Teachers</h1>

        <div className="flex gap-2">
          {selectedTeachers.length > 0 && (
            <Button variant="destructive" size="sm" onClick={() => setIsBulkDeleteDialogOpen(true)} className="mr-2">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          )}
          <Dialog
            open={isAddDialogOpen}
            onOpenChange={(open) => {
              setIsAddDialogOpen(open)
              if (!open) addTeacherForm.reset()
            }}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="basic-title-sm hover:bg-gray-100">
                <UserPlus className="h-4 w-4 mr-2" />
                Add new Teacher
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
              </DialogHeader>
              <Form {...addTeacherForm}>
                <form onSubmit={addTeacherForm.handleSubmit(handleAddTeacher)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={addTeacherForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter teacher name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addTeacherForm.control}
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
                      control={addTeacherForm.control}
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
                      control={addTeacherForm.control}
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
                      control={addTeacherForm.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience (Years)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" placeholder="Enter years of experience" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={addTeacherForm.control}
                      name="classes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Classes</FormLabel>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {availableClasses.map((cls) => (
                              <div key={cls} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`class-${cls}`}
                                  checked={field.value.includes(cls)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, cls])
                                    } else {
                                      field.onChange(field.value.filter((value) => value !== cls))
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={`class-${cls}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {cls}
                                </label>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={addTeacherForm.control}
                      name="subjects"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subjects</FormLabel>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {availableSubjects.map((subject) => (
                              <div key={subject} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`subject-${subject}`}
                                  checked={field.value.includes(subject)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, subject])
                                    } else {
                                      field.onChange(field.value.filter((value) => value !== subject))
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={`subject-${subject}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {subject}
                                </label>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <DialogFooter>
                    <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Teacher</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Form {...filterForm}>
        <form
          onChange={filterForm.handleSubmit(applyFilters)}
          className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
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
                <FormLabel className="text-white">Class</FormLabel>
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
                    <SelectItem value="All classes">All classes</SelectItem>
                    {availableClasses.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={filterForm.control}
            name="subjectFilter"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-white">Subject</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    setSubjectFilter(value)
                    setCurrentPage(1)
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger id="subject-filter" className="w-full">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-800 text-white border-slate-700">
                    <SelectItem value="All subjects">All subjects</SelectItem>
                    {availableSubjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <Label htmlFor="experience-filter" className="text-white">
              Experience Range (Years)
            </Label>
            <div className="flex gap-2">
              <FormField
                control={filterForm.control}
                name="minExperience"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        id="min-experience"
                        placeholder="Min"
                        type="number"
                        onChange={(e) => {
                          field.onChange(e)
                          setMinExperience(e.target.value)
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
                name="maxExperience"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        id="max-experience"
                        placeholder="Max"
                        type="number"
                        onChange={(e) => {
                          field.onChange(e)
                          setMaxExperience(e.target.value)
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
                checked={currentTeachers.length > 0 && selectedTeachers.length === currentTeachers.length}
                onCheckedChange={toggleAllTeachers}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Classes</TableHead>
            <TableHead>Subjects</TableHead>
            <TableHead>Phone number</TableHead>
            <TableHead className="w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTeachers.length > 0 ? (
            currentTeachers.map((teacher) => (
              <TableRow key={teacher.id} className="text-white border-t border-slate-400">
                <TableCell className="p-2">
                  <Checkbox
                    checked={selectedTeachers.includes(teacher.id)}
                    onCheckedChange={() => toggleTeacher(teacher.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      className="rounded-full"
                      src={teacher.image || "/placeholder.svg"}
                      width={40}
                      height={40}
                      alt={teacher.name}
                    />
                    <div>
                      <div className="font-medium">{teacher.name}</div>
                      <span className="text-muted-foreground mt-0.5 text-xs">{teacher.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{teacher.gender}</TableCell>
                <TableCell>{teacher.experience}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {teacher.classes.map((cls) => (
                      <Badge key={cls} variant="outline" className="bg-slate-700">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((subject) => (
                      <Badge key={subject} variant="outline" className="bg-slate-700">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{teacher.phone}</TableCell>
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
                          prepareTeacherForEdit(teacher)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500 hover:bg-slate-700 focus:bg-slate-700"
                        onSelect={(e) => {
                          e.preventDefault()
                          setTeacherToDelete(teacher.id)
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
              <TableCell colSpan={8} className="text-center py-4 text-white">
                No teachers found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center p-4 text-white">
        <div>
          {filteredTeachers.length > 0 && (
            <p>
              Showing {indexOfFirstTeacher + 1} to {Math.min(indexOfLastTeacher, filteredTeachers.length)} of{" "}
              {filteredTeachers.length} teachers
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

      {/* Edit Teacher Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open)
          if (!open) editTeacherForm.reset()
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
          </DialogHeader>
          <Form {...editTeacherForm}>
            <form onSubmit={editTeacherForm.handleSubmit(handleEditTeacher)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editTeacherForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter teacher name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editTeacherForm.control}
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
                  control={editTeacherForm.control}
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
                  control={editTeacherForm.control}
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
                  control={editTeacherForm.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience (Years)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Enter years of experience" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={editTeacherForm.control}
                  name="classes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Classes</FormLabel>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {availableClasses.map((cls) => (
                          <div key={cls} className="flex items-center space-x-2">
                            <Checkbox
                              id={`edit-class-${cls}`}
                              checked={field.value.includes(cls)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, cls])
                                } else {
                                  field.onChange(field.value.filter((value) => value !== cls))
                                }
                              }}
                            />
                            <label
                              htmlFor={`edit-class-${cls}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {cls}
                            </label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={editTeacherForm.control}
                  name="subjects"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subjects</FormLabel>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {availableSubjects.map((subject) => (
                          <div key={subject} className="flex items-center space-x-2">
                            <Checkbox
                              id={`edit-subject-${subject}`}
                              checked={field.value.includes(subject)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, subject])
                                } else {
                                  field.onChange(field.value.filter((value) => value !== subject))
                                }
                              }}
                            />
                            <label
                              htmlFor={`edit-subject-${subject}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {subject}
                            </label>
                          </div>
                        ))}
                      </div>
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
              Are you sure you want to delete this teacher? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                if (teacherToDelete) {
                  handleDeleteTeacher(teacherToDelete)
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
              Are you sure you want to delete {selectedTeachers.length} selected teachers? This action cannot be undone.
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
