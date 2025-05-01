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
  newStaffFormSchema,
  editStaffFormSchema,
  type NewStaffForm,
  type EditStaffForm,
} from "@/lib/schema/table-forms/staff-forms"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import StaffForm from "@/components/table/s-t/dialogs/staff-form"

// Initial staff data
const initialStaff = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    gender: "Male",
    age: "35 Years",
    role: "Teacher",
    phone: "0788123456",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    gender: "Female",
    age: "42 Years",
    role: "Administrator",
    phone: "0788654321",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    gender: "Male",
    age: "38 Years",
    role: "Principal",
    phone: "0788987654",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    gender: "Female",
    age: "29 Years",
    role: "Counselor",
    phone: "0788456789",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    gender: "Male",
    age: "45 Years",
    role: "Teacher",
    phone: "0788234567",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function StaffList() {
  // State for selected staff
  const [selectedStaff, setSelectedStaff] = useState<string[]>([])

  // State for staff data
  const [staff, setStaff] = useState(initialStaff)

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const staffPerPage = 5

  // State for filters
  const [searchTerm, setSearchTerm] = useState("")
  const [genderFilter, setGenderFilter] = useState("All gender")
  const [roleFilter, setRoleFilter] = useState("All roles")
  const [minAge, setMinAge] = useState("")
  const [maxAge, setMaxAge] = useState("")

  // State for dialog open status
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null)
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)

  // Form for adding a new staff member
  const addStaffForm = useForm<NewStaffForm>({
    resolver: zodResolver(newStaffFormSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "Male",
      age: "",
      role: "Teacher",
      phone: "",
    },
  })

  // Form for editing a staff member
  const editStaffForm = useForm<EditStaffForm>({
    resolver: zodResolver(editStaffFormSchema),
    defaultValues: {
      id: "",
      name: "",
      email: "",
      gender: "Male",
      age: "",
      role: "Teacher",
      phone: "",
    },
  })

  // Form for filters
  const filterForm = useForm({
    defaultValues: {
      searchTerm: "",
      genderFilter: "All gender",
      roleFilter: "All roles",
      minAge: "",
      maxAge: "",
    },
  })

  // Toggle staff selection
  const toggleStaff = (id: string) => {
    setSelectedStaff((prev) => (prev.includes(id) ? prev.filter((staffId) => staffId !== id) : [...prev, id]))
  }

  // Toggle all staff selection
  const toggleAllStaff = () => {
    if (selectedStaff.length === currentStaff.length) {
      setSelectedStaff([])
    } else {
      setSelectedStaff(currentStaff.map((staffMember) => staffMember.id))
    }
  }

  // Handle adding a new staff member
  const handleAddStaff = (data: NewStaffForm) => {
    const newId = (staff.length + 1).toString()
    const staffToAdd = {
      ...data,
      id: newId,
      age: data.age + " Years",
      image: "/placeholder.svg?height=40&width=40",
    }

    setStaff([...staff, staffToAdd])
    setIsAddDialogOpen(false)
    addStaffForm.reset()
  }

  // Prepare staff for editing
  const prepareStaffForEdit = (staffMember: (typeof initialStaff)[0]) => {
    const age = staffMember.age.replace(" Years", "")
    editStaffForm.reset({
      id: staffMember.id,
      name: staffMember.name,
      email: staffMember.email,
      gender: staffMember.gender as "Male" | "Female",
      age: age,
      role: staffMember.role,
      phone: staffMember.phone,
    })
    setIsEditDialogOpen(true)
  }

  // Handle editing a staff member
  const handleEditStaff = (data: EditStaffForm) => {
    setStaff(
      staff.map((staffMember) =>
        staffMember.id === data.id
          ? {
              ...staffMember,
              name: data.name,
              email: data.email,
              gender: data.gender,
              age: data.age.includes("Years") ? data.age : data.age + " Years",
              role: data.role,
              phone: data.phone,
            }
          : staffMember,
      ),
    )

    setIsEditDialogOpen(false)
  }

  // Handle deleting a staff member
  const handleDeleteStaff = (id: string) => {
    setStaff(staff.filter((staffMember) => staffMember.id !== id))
    setSelectedStaff(selectedStaff.filter((staffId) => staffId !== id))
    setStaffToDelete(null)
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    setStaff(staff.filter((staffMember) => !selectedStaff.includes(staffMember.id)))
    setSelectedStaff([])
    setIsBulkDeleteDialogOpen(false)
  }

  // Apply filters from form
  const applyFilters = (data: any) => {
    setSearchTerm(data.searchTerm || "")
    setGenderFilter(data.genderFilter)
    setRoleFilter(data.roleFilter)
    setMinAge(data.minAge || "")
    setMaxAge(data.maxAge || "")
    setCurrentPage(1) // Reset to first page on filter change
  }

  // Filter staff based on search and filters
  const filteredStaff = staff.filter((staffMember) => {
    // Search filter
    const matchesSearch =
      staffMember.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staffMember.email.toLowerCase().includes(searchTerm.toLowerCase())

    // Gender filter
    const matchesGender = genderFilter === "All gender" || staffMember.gender === genderFilter

    // Role filter
    const matchesRole = roleFilter === "All roles" || staffMember.role === roleFilter

    // Age filter
    const staffAge = Number.parseInt(staffMember.age.split(" ")[0])
    const matchesMinAge = !minAge || staffAge >= Number.parseInt(minAge)
    const matchesMaxAge = !maxAge || staffAge <= Number.parseInt(maxAge)

    return matchesSearch && matchesGender && matchesRole && matchesMinAge && matchesMaxAge
  })

  // Calculate pagination
  const indexOfLastStaff = currentPage * staffPerPage
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage
  const currentStaff = filteredStaff.slice(indexOfFirstStaff, indexOfLastStaff)
  const totalPages = Math.ceil(filteredStaff.length / staffPerPage)

  // Reset to first page when filtered results change
  useEffect(() => {
    if (currentPage > Math.max(1, totalPages)) {
      setCurrentPage(Math.max(1, totalPages))
    }
  }, [filteredStaff.length, totalPages, currentPage])

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
    filterForm.setValue("roleFilter", roleFilter as any)
    filterForm.setValue("minAge", minAge)
    filterForm.setValue("maxAge", maxAge)
  }, [searchTerm, genderFilter, roleFilter, minAge, maxAge, filterForm])

  return (
    <div className="w-full rounded-md basic-card-no-p border shadow-md">
      <div className="text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-medium">All Staff Members</h1>

        <div className="flex gap-2">
          {selectedStaff.length > 0 && (
            <Button variant="destructive" size="sm" onClick={() => setIsBulkDeleteDialogOpen(true)} className="mr-2">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          )}
          <Dialog
            open={isAddDialogOpen}
            onOpenChange={(open) => {
              setIsAddDialogOpen(open)
              if (!open) addStaffForm.reset()
            }}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="basic-title-sm hover:bg-gray-100">
                <UserPlus className="h-4 w-4 mr-2" />
                Add new Staff
              </Button>
            </DialogTrigger>
            <StaffForm/>
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
            name="roleFilter"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-white">Role</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    setRoleFilter(value)
                    setCurrentPage(1)
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger id="role-filter" className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-800 text-white border-slate-700">
                    <SelectItem value="All roles">All roles</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Principal">Principal</SelectItem>
                    <SelectItem value="Counselor">Counselor</SelectItem>
                    <SelectItem value="Librarian">Librarian</SelectItem>
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
                checked={currentStaff.length > 0 && selectedStaff.length === currentStaff.length}
                onCheckedChange={toggleAllStaff}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Phone number</TableHead>
            <TableHead className="w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentStaff.length > 0 ? (
            currentStaff.map((staffMember) => (
              <TableRow key={staffMember.id} className="text-white border-t border-slate-400">
                <TableCell className="p-2">
                  <Checkbox
                    checked={selectedStaff.includes(staffMember.id)}
                    onCheckedChange={() => toggleStaff(staffMember.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      className="rounded-full"
                      src={staffMember.image || "/placeholder.svg"}
                      width={40}
                      height={40}
                      alt={staffMember.name}
                    />
                    <div>
                      <div className="font-medium">{staffMember.name}</div>
                      <span className="text-muted-foreground mt-0.5 text-xs">{staffMember.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{staffMember.role}</TableCell>
                <TableCell>{staffMember.gender}</TableCell>
                <TableCell>{staffMember.age}</TableCell>
                <TableCell>{staffMember.phone}</TableCell>
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
                          prepareStaffForEdit(staffMember)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500 hover:bg-slate-700 focus:bg-slate-700"
                        onSelect={(e) => {
                          e.preventDefault()
                          setStaffToDelete(staffMember.id)
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
                No staff members found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center p-4 text-white">
        <div>
          {filteredStaff.length > 0 && (
            <p>
              Showing {indexOfFirstStaff + 1} to {Math.min(indexOfLastStaff, filteredStaff.length)} of{" "}
              {filteredStaff.length} staff members
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

      {/* Edit Staff Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open)
          if (!open) editStaffForm.reset()
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Staff Member</DialogTitle>
          </DialogHeader>
          <Form {...editStaffForm}>
            <form onSubmit={editStaffForm.handleSubmit(handleEditStaff)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editStaffForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter staff name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editStaffForm.control}
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
                  control={editStaffForm.control}
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
                  control={editStaffForm.control}
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
                  control={editStaffForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-800 text-white border-slate-700">
                          <SelectItem value="Teacher">Teacher</SelectItem>
                          <SelectItem value="Administrator">Administrator</SelectItem>
                          <SelectItem value="Principal">Principal</SelectItem>
                          <SelectItem value="Counselor">Counselor</SelectItem>
                          <SelectItem value="Librarian">Librarian</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editStaffForm.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Enter age" />
                      </FormControl>
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
              Are you sure you want to delete this staff member? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                if (staffToDelete) {
                  handleDeleteStaff(staffToDelete)
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
              Are you sure you want to delete {selectedStaff.length} selected staff members? This action cannot be
              undone.
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
