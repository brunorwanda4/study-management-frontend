import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import { Checkbox } from "@/components/ui/checkbox";
import { Locale } from "@/i18n";
import { studentImage } from "@/lib/context/images";
import { TeacherDto } from "@/lib/schema/school/teacher.dto";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns"; // Make sure date-fns is installed

// Extend ColumnMeta - This should be done outside the function, typically in a declaration file (.d.ts)
// or at the top level of your module if not using a separate declaration file.
// Make sure you only declare this once in your project for the module.

// ========================================================================
// The complete columns() function
// ========================================================================
export const TeacherTableColumns = (lang: Locale): ColumnDef<TeacherDto>[] => {
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
        <div className="flex items-center space-x-3">
          <MyLink
            loading
            href={`/${lang}/p/${row.original.userId}teacherId=${row.original.id}`}
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
              className="truncate font-medium hover:underline" // Truncate long names
              href={`/${lang}/p/${row.original.userId}teacherId=${row.original.id}`}
              //   title={row.original.name || 'View Profile'} // Add title attribute
            >
              {row.original.name || "N/A"} {/* Fallback for name */}
            </MyLink>
            {/* Conditionally render email if present */}
            {row.original.email && (
              <span
                className="text-muted-foreground truncate text-sm"
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
