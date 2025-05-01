"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// --- UI Imports ---
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
import MyImage from "@/components/myComponents/myImage";
import MyLink from "@/components/myComponents/myLink";

// --- Icons ---
import {
  MoreHorizontal,
  Edit,
  Trash2,
  PlusCircle,
  Trash,
  Search,
  ChevronLeft,
  ChevronRight, // Added PlusCircle, Trash
} from "lucide-react";

// --- Data & Types ---
import { StudentDto, studentsAndOther } from "@/lib/schema/school/student.dto";
import { Locale } from "@/i18n";
import { ViewDataClassDto } from "@/lib/schema/class/view-data-class.dto";
import { studentImage } from "@/lib/context/images";

// --- Reusable Modal Components ---
import { CreateStudentModal } from "@/components/page/school-staff/dialog/CreateStudentModal"; // Adjust path
import { UpdateStudentModal } from "@/components/page/school-staff/dialog/UpdateStudentModal"; // Adjust path
import { DeleteStudentModal } from "@/components/page/school-staff/dialog/DeleteStudentModal"; // Adjust path
import { BulkDeleteStudentModal } from "@/components/page/school-staff/dialog/BulkDeleteStudentModal"; // Adjust path

// --- Filter Form Schema ---
const FilterFormSchema = z.object({
  searchTerm: z.string().optional(),
  genderFilter: z.string().optional(),
  classFilter: z.string().optional(),
  minAge: z.string().optional(),
  maxAge: z.string().optional(),
});
type FilterFormValues = z.infer<typeof FilterFormSchema>;

// --- Debounce Hook (Keep as is) ---
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// --- Component Props ---
interface StudentTableProps {
  schoolStudents: studentsAndOther[];
  lang: Locale;
  cls: ViewDataClassDto[];
}

