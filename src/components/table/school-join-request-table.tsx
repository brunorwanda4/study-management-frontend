/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel, // Keep this one
  getSortedRowModel,
  RowData,
  SortingState,
  useReactTable,
  FilterFn, // Import FilterFn
  // REMOVE THIS LINE: getGlobalFilteredRowModel,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
  SortAscIcon,
  UserIcon,
} from "lucide-react"; // Added UserIcon
import Link from "next/link"; // Assuming you use Next.js for links

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"; // Import Button
import {
  SchoolJoinRequestDto,
  SchoolJoinRequestSchema, // Assuming your DTO matches the Zod schema structure
} from "@/lib/schema/school/school-join-request.schema"; // Adjust path as needed

// Define SchoolStaffRoles and valid roles (as provided)
export const SchoolStaffRoles = [
  { value: "HeadTeacher", label: "Head Teacher" },
  { value: "DeputyHeadTeacher", label: "Deputy Head Teacher" },
  { value: "DirectorOfStudies", label: "Director of Studies" },
  { value: "HeadOfDepartment", label: "Head of Department" },
  { value: "Librarian", label: "Librarian" },
  { value: "SchoolSecretary", label: "School Secretary" },
  { value: "Accountant", label: "Accountant" },
  { value: "SchoolCounselor", label: "School Counselor" },
  { value: "Janitor", label: "Janitor" },
  { value: "SecurityGuard", label: "Security Guard" },
  { value: "Cook", label: "Cook" },
  { value: "Nurse", label: "Nurse" },
  { value: "LabTechnician", label: "Lab Technician" },
  { value: "Headmaster", label: "Headmaster" },
];

export const validSchoolStaffRoles = SchoolStaffRoles.map((role) => role.value);

// Find label for a given role value
const getRoleLabel = (value: string | undefined | null): string => {
  if (!value) return "N/A";
  return SchoolStaffRoles.find((role) => role.value === value)?.label || value;
};

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
    // Add custom options for select filter (e.g., for roles)
    filterOptions?: { label: string; value: string }[];
  }
  // Add interface for global filtering function if needed
  // interface TableMeta<TData extends RowData> {
  //   globalFilterFn?: FilterFn<TData>;
  // }
}

// --- Column Definitions ---
const columns = (
  handleAccept: (request: SchoolJoinRequestDto) => void,
  handleReject: (request: SchoolJoinRequestDto) => void
): ColumnDef<SchoolJoinRequestDto>[] => [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   header: "Role",
  //   accessorKey: "role",
  //   cell: ({ row }) => (
  //     <div className="font-medium">{getRoleLabel(row.getValue("role"))}</div>
  //   ),
  //   meta: {
  //     filterVariant: "select",
  //     filterOptions: SchoolStaffRoles, // Pass roles for filter dropdown
  //   },
  //   filterFn: "equals", // Use 'equals' for exact match on select
  // },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name") ?? "N/A"}</div>
    ),
    // Filtering handled by Global Filter
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.getValue("email") ?? "N/A"}
      </div>
    ),
    // Filtering handled by Global Filter
  },
  {
    header: "Phone",
    accessorKey: "phone",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.getValue("phone") ?? "N/A"}
      </div>
    ),
    // Filtering handled by Global Filter
  },
  // {
  //   header: "User Link",
  //   accessorKey: "userId",
  //   cell: ({ row }) => {
  //     const userId = row.getValue("userId");
  //     return userId ? (
  //       // Adjust href path as per your routing structure
  //       <Link href={`/admin/users/${userId}`} passHref>
  //         <Button variant="link" size="sm" className="p-0 h-auto">
  //           <UserIcon className="mr-1 h-4 w-4" /> Profile
  //         </Button>
  //       </Link>
  //     ) : (
  //       <span className="text-xs text-muted-foreground">Guest</span>
  //     );
  //   },
  //   enableSorting: false,
  //   enableColumnFilter: false,
  // },
  // {
  //   header: "Status",
  //   accessorKey: "status",
  //   cell: ({ row }) => {
  //     const status = row.getValue("status") as string;
  //     // Optional: Add styling based on status
  //     let colorClass = "text-muted-foreground";
  //     if (status === "approved") colorClass = "text-green-600";
  //     if (status === "rejected") colorClass = "text-red-600";
  //     if (status === "pending") colorClass = "text-yellow-600";

  //     return (
  //       <div className={cn("font-medium capitalize", colorClass)}>{status}</div>
  //     );
  //   },
  //   meta: {
  //     filterVariant: "select",
  //   },
  //   filterFn: "equals",
  // },
  // {
  //   header: "Requested On",
  //   accessorKey: "createAt", // Corrected accessorKey
  //   cell: ({ row }) => {
  //     const dateVal = row.getValue("createAt");
  //     return (
  //       <div className="text-sm text-muted-foreground">
  //         {dateVal ? new Date(dateVal as string).toLocaleDateString() : "N/A"}
  //       </div>
  //     );
  //   },
  //   // You might want to add sorting but filtering by date range client-side is complex
  //   enableColumnFilter: false, // Disable column filter for simplicity, use sorting
  // },
  //  {
  //   header: "Last Updated",
  //   accessorKey: "updatedAt",
  //   cell: ({ row }) => {
  //       const dateVal = row.getValue("updatedAt");
  //       return (
  //           <div className="text-sm text-muted-foreground">
  //               {dateVal ? new Date(dateVal as string).toLocaleDateString() : "N/A"}
  //           </div>
  //       );
  //   },
  //    enableColumnFilter: false, // Disable column filter for simplicity, use sorting
  // },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const request = row.original;
      const status = request.status;

      // Only show actions if the status is 'pending'
      if (status !== "pending") {
        return <span className="text-xs text-muted-foreground">Processed</span>;
      }

      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
            onClick={() => handleAccept(request)}
          >
            Accept
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => handleReject(request)}
          >
            Reject
          </Button>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

