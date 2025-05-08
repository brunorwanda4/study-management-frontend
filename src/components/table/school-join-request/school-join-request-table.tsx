/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useMemo, useState } from "react";
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
} from "@/lib/schema/school/school-join-school/school-join-request.schema"; // Adjust path as needed
import SchoolJoinRequestTableColumns from "./school-join-request-table-columns";

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
  interface TableMeta<TData extends RowData> {
    globalFilterFn?: FilterFn<TData>;
  }
}


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
  const handleAccept = useCallback((request: SchoolJoinRequestDto) => {
    console.log("Accepting:", request);
    if (onAcceptRequest) {
      onAcceptRequest(request);
    }
    // Add logic here to update status via API call etc.
  }, [onAcceptRequest]);

  const handleReject = useCallback((request: SchoolJoinRequestDto) => {
    console.log("Rejecting:", request);
    if (onRejectRequest) {
      onRejectRequest(request);
    }
  }, [onRejectRequest]);

  // Memoize columns to include action handlers
  const tableColumns = useMemo(
    () => SchoolJoinRequestTableColumns(handleAccept, handleReject),
    [handleAccept, handleReject]
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
            <div className=" /80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
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
      <div className="text-sm  ">
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
  }, [filterVariant, filterOptions, column]);
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
        <div className=" /80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
      </div>
    </div>
  );
}