// --- Main Table Component ---
export default function StudentTable({
  schoolStudents,
  lang,
  cls,
}: StudentTableProps) {
  const [students, setStudents] = useState<studentsAndOther[]>(schoolStudents);
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // --- Modal State ---
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<StudentDto | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<StudentDto | null>(
    null
  );
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

  // --- Filter Form ---
  const filterForm = useForm<FilterFormValues>({
    resolver: zodResolver(FilterFormSchema),
    defaultValues: {
      /* ... same default values ... */ searchTerm: "",
      genderFilter: "All gender",
      classFilter: "All education level",
      minAge: "",
      maxAge: "",
    },
  });
  const watchedFilters = filterForm.watch();
  const debouncedSearchTerm = useDebounce(watchedFilters.searchTerm ?? "", 300);

  // --- Filtering Logic (Keep as is) ---
  const filteredStudents = useMemo(() => {
    const { genderFilter, classFilter, minAge, maxAge } = watchedFilters;
    const searchTermLower = debouncedSearchTerm.toLowerCase();
    const minAgeNum = minAge ? parseInt(minAge, 10) : -Infinity;
    const maxAgeNum = maxAge ? parseInt(maxAge, 10) : Infinity;

    const validMinAge = !isNaN(minAgeNum) ? minAgeNum : -Infinity;
    const validMaxAge = !isNaN(maxAgeNum) ? maxAgeNum : Infinity;

    return students.filter((student) => {
      const matchesSearch =
        !searchTermLower ||
        (student.name?.toLowerCase() ?? "").includes(searchTermLower) ||
        (student.email?.toLowerCase() ?? "").includes(searchTermLower);

      const matchesGender =
        !genderFilter ||
        genderFilter === "All gender" ||
        student.gender === genderFilter;

      // Ensure student.class exists before accessing its properties
      const matchesClass =
        !classFilter ||
        classFilter === "All education level" ||
        (student.class && student.classId === classFilter);

      const studentAge = student.age?.year;
      const matchesAge =
        studentAge === undefined ||
        ((validMinAge === -Infinity || studentAge >= validMinAge) &&
          (validMaxAge === Infinity || studentAge <= validMaxAge));

      return matchesSearch && matchesGender && matchesClass && matchesAge;
    });
  }, [students, watchedFilters, debouncedSearchTerm]);

  // --- Pagination Logic (Keep as is) ---
  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / studentsPerPage)
  );
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

  // --- Selection Handlers (Keep as is) ---
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
    if (
      selectedStudents.size === currentStudents.length &&
      currentStudents.length > 0
    ) {
      const currentPageIds = new Set(currentStudents.map((s) => s.id));
      setSelectedStudents((prev) => {
        const newSelection = new Set(prev);
        currentPageIds.forEach((id) => newSelection.delete(id));
        return newSelection;
      });
    } else {
      const currentPageIds = new Set(currentStudents.map((s) => s.id));
      setSelectedStudents((prev) => new Set([...prev, ...currentPageIds]));
    }
  }, [currentStudents, selectedStudents.size]);

  // --- Pagination Handlers (Keep as is) ---
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Update state to go to next page
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Update state to go to previous page
    }
  };
  // --- CRUD Handlers (These now update state and close modals) ---
  // --- CRUD Handlers (Fixing Type Errors for 'class') ---

  const handleCreateStudent = useCallback(
    (
      newStudentData: Omit<
        StudentDto,
        "id" | "userId" | "createAt" | "updatedAt" | "age" | "image" | "class"
      >
    ) => {
      console.log("Adding student:", newStudentData);
      // const tempId = `new-${Date.now()}`;
      // const tempUserId = `user-${Date.now()}`;
      // const correspondingClass = cls.find(
      //   (c) => c.id === newStudentData.classId
      // );

      // Define a default structure for the 'class' object based on 'studentsAndOther' type definition
      // Provide defaults for ALL REQUIRED fields not present in 'correspondingClass' (ViewDataClassDto)
      // const defaultClassDetails = {
      //   code: "N/A", // Provide default
      //   createAt: new Date(), // Provide default
      //   updatedAt: new Date(), // Provide default
      //   username: "N/A", // Provide default
      //   // Add defaults for any other REQUIRED fields in the class type definition
      //   schoolId: null, // Example if optional/nullable
      //   image: null, // Example if optional/nullable
      //   creatorId: null, // Example if optional/nullable
      //   // Optional fields can be omitted or set to undefined if allowed by the type
      // };

      // Construct the class object for the new student
      // const newStudentClass = correspondingClass
      //   ? {
      //       ...defaultClassDetails, // Start with defaults
      //       ...correspondingClass, // Override with available data from cls (like id, name)
      //       id: correspondingClass.id, // Ensure id is explicitly set
      //       name: correspondingClass.name, // Ensure name is explicitly set
      //     }
      //   : {
      //       // If class not found in cls, create a placeholder matching the type
      //       ...defaultClassDetails,
      //       id: newStudentData.classId,
      //       name: "Unknown",
      //     };

      // // Define a default user object matching UserDto (Adjust based on your actual UserDto)
      // const defaultUser: StudentDto["user"] = {
      //   id: tempUserId,
      //   name: newStudentData.name,
      //   email: newStudentData.email,
      //   image: null,
      //   role: "STUDENT",
      //   createAt: new Date(),
      //   updatedAt: new Date(),
      //   username: `user-${tempId}`, // Placeholder
      //   // Add other required fields for UserDto
      // };

      // Construct the full new student object matching 'studentsAndOther'
      // const newStudent: studentsAndOther = {
      //   ...newStudentData,
      //   id: tempId,
      //   userId: tempUserId,
      //   createAt: new Date(),
      //   updatedAt: new Date(),
      //   age: undefined, // Or calculate if DOB is available
      //   image: undefined,
      //   class: newStudentClass as studentsAndOther["class"], // Assert type if necessary after merging
      //   // Add ALL other required fields for 'studentsAndOther'
      //   user: defaultUser as studentsAndOther["user"], // Use the default user, assert type
      //   // _count: { session_user_student: 0 }, // Default count
      //   // Add any other required fields from studentsAndOther
      // };

      setStudents((prev) => [...prev, newStudent]); // Now 'newStudent' should match the expected type
      setIsCreateModalOpen(false);
    },
    [cls]
  ); // Add cls dependency

  

  const handleDeleteStudent = useCallback((idToDelete: string) => {
    // In a real app: API call to delete student
    console.log("Deleting student:", idToDelete);
    setStudents((prev) => prev.filter((s) => s.id !== idToDelete));
    setSelectedStudents((prev) => {
      const newSelection = new Set(prev);
      newSelection.delete(idToDelete);
      return newSelection;
    });
    setIsDeleteModalOpen(false); // Close modal
    setStudentToDelete(null);
  }, []);

  const handleBulkDelete = useCallback(() => {
    // In a real app: API call to delete multiple students
    console.log("Bulk deleting students:", Array.from(selectedStudents));
    setStudents((prev) => prev.filter((s) => !selectedStudents.has(s.id)));
    setSelectedStudents(new Set()); // Clear selection
    setIsBulkDeleteModalOpen(false); // Close modal
  }, [selectedStudents]);

  // --- Modal Open/Close Triggers ---
  const openUpdateModal = (student: StudentDto) => {
    setStudentToEdit(student);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (student: StudentDto) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const openBulkDeleteModal = () => {
    if (selectedStudents.size > 0) {
      setIsBulkDeleteModalOpen(true);
    }
  };

  // --- Render Logic ---
  const isAllSelectedOnPage =
    currentStudents.length > 0 &&
    currentStudents.every((s) => selectedStudents.has(s.id));

  return (
    <div className="w-full rounded-md basic-card-no-p border shadow-md bg-card">
      {/* Header & Actions */}
      <div className="p-4 flex justify-between items-center border-b">
        <h1 className="text-lg font-medium">All Students</h1>
        <div className="flex items-center gap-2">
          {/* Bulk Delete Trigger Button */}
          {selectedStudents.size > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={openBulkDeleteModal} // Open modal on click
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete ({selectedStudents.size})
            </Button>
          )}
          {/* Add Student Trigger Button */}
          <Button size="sm" onClick={() => setIsCreateModalOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Filter Form (Keep as is) */}
      {/* Filter Form (Fix Render Props) */}
      <Form {...filterForm}>
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 border-b">
          {/* Search Term Field */}
          <FormField
            control={filterForm.control}
            name="searchTerm"
            render={(
              { field } // <-- Restore implementation
            ) => (
              <FormItem>
                <FormLabel>Search</FormLabel>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Search name or email..."
                      className="pl-8"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Gender Filter Field */}
          <FormField
            control={filterForm.control}
            name="genderFilter"
            render={(
              { field } // <-- Restore implementation
            ) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Class Filter Field (Keep as is - was already fixed) */}
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
                    <SelectItem value="All education level">
                      All Levels
                    </SelectItem>
                    {cls.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Age Range Fields */}
          <div className=" col-span-1 md:col-span-2 lg:col-span-1">
            <Label htmlFor="min-age">Age Range</Label>
            <div className="flex gap-2 items-center mt-2">
              <FormField
                control={filterForm.control}
                name="minAge"
                render={(
                  { field } // <-- Restore implementation
                ) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        id="min-age"
                        placeholder="Min"
                        type="number"
                        min="0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="text-muted-foreground">-</span>
              <FormField
                control={filterForm.control}
                name="maxAge"
                render={(
                  { field } // <-- Restore implementation
                ) => (
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

      {/* Student Table (Keep structure, update actions) */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={isAllSelectedOnPage}
                  onCheckedChange={toggleAllStudents}
                  aria-label="Select all students on current page"
                  disabled={currentStudents.length === 0}
                />
              </TableHead>
              {/* Table Headers remain the same */}
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="w-[50px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <TableRow
                  key={student.id}
                  data-state={
                    selectedStudents.has(student.id) ? "selected" : undefined
                  }
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedStudents.has(student.id)}
                      onCheckedChange={() => toggleStudent(student.id)}
                      aria-label={`Select student ${student.name}`}
                    />
                  </TableCell>
                  {/* Data Cells remain the same */}
                  <TableCell>
                    {" "}
                    {/* Name + Email + Image */}
                    <div className="flex items-center gap-3">
                      <MyLink
                        href={`/${lang}/p/${student.userId}?studentId=${student.id}`}
                      >
                        <MyImage src={studentImage} /* ... */ />
                      </MyLink>
                      <div>
                        <MyLink
                          className="font-medium"
                          href={`/${lang}/p/${student.userId}?studentId=${student.id}`}
                        >
                          {student.name ?? "N/A"}
                        </MyLink>
                        <div className="text-muted-foreground text-xs mt-0.5">
                          {student.email ?? "No email"}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.gender ?? "N/A"}</TableCell>
                  <TableCell>{student.age?.year ?? "N/A"}</TableCell>
                  <TableCell>{student.class?.name ?? "N/A"}</TableCell>{" "}
                  {/* Use student.class.name */}
                  <TableCell>{student.phone ?? "N/A"}</TableCell>
                  <TableCell className="text-right">
                    {/* Actions Dropdown - Triggers modal state changes */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Student Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onSelect={() => openUpdateModal(student)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onSelect={() => openDeleteModal(student)}
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
              /* No results row remains the same */
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No students found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t">
        <div className="text-sm text-muted-foreground">
          {/* Selection/Count Info (Keep as is) */}
          {selectedStudents.size > 0
            ? `${selectedStudents.size} student${
                selectedStudents.size !== 1 ? "s" : ""
              } selected.`
            : filteredStudents.length > 0
            ? `Showing ${(currentPage - 1) * studentsPerPage + 1} to ${Math.min(
                currentPage * studentsPerPage,
                filteredStudents.length
              )} of ${filteredStudents.length} students.`
            : "No students to display."}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm" // Consistent button size
            onClick={goToPreviousPage} // <-- Connect Previous handler
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage} // <-- Connect Next handler
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      {/* Pagination Footer (Keep as is) */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t">
        {/* Selection/Count Info */}
        <div className="text-sm text-muted-foreground"> {/* ... */} </div>
        {/* Pagination Buttons */}
        <div className="flex gap-2"> {/* ... */} </div>
      </div>

      {/* Render Modal Components */}
      <CreateStudentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateStudent}
        classes={cls} // Pass available classes
      />

      {/* <UpdateStudentModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setStudentToEdit(null); // Clear student data on close
        }}
        // onSave={handleUpdateStudent}
        studentData={studentToEdit} // Pass the student to edit
        classes={cls} // Pass available classes
      /> */}

      <DeleteStudentModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setStudentToDelete(null); // Clear student data on close
        }}
        onConfirm={() =>
          studentToDelete && handleDeleteStudent(studentToDelete.id)
        }
        studentName={studentToDelete?.name} // Pass name for confirmation
      />

      <BulkDeleteStudentModal
        isOpen={isBulkDeleteModalOpen}
        onClose={() => setIsBulkDeleteModalOpen(false)}
        onConfirm={handleBulkDelete}
        count={selectedStudents.size} // Pass the count
      />
    </div>
  );
}
