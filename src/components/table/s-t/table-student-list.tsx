"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Import resolver if using Zod for form validation
import * as z from "zod";

// UI Components (assuming these paths are correct)
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MyImage from "@/components/myComponents/myImage"; // Custom Image component

// Icons
import {
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

// Data & Schema
import { initialStudents } from "@/lib/context/student.context"; // Assuming initial data source
import { StudentDto, StudentSchema } from "@/lib/schema/school/student.dto"; // Using the provided schema

// Dialog Components (assuming these exist and accept necessary props)
import AddStudentInSchoolDialog from "@/components/table/s-t/dialog/add-student-in-school-dialog";
import DeleteStudentDialog from "@/components/table/s-t/dialog/delete-student-dialog"; // Likely for bulk delete
import EditStudentInSchoolDialog from "@/components/table/s-t/dialog/edit-student-in-school-dialog";
import DeleteConfirmationDialog from "@/components/table/s-t/dialog/delete-confirmation-dialog"; // For single delete

// Define the schema for the filter form
const FilterFormSchema = z.object({
  searchTerm: z.string().optional(),
  genderFilter: z.string().optional(),
  classFilter: z.string().optional(),
  minAge: z.string().optional(), // Keep as string for input, parse later
  maxAge: z.string().optional(), // Keep as string for input, parse later
});

type FilterFormValues = z.infer<typeof FilterFormSchema>;

// Debounce Hook (Optional but recommended for search input)
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}