// --- Component Props ---
interface Props {
  items: SchoolJoinRequestDto[];
  onAcceptRequest?: (request: SchoolJoinRequestDto) => void; // Optional callback for accept
  onRejectRequest?: (request: SchoolJoinRequestDto) => void; // Optional callback for reject
}

// --- Main Table Component ---
export default function SchoolJoinTable({
  items,
  onAcceptRequest,
  onRejectRequest,
}: Props) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "createAt", // Default sort by creation date
      desc: true, // Newest first
    },
  ]);
  const [globalFilter, setGlobalFilter] = useState(""); // State for global search
  const [rowSelection, setRowSelection] = useState({}); // State for row selection

  // --- Action Handlers ---
  // Use passed callbacks or default loggers
  const handleAccept = (request: SchoolJoinRequestDto) => {
    console.log("Accepting:", request);
    if (onAcceptRequest) {
      onAcceptRequest(request);
    }
    // Add logic here to update status via API call etc.
  };

  const handleReject = (request: SchoolJoinRequestDto) => {
    console.log("Rejecting:", request);
    if (onRejectRequest) {
      onRejectRequest(request);
    }
    // Add logic here to update status via API call etc.
  };

  // Memoize columns to include action handlers
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tableColumns = useMemo(
    () => columns(handleAccept, handleReject),
    [onAcceptRequest, onRejectRequest]
  );

  const table = useReactTable({
    data: items,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // This handles global filtering when globalFilter state is set
    // REMOVE THIS LINE: getGlobalFilteredRowModel: getGlobalFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableSortingRemoval: false,
    globalFilterFn: (row, columnId, filterValue) => {
      // ... (your existing global filter logic) ...
      const search = filterValue.toLowerCase();
      const name = row.original.name?.toLowerCase() ?? "";
      const email = row.original.email?.toLowerCase() ?? "";
      const phone = row.original.phone?.toLowerCase() ?? "";
      return (
        name.includes(search) ||
        email.includes(search) ||
        phone.includes(search)
      );
    },
  });

  return (
    <div className="space-y-4">
      {" "}
      {/* Reduced space */}
      {/* Filters */}
      <div className="flex flex-wrap items-end gap-3">
        {" "}
        {/* Use items-end for better alignment */}
        {/* Global Search input */}
        <div className="flex-grow" style={{ maxWidth: "300px" }}>
          {" "}
          {/* Control max width */}
          <Label htmlFor="globalSearch">Search (Name, Email, Phone)</Label>
          <div className="relative">
            <Input
              id="globalSearch"
              className="peer ps-9"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search requests..."
              type="text"
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <SearchIcon size={16} />
            </div>
          </div>
        </div>
        {/* Role select filter */}
        {table.getColumn("role") && (
          <div className="w-48">
            {" "}
            {/* Adjust width */}
            <Filter column={table.getColumn("role")!} />
          </div>
        )}
        {/* Status select filter */}
        {table.getColumn("status") && (
          <div className="w-40">
            {" "}
            {/* Adjust width */}
            <Filter column={table.getColumn("status")!} />
          </div>
        )}
        {/* Add Date Filter components here if needed */}
      </div>
      {/* Selected Row Count (Optional) */}
      <div className="text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan} // Add colSpan
                    className="h-10 px-2 md:px-4 text-xs md:text-sm" // Adjust padding and text size
                    aria-sort={
                      header.column.getCanSort()
                        ? header.column.getIsSorted() === "asc"
                          ? "ascending"
                          : header.column.getIsSorted() === "desc"
                          ? "descending"
                          : "none"
                        : undefined
                    }
                    style={{
                      width:
                        header.getSize() !== 150 ? header.getSize() : undefined,
                    }} // Set width if defined
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          "flex items-center gap-1", // Reduced gap
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          if (
                            header.column.getCanSort() &&
                            (e.key === "Enter" || e.key === " ")
                          ) {
                            e.preventDefault();
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }}
                        tabIndex={header.column.getCanSort() ? 0 : -1} // Correct tabIndex
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && // Only show sort icon if sortable
                          ({
                            asc: (
                              <ChevronUpIcon
                                className="shrink-0 opacity-60"
                                size={14} // Smaller icon
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className="shrink-0 opacity-60"
                                size={14} // Smaller icon
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? (
                            // Optional: Show a subtle sort icon placeholder if needed
                            <SortAscIcon
                              className="shrink-0 opacity-20"
                              size={14}
                              aria-hidden="true"
                            />
                            // null // Or hide completely when not sorted
                          ))}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-2 md:px-4 py-2 text-xs md:text-sm"
                    >
                      {" "}
                      {/* Adjust padding/text */}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Add Pagination component here if needed */}
      {/* Example: <DataTablePagination table={table} /> */}
    </div>
  );
}

