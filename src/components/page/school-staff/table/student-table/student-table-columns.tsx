import MyLink from "@/components/common/myLink";
import StudentModifySheet from "@/components/page/school-staff/students-components/student-modify-sheet";
import { Checkbox } from "@/components/ui/checkbox";
import type { Locale } from "@/i18n";
import type { StudentWithRelations } from "@/lib/schema/relations-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { calculateAge, formatReadableDate } from "@/lib/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";

export const StudentTableColumns = (
  lang: Locale,
  auth: AuthContext,
): ColumnDef<StudentWithRelations>[] => {
  return [
    // --- 1. Selection Column ---
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="ms-[-4px]" // Adjust alignment if needed
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="ms-[-4px]" // Adjust alignment if needed
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40, // Fix size for checkbox column
    },

    // --- 2. Student Info Column (Image, Name, Email) ---
    {
      header: "Student",
      accessorKey: "name", // Used for sorting/filtering by name
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <StudentModifySheet
            isTable
            isSchool
            auth={auth}
            student={row.original}
          />
        </div>
      ),
      meta: {
        filterVariant: "text", // Enable text filtering on the name
      },
      enableSorting: true, // Allow sorting by name
      size: 250, // Suggest a size
    },

    // --- 3. Student ID Column ---
    // {
    //     header: "Student ID",
    //     accessorKey: "id",
    //     cell: ({ row }) => (
    //         <div className="font-mono text-xs text-muted-foreground"> {/* Smaller mono font */}
    //             {row.original.id}
    //         </div>
    //     ),
    //     meta: {
    //       filterVariant: "text",
    //     },
    //     enableSorting: true, // Allow sorting by ID
    //     size: 150, // Suggest a size
    // },

    // --- 4. Gender Column ---
    {
      header: "Gender",
      accessorKey: "gender",
      cell: ({ row }) => {
        // Provide user-friendly display
        const gender = row.original.gender;
        if (gender === "MALE") return <div className="text-sm">Male</div>;
        if (gender === "FEMALE") return <div className="text-sm">Female</div>;
        return <div className="text-muted-foreground text-sm">N/A</div>; // Fallback
      },
      enableSorting: false, // Sorting by gender might not be common
      meta: {
        filterVariant: "select",
      },
      // Filter function to handle potential null/undefined and match values
      filterFn: (row, id, filterValue) => {
        const rowValue = row.getValue(id) as string | undefined | null;
        if (!filterValue) return true; // No filter applied
        if (!rowValue) return false; // Row has no value, doesn't match
        return rowValue === filterValue; // Direct comparison
      },
      size: 100, // Suggest a size
    },

    // --- 5. Age Column ---
    {
      header: "Age",
      accessorKey: "age", // Access the age object {year, month, day}
      // Custom sorting function based on calculated age
      sortingFn: (rowA, rowB, columnId) => {
        const ageA = calculateAge(rowA.getValue(columnId));
        const ageB = calculateAge(rowB.getValue(columnId));
        // Handle nulls during sorting (e.g., place them at the end)
        if (ageA === null && ageB === null) return 0;
        if (ageA === null) return 1;
        if (ageB === null) return -1;
        return ageA < ageB ? -1 : ageA > ageB ? 1 : 0;
      },
      cell: ({ row }) => {
        const age = calculateAge(row.original.date_of_birth);
        return (
          <div className="text-sm">{age !== null ? `${age} yrs` : "N/A"}</div>
        ); // Display calculated age or fallback
      },
      meta: {
        filterVariant: "range", // Use range filter
      },
      // Custom filter function for the range based on calculated age
      filterFn: (row, id, filterValue) => {
        const age = calculateAge(row.getValue(id)); // Calculate age for filtering
        if (age === null) return false; // Exclude rows without calculable age from range results

        const [min, max] = filterValue as [
          number | undefined,
          number | undefined,
        ];

        // Check against min and max boundaries
        if (min !== undefined && max !== undefined) {
          return age >= min && age <= max;
        }
        if (min !== undefined) {
          return age >= min;
        }
        if (max !== undefined) {
          return age <= max;
        }
        return true; // No range specified, include the row
      },
      size: 80, // Suggest a size
    },

    // --- 6. Class Column ---
    {
      id: "className", // <--- ADD THIS EXPLICIT ID
      header: "Class",
      accessorKey: "class.name", // Keep this for data access
      cell: ({ row }) => {
        return (
          <MyLink
            href={`/${lang}/c/${row.original.class_id}`}
            loading
            className="text-sm"
          >
            {row.original.class?.name || (
              <span className="text-muted-foreground">Unassigned</span>
            )}
          </MyLink>
        );
      },
      enableSorting: true,
      meta: {
        filterVariant: "select",
      },
      filterFn: (row, id, filterValue) => {
        const rowValue = row.original.class?.name;
        if (!filterValue) return true;
        if (!rowValue) return false;
        return rowValue === filterValue;
      },
      size: 180,
    }, // <-- End of Class column definition

    // --- 7. Phone Column ---
    {
      header: "Phone",
      accessorKey: "phone",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.phone || (
            <span className="text-muted-foreground">-</span>
          )}
        </div>
      ), // Display phone or fallback
      enableSorting: false, // Sorting by phone number usually not needed
      meta: {
        filterVariant: "text",
      },
      size: 150, // Suggest a size
    },

    // --- 8. Enrollment Date Column ---
    {
      header: "Enrolled On",
      accessorKey: "created_at",
      cell: ({ row }) => (
        <div className="text-sm">
          {formatReadableDate(row.original.created_at)}
        </div>
      ),
      enableSorting: true, // Allow sorting by date
      meta: {
        filterVariant: "text", // Simple text filter on formatted date, or implement date range later
      },
      size: 120, // Suggest a size
    },
  ];
};