export default function TableList() {
  // State for the actual student data
  const [students, setStudents] = useState<StudentDto[]>(initialStudents);

  // State for selected student IDs (for bulk actions)
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // State for dialog visibility and context
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<StudentDto | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // For single delete confirmation
  const [studentToDelete, setStudentToDelete] = useState<StudentDto | null>(null);
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false); // For bulk delete confirmation

  // --- Form Setup ---
  const filterForm = useForm<FilterFormValues>({
    // resolver: zodResolver(FilterFormSchema), // Optional: Add validation if needed
    defaultValues: {
      searchTerm: "",
      genderFilter: "All gender",
      classFilter: "All education level",
      minAge: "",
      maxAge: "",
    },
  });

  // Watch form values for filtering
  const watchedFilters = filterForm.watch();
  const debouncedSearchTerm = useDebounce(watchedFilters.searchTerm ?? "", 300); // Debounce search term


  // --- Filtering Logic ---
  const filteredStudents = useMemo(() => {
    const { genderFilter, classFilter, minAge, maxAge } = watchedFilters;
    const searchTermLower = debouncedSearchTerm.toLowerCase();
    const minAgeNum = minAge ? parseInt(minAge, 10) : -Infinity;
    const maxAgeNum = maxAge ? parseInt(maxAge, 10) : Infinity;

    // Validate age numbers
    const validMinAge = !isNaN(minAgeNum) ? minAgeNum : -Infinity;
    const validMaxAge = !isNaN(maxAgeNum) ? maxAgeNum : Infinity;


    return students.filter((student) => {
      // Search filter (Name or Email)
      const matchesSearch =
        !searchTermLower ||
        (student.name?.toLowerCase() ?? "").includes(searchTermLower) ||
        (student.email?.toLowerCase() ?? "").includes(searchTermLower);

      // Gender filter
      const matchesGender =
        !genderFilter || genderFilter === "All gender" || student.gender === genderFilter;

      // Class filter
      const matchesClass =
        !classFilter || classFilter === "All education level" || student.classId === classFilter;

      // Age filter
      const studentAge = student.age?.year; // Access the 'year' property
      const matchesAge =
         studentAge === undefined || // Allow students without age if no range specified
         ((validMinAge === -Infinity || studentAge >= validMinAge) &&
          (validMaxAge === Infinity || studentAge <= validMaxAge));


      return matchesSearch && matchesGender && matchesClass && matchesAge;
    });
  }, [students, watchedFilters, debouncedSearchTerm]); // Depend on watched values

  // --- Pagination Logic ---
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / studentsPerPage));

  // Reset to page 1 if filters change and current page becomes invalid
   useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [filteredStudents.length, totalPages, currentPage]);


  const currentStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    return filteredStudents.slice(startIndex, endIndex);
  }, [filteredStudents, currentPage, studentsPerPage]);


  // --- Selection Handlers ---
  const toggleStudent = useCallback((id: string) => {
    setSelectedStudents((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  }, []);

  const toggleAllStudents = useCallback(() => {
    if (selectedStudents.size === currentStudents.length && currentStudents.length > 0) {
      // Deselect all on the current page
       const currentPageIds = new Set(currentStudents.map(s => s.id));
       setSelectedStudents(prev => {
            const newSelection = new Set(prev);
            currentPageIds.forEach(id => newSelection.delete(id));
            return newSelection;
       });
    } else {
      // Select all on the current page
        const currentPageIds = new Set(currentStudents.map(s => s.id));
         setSelectedStudents(prev => new Set([...prev, ...currentPageIds]));
    }
  }, [currentStudents, selectedStudents.size]);


  // --- Pagination Handlers ---
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // --- Action Handlers (CRUD Placeholders) ---
  const handleAddStudent = (newStudentData: Omit<StudentDto, "id" | "createAt" | "updatedAt">) => {
    // In a real app: API call to add student
    console.log("Adding student:", newStudentData);
    const newStudent: StudentDto = {
        ...newStudentData,
        id: `new-${Date.now()}`, // Temporary ID, replace with server response
        userId: `user-${Date.now()}`, // Example User ID
        createAt: new Date(),
        updatedAt: new Date()
    };
    setStudents((prev) => [...prev, newStudent]);
    setIsAddDialogOpen(false); // Close dialog after adding
  };

  const handleEditStudent = (updatedStudentData: StudentDto) => {
    // In a real app: API call to update student
    console.log("Updating student:", updatedStudentData);
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudentData.id ? { ...s, ...updatedStudentData, updatedAt: new Date() } : s))
    );
    setIsEditDialogOpen(false); // Close dialog
    setStudentToEdit(null);
  };

  const handleDeleteStudent = (idToDelete: string) => {
    // In a real app: API call to delete student
    console.log("Deleting student:", idToDelete);
    setStudents((prev) => prev.filter((s) => s.id !== idToDelete));
    setSelectedStudents(prev => { // Remove from selection if deleted
        const newSelection = new Set(prev);
        newSelection.delete(idToDelete);
        return newSelection;
    });
    setIsDeleteDialogOpen(false); // Close confirmation dialog
    setStudentToDelete(null);
  };

   const handleBulkDelete = () => {
        // In a real app: API call to delete multiple students
        console.log("Bulk deleting students:", Array.from(selectedStudents));
        setStudents((prev) => prev.filter((s) => !selectedStudents.has(s.id)));
        setSelectedStudents(new Set()); // Clear selection
        setIsBulkDeleteDialogOpen(false); // Close confirmation dialog
    };


  // --- Dialog Open/Close Handlers ---
  const openEditDialog = (student: StudentDto) => {
    setStudentToEdit(student);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (student: StudentDto) => {
    setStudentToDelete(student);
    setIsDeleteDialogOpen(true);
  };

   const openBulkDeleteDialog = () => {
        if (selectedStudents.size > 0) {
            setIsBulkDeleteDialogOpen(true);
        }
    };


  // Determine if the "select all" checkbox should be checked or indeterminate
    const isAllSelectedOnPage = currentStudents.length > 0 && currentStudents.every(s => selectedStudents.has(s.id));
    // const isSomeSelectedOnPage = currentStudents.length > 0 && currentStudents.some(s => selectedStudents.has(s.id));

  return (
    <div className="w-full rounded-md basic-card-no-p border shadow-md bg-card "> {/* Added bg/text for shadcn theme */}
      {/* Header & Actions */}
      <div className="p-4 flex justify-between items-center border-b"> {/* Added border */}
        <h1 className="text-lg font-medium">All Students</h1>
        <div className="flex items-center gap-2">
          {selectedStudents.size > 0 && (
            <DeleteStudentDialog // Assuming this is the bulk delete confirmation
                // isOpen={isBulkDeleteDialogOpen}
                // onClose={() => setIsBulkDeleteDialogOpen(false)}
                // onConfirm={handleBulkDelete}
                // count={selectedStudents.size}
            />
          )}
          <AddStudentInSchoolDialog/>
        </div>
      </div>

      {/* Filter Form */}
      <Form {...filterForm}>
        {/* No need for onSubmit on the form tag if filtering happens on change */}
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 border-b"> {/* Use grid for responsiveness */}
          <FormField
            control={filterForm.control}
            name="searchTerm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search</FormLabel>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      {...field} // Spread field props directly
                      placeholder="Search name or email..."
                      className="pl-8" // Keep padding for icon
                    />
                  </FormControl>
                </div>
                <FormMessage /> {/* Shows validation errors if resolver is used */}
              </FormItem>
            )}
          />
          <FormField
            control={filterForm.control}
            name="genderFilter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange} // Use field.onChange directly
                  defaultValue={field.value} // Use field.value directly
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="All gender">All gender</SelectItem>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                     <SelectItem value="OTHER">Other</SelectItem> {/* Optional: Add if needed */}
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
              <FormItem>
                <FormLabel>Education Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="All education level">All Levels</SelectItem>
                    {/* Dynamically generate these from available classes if possible */}
                    <SelectItem value="L1">L1</SelectItem>
                    <SelectItem value="L2">L2</SelectItem>
                    <SelectItem value="L3">L3</SelectItem>
                     <SelectItem value="M1">M1</SelectItem>
                      <SelectItem value="M2">M2</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
           {/* Age Range Filter */}
           <div className=" col-span-1 md:col-span-2 lg:col-span-1"> {/* Adjust grid span */}
                <Label htmlFor="min-age">Age Range</Label>
                <div className="flex gap-2 items-center mt-2"> {/* Align items */}
                    <FormField
                        control={filterForm.control}
                        name="minAge"
                        render={({ field }) => (
                            <FormItem className="flex-1"> {/* Allow input to grow */}
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="min-age"
                                        placeholder="Min"
                                        type="number"
                                        min="0" // Basic validation
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <span className="text-muted-foreground">-</span> {/* Separator */}
                    <FormField
                        control={filterForm.control}
                        name="maxAge"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                         {...field}
                                        id="max-age"
                                        placeholder="Max"
                                        type="number"
                                        min="0"
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

      {/* Student Table */}
      <div className="overflow-x-auto"> {/* Ensure table scrolls horizontally if needed */}
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">
                    <Checkbox
                         checked={isAllSelectedOnPage}
                         // indeterminate={isSomeSelectedOnPage && !isAllSelectedOnPage} // Requires shadcn v1+ for indeterminate state
                         onCheckedChange={toggleAllStudents}
                         aria-label="Select all students on current page"
                         disabled={currentStudents.length === 0} // Disable if no students on page
                    />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Phone</TableHead> {/* Changed from Phone number */}
                    <TableHead className="w-[50px] text-right">Actions</TableHead> {/* Align right */}
                </TableRow>
                </TableHeader>
                <TableBody>
                {currentStudents.length > 0 ? (
                    currentStudents.map((student) => (
                    <TableRow key={student.id} data-state={selectedStudents.has(student.id) ? "selected" : undefined}>
                        <TableCell>
                        <Checkbox
                            checked={selectedStudents.has(student.id)}
                            onCheckedChange={() => toggleStudent(student.id)}
                             aria-label={`Select student ${student.name}`}
                        />
                        </TableCell>
                        <TableCell>
                        <div className="flex items-center gap-3">
                             <MyImage
                                className="size-10 object-cover" // Ensure image covers area
                                src={student.image || "/placeholder.svg"} // Fallback placeholder
                                alt={student.name ?? 'Student image'}
                                classname="mask mask-squircle"
                            />
                            <div>
                                <div className="font-medium">{student.name ?? 'N/A'}</div>
                                <div className="text-muted-foreground text-xs mt-0.5">
                                    {student.email ?? 'No email'}
                                </div>
                            </div>
                        </div>
                        </TableCell>
                        <TableCell>{student.gender ?? 'N/A'}</TableCell>
                        <TableCell>{student.age?.year ?? 'N/A'}</TableCell> {/* Access year */}
                        <TableCell>{student.classId ?? 'N/A'}</TableCell>
                        <TableCell>{student.phone ?? 'N/A'}</TableCell>
                        <TableCell className="text-right"> {/* Align right */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                 <span className="sr-only">Student Actions</span> {/* Accessibility */}
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => openEditDialog(student)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-destructive" // Use destructive color from theme
                                onSelect={() => openDeleteDialog(student)}
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
                    <TableCell colSpan={7} className="h-24 text-center"> {/* Use h-24 for consistent height */}
                        No students found matching your criteria.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>


      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t">
        <div className="text-sm text-muted-foreground">
           {selectedStudents.size > 0 ? (
             `${selectedStudents.size} student${selectedStudents.size !== 1 ? 's' : ''} selected.`
           ) : (
                filteredStudents.length > 0 ? (
                 `Showing ${ (currentPage - 1) * studentsPerPage + 1} to ${Math.min(currentPage * studentsPerPage, filteredStudents.length)} of ${filteredStudents.length} students.`
             ) : (
                  "No students to display."
             )
           )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm" // Consistent button size
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
             variant="outline"
             size="sm"
             onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Dialog Components (Render them conditionally or manage visibility internally) */}
        {/* Example assuming dialogs take isOpen, onClose, and relevant data/handlers */}
       {/* <AddStudentInSchoolDialog
            isOpen={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
            onSave={handleAddStudent}
        /> */}

       <EditStudentInSchoolDialog
            isOpen={isEditDialogOpen}
            onClose={() => { setIsEditDialogOpen(false); setStudentToEdit(null); }}
            // onSave={handleEditStudent}
            // studentData={studentToEdit} // Pass the student data to the edit dialog
        />

        {/* Single Delete Confirmation */}
       {/* <DeleteConfirmationDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => { setIsDeleteDialogOpen(false); setStudentToDelete(null); }}
            onConfirm={() => studentToDelete && handleDeleteStudent(studentToDelete.id)}
            itemName={studentToDelete?.name ?? 'this student'} // Display item name
        /> */}

        {/* Bulk Delete Confirmation */}
       {/* <DeleteStudentDialog // Assuming this is for bulk deletion
            isOpen={isBulkDeleteDialogOpen}
            onClose={() => setIsBulkDeleteDialogOpen(false)}
            onConfirm={handleBulkDelete}
            count={selectedStudents.size}
        /> */}
    </div>
  );
}