// --- Filter Component (Enhanced) ---
function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant, filterOptions } = column.columnDef.meta ?? {}; // Destructure custom options

  // Attempt to get header, default to column ID if complex header render function used
  let columnHeader = column.id;
  if (typeof column.columnDef.header === "string") {
    columnHeader = column.columnDef.header;
  } else if (
    column.columnDef.header &&
    typeof column.columnDef.header !== "function"
  ) {
    // Handle cases where header might be a React node but not a simple string
    // This is a basic fallback, might need adjustment based on your actual header structure
    const headerNode = column.columnDef.header as React.ReactNode;
    if (typeof headerNode === "string") columnHeader = headerNode;
  }

  const sortedUniqueValues = useMemo<
    Array<{ label: string; value: string } | string>
  >(() => {
    if (filterVariant === "select") {
      if (filterOptions) {
        // Type is { label: string; value: string }[]
        // Create a mutable copy before sorting if filterOptions comes from props/external source
        return [...filterOptions].sort((a, b) =>
          a.label.localeCompare(b.label)
        );
      } else {
        // Type is string[]
        const values = Array.from(column.getFacetedUniqueValues().keys());
        // Ensure values are strings before processing
        const stringValues = values.map((v) => String(v));

        const flattenedValues = stringValues.reduce<string[]>((acc, curr) => {
          // This part might be redundant if getFacetedUniqueValues doesn't return arrays,
          // but keep for safety if data structure could have arrays.
          if (Array.isArray(curr)) {
            return [...acc, ...curr.map(String)]; // Ensure sub-elements are strings
          }
          return [...acc, curr];
        }, []);
        return Array.from(new Set(flattenedValues)).sort();
      }
    }
    // Return empty array for other variants or if not 'select'
    return [];
    // Add column.getFacetedUniqueValues to dependency array for correctness
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [column.getFacetedUniqueValues, filterVariant, filterOptions]);
  // --- Range Filter (Keep as is) ---
  if (filterVariant === "range") {
    return (
      <div className="*:not-first:mt-2">
        <Label>{columnHeader}</Label>
        <div className="flex">
          {/* Min Input */}
          <Input
            className="flex-1 rounded-e-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            value={(columnFilterValue as [number, number])?.[0] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                e.target.value !== "" ? Number(e.target.value) : undefined, // Handle empty string
                old?.[1],
              ])
            }
            placeholder="Min"
            type="number"
            aria-label={`${columnHeader} min`}
          />
          {/* Max Input */}
          <Input
            className="-ms-px flex-1 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            value={(columnFilterValue as [number, number])?.[1] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                e.target.value !== "" ? Number(e.target.value) : undefined, // Handle empty string
              ])
            }
            placeholder="Max"
            type="number"
            aria-label={`${columnHeader} max`}
          />
        </div>
      </div>
    );
  }

  // --- Select Filter (Enhanced for custom options) ---
  // --- Select Filter (Enhanced for custom options) ---
  if (filterVariant === "select") {
    return (
      <div className="*:not-first:mt-2">
        <Label>{columnHeader}</Label>
        <Select
          value={columnFilterValue?.toString() ?? "all"}
          onValueChange={(value) => {
            column.setFilterValue(value === "all" ? undefined : value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={`Select ${columnHeader}...`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {filterOptions
              ? // Assert type here: option is { label: string; value: string }
                (
                  sortedUniqueValues as Array<{ label: string; value: string }>
                ).map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))
              : // Assert type here: value is string
                (sortedUniqueValues as string[]).map((value) => (
                  <SelectItem
                    key={String(value)}
                    value={String(value)}
                    className="capitalize"
                  >
                    {String(value)} {/* Capitalize status */}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  // --- Text Filter (Keep as is, but not used directly in this setup due to Global Filter) ---
  // This remains as a fallback or if you add specific text column filters later
  return (
    <div className="*:not-first:mt-2">
      <Label>{columnHeader}</Label>
      <div className="relative">
        <Input
          className="peer ps-9"
          value={(columnFilterValue ?? "") as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder={`Filter ${columnHeader.toLowerCase()}...`}
          type="text"
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
      </div>
    </div>
  );
}
