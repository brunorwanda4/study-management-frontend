import { format } from "date-fns"; // Make sure date-fns is installed
import { ColumnDef, RowData } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import MyLink from "@/components/myComponents/myLink";
import MyImage from "@/components/myComponents/myImage";
import { studentImage } from "@/lib/context/images";
import { studentsAndOther } from "@/lib/schema/school/student.dto";
import { Locale } from "@/i18n";

const calculateAge = (
  dob: { year: number; month: number; day: number } | undefined
): number | null => {
  if (
    !dob ||
    typeof dob.year !== "number" ||
    typeof dob.month !== "number" ||
    typeof dob.day !== "number"
  ) {
    return null;
  }
  try {
    // Create date in UTC to avoid timezone issues affecting the date part
    const birthDate = new Date(Date.UTC(dob.year, dob.month - 1, dob.day)); // month is 0-indexed
    // Check if the date components resulted in a valid date
    if (
      isNaN(birthDate.getTime()) ||
      birthDate.getUTCFullYear() !== dob.year ||
      birthDate.getUTCMonth() !== dob.month - 1 ||
      birthDate.getUTCDate() !== dob.day
    ) {
      console.warn("Invalid date components for age calculation:", dob);
      return null;
    }

    const today = new Date();
    // Use UTC dates for comparison to avoid timezone shifts affecting age calculation
    const todayUTC = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    );

    let age = todayUTC.getUTCFullYear() - birthDate.getUTCFullYear();
    const m = todayUTC.getUTCMonth() - birthDate.getUTCMonth();

    if (m < 0 || (m === 0 && todayUTC.getUTCDate() < birthDate.getUTCDate())) {
      age--;
    }
    return age < 0 ? 0 : age; // Ensure age isn't negative due to future date
  } catch (e) {
    console.error("Error calculating age:", e, "Input:", dob);
    return null; // Handle potential errors during date creation/calculation
  }
};

// Extend ColumnMeta - This should be done outside the function, typically in a declaration file (.d.ts)
// or at the top level of your module if not using a separate declaration file.
// Make sure you only declare this once in your project for the module.
declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

// ========================================================================
// The complete columns() function
// ========================================================================
export const TeacherTableColumns = (
  lang: Locale
): ColumnDef<studentsAndOther>[] => {
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
      header: "Teacher",
      accessorKey: "name", // Used for sorting/filtering by name
      cell: ({ row }) => (
        <div className="flex space-x-3 items-center">
          {" "}
          {/* Increased space */}
          <MyLink
            loading
            href={`/${lang}/p/${row.original.userId}?studentId=${row.original.id}`}
            className="flex-shrink-0" // Prevent avatar shrinking
          >
            <MyImage
              role="AVATAR"
              className="size-10 rounded-full" // Explicitly rounded
              src={row.original.image || studentImage} // Use default student image if missing
              alt={row.original.name || "Student Avatar"} // Add alt text
            />
          </MyLink>
          <div className="flex flex-col overflow-hidden">
            {" "}
            {/* Prevent text overflow issues */}
            <MyLink
              loading
              className="font-medium truncate hover:underline" // Truncate long names
              href={`/${lang}/p/${row.original.userId}?studentId=${row.original.id}`}
              //   title={row.original.name || 'View Profile'} // Add title attribute
            >
              {row.original.name || "N/A"} {/* Fallback for name */}
            </MyLink>
            {/* Conditionally render email if present */}
            {row.original.email && (
              <span
                className="text-sm text-muted-foreground truncate"
                title={row.original.email} // Add title attribute
              >
                {row.original.email}
              </span>
            )}
          </div>
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
        return <div className="text-sm text-muted-foreground">N/A</div>; // Fallback
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
   

    // --- 6. Class Column ---
    {
      id: "className", // <--- ADD THIS EXPLICIT ID
      header: "Class",
      accessorKey: "class.name", // Keep this for data access
      cell: ({ row }) => {
        return (
          <MyLink href={`/${lang}/c/${row.original.classId}`} loading className="text-sm">
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
      accessorKey: "createAt",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.createAt ? (
            // Ensure createAt is treated as a Date object or valid date string
            format(new Date(row.original.createAt), "yyyy-MM-dd")
          ) : (
            <span className="text-muted-foreground">-</span>
          )}
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
