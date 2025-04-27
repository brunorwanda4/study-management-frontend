/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useId, useMemo, useState } from "react";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  useReactTable,
  // Import FilterFn if needed for custom filtering, though not used in this specific refactor
  // FilterFn,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MoreHorizontal, // Using MoreHorizontal for an actions dropdown
  SearchIcon,
  ShieldCheckIcon, // Example icon for Class Type
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have this utility
import { Checkbox } from "@/components/ui/checkbox"; // Assuming shadcn/ui
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // For Actions
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // For Actions
import { ClassDto, ClassEnum } from "@/lib/schema/class/class.schema";
import MyImage from "@/components/myComponents/myImage";
import MyLink from "@/components/myComponents/myLink";
import { Locale } from "@/i18n";
// --- Prisma Schema related types ---

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

// --- Column Definitions for Classes ---
const columsFunction = (lang : Locale) => {
  const columns: ColumnDef<ClassDto>[] = [
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
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <MyLink href={`/${lang}/c/${row.original.id}`} className="font-medium flex items-center gap-2">
          {row.original.image && <MyImage src={row.original.image} alt={row.getValue("name")} className="h-8 w-8 rounded-full object-cover" />}
          <span>{row.getValue("name")}</span>
        </MyLink>
      ),
      meta: {
        filterVariant: "text",
      },
    },
    {
      header: "Code",
      accessorKey: "code",
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue("code")}</div>
      ),
      meta: {
        filterVariant: "text",
      },
    },
    {
      header: "Type",
      accessorKey: "classType",
      cell: ({ row }) => {
        const type = row.getValue("classType") as ClassEnum | null;
        return type ? (
          <div className="flex items-center gap-1">
            <ShieldCheckIcon className="h-4 w-4 text-muted-foreground" />
            <span
              className={cn(
                "px-2 py-0.5 rounded text-xs font-medium",
                type === "Private"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  : type === "Public"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200" // Default/fallback
              )}
            >
              {type}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground">-</span>
        );
      },
      meta: {
        filterVariant: "select",
      },
      // You might need a custom filterFn if null/undefined is a possibility you want to filter specifically
      filterFn: (row, id, filterValue) => {
        const rowValue = row.getValue(id);
        // Handle 'all' selection and actual value matching
        if (filterValue === undefined || filterValue === "all") return true;
        return rowValue === filterValue;
      },
    },
    {
      header: "Level",
      accessorKey: "educationLever",
      cell: ({ row }) => {
        return (
          <div>
            {row.getValue("educationLever")}
          </div>
        )
      },
      meta: {
        filterVariant: "select", // Or 'text' if many unique levels
      },
      filterFn: (row, id, filterValue) => {
        // Handle potential nulls if using select
        const rowValue = row.getValue(id);
        if (filterValue === undefined || filterValue === "all") return true;
        return rowValue === filterValue;
      },
    },
    {
      header: "Curriculum",
      accessorKey: "curriculum",
      cell: ({ row }) => {
        const curriculum = row.getValue("curriculum") as string | null;
        return curriculum ? (
          <div className="flex items-center gap-1 text-sm">
            {curriculum}
          </div>
        ) : (
          <span className="text-muted-foreground">-</span>
        );
      },
      meta: {
        filterVariant: "select", // Or 'text'
      },
      filterFn: (row, id, filterValue) => {
        // Handle potential nulls if using select
        const rowValue = row.getValue(id);
        if (filterValue === undefined || filterValue === "all") return true;
        return rowValue === filterValue;
      },
    },
    {
      header: "Teacher",
      accessorKey: "teacherName", // Use the derived field
      cell: ({ row }) =>
        row.getValue("teacherName") || (
          <span className="text-muted-foreground">N/A</span>
        ),
      enableSorting: true, // Enable if desired, ensure data is sortable
      // Filtering is not enabled for this column
    },
    {
      header: "Students",
      accessorKey: "studentCount",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          {row.getValue("studentCount")}
        </div>
      ),
      meta: {
        filterVariant: "range",
      },
      // headerProps: { // Example custom prop for alignment
      //   className: "text-right",
      // },
      // cellProps: { // Example custom prop for alignment
      //     className: "text-right tabular-nums",
      // },
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: ({ row }) => (
        <time dateTime={row.getValue("createdAt")}>
          {row.getValue("createdAt")}
        </time>
      ),
      // enableFiltering: true, // Range filtering for dates is complex, skip for now
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const classData = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(classData.id)} // Example action
              >
                Copy Class ID
              </DropdownMenuItem>
              {/* Add other actions like View, Edit, Delete */}
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Class</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                Delete Class
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return columns;
}

interface ClassTableProps {
  classes: ClassDto[];
  lang : Locale
}
// --- React Component ---
export default function ClassesTable({ classes, lang }: ClassTableProps) {
  // Renamed for clarity
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name", // Default sort by name
      desc: false,
    },
  ]);
  const [rowSelection, setRowSelection] = useState({}); // Add row selection state

  const table = useReactTable({
    data: classes, // Use the new classes data
    columns : columsFunction(lang),
    state: {
      sorting,
      columnFilters,
      rowSelection, // Pass row selection state
    },
    enableRowSelection: true, // Enable row selection
    onRowSelectionChange: setRowSelection, // Add handler for row selection
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client-side filtering
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
    onSortingChange: setSorting,
    enableSortingRemoval: false,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Classes</CardTitle>
        {/* Add description or controls here if needed */}
      </CardHeader>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 px-4 pb-4 border-b">
        {/* Name filter */}
        <div className="w-48">
          <Filter column={table.getColumn("name")!} />
        </div>
        {/* Code filter */}
        <div className="w-40">
          <Filter column={table.getColumn("code")!} />
        </div>
        {/* Class Type select */}
        <div className="w-36">
          <Filter column={table.getColumn("classType")!} />
        </div>
        {/* Education Level select */}
        <div className="w-48">
          <Filter column={table.getColumn("educationLever")!} />
        </div>
        {/* Curriculum select */}
        <div className="w-40">
          <Filter column={table.getColumn("curriculum")!} />
        </div>
        {/* Student Count range */}
        <div className="w-36">
          <Filter column={table.getColumn("studentCount")!} />
        </div>
      </div>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          {" "}
          {/* Added for better responsiveness */}
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const headerProps = (header.column.columnDef as any)
                      .headerProps; // Get custom props
                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "relative h-10 select-none",
                          headerProps?.className
                        )} // Apply custom class
                        aria-sort={
                          header.column.getCanSort()
                            ? header.column.getIsSorted() === "asc"
                              ? "ascending"
                              : header.column.getIsSorted() === "desc"
                              ? "descending"
                              : "none"
                            : undefined // Only add aria-sort if sortable
                        }
                      >
                        {header.isPlaceholder ? null : header.column.getCanSort() ? (
                          <div
                            className={cn(
                              "flex items-center gap-2 cursor-pointer",
                              headerProps?.className ? "" : "justify-between" // Avoid double justify-end on right aligned headers
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
                            tabIndex={
                              header.column.getCanSort() ? 0 : undefined
                            }
                            role="button" // Add role button for accessibility
                            aria-label={`Sort by ${
                              typeof header.column.columnDef.header === "string"
                                ? header.column.columnDef.header
                                : header.column.id
                            }`}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: (
                                <ChevronUpIcon
                                  className="shrink-0 opacity-60"
                                  size={16}
                                  aria-hidden="true"
                                />
                              ),
                              desc: (
                                <ChevronDownIcon
                                  className="shrink-0 opacity-60"
                                  size={16}
                                  aria-hidden="true"
                                />
                              ),
                            }[header.column.getIsSorted() as string] ?? (
                              // Optionally show a default sort icon placeholder if needed
                              <span className="size-4" aria-hidden="true" />
                            )}
                          </div>
                        ) : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        )}
                      </TableHead>
                    );
                  })}
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
                    {row.getVisibleCells().map((cell) => {
                      const cellProps = (cell.column.columnDef as any)
                        .cellProps; // Get custom props
                      return (
                        <TableCell
                          key={cell.id}
                          className={cn(cellProps?.className)}
                        >
                          {" "}
                          {/* Apply custom class */}
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columsFunction(lang).length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {/* Optional: Add Pagination Controls here */}
      <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        {/* Add TanStack Table Pagination component if needed */}
      </div>
    </Card>
  );
}

// --- Filter Component (Modified slightly for robustness) ---
function Filter({ column }: { column: Column<any, unknown> }) {
  const id = useId();
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const columnHeader = useMemo(() => {
    const header = column.columnDef.header;
    if (typeof header === "string") return header;
    // Attempt to extract text if it's a simple component, otherwise use ID
    // This is a basic heuristic and might need adjustment for complex headers
    if (typeof header === "function") {
      try {
        // Render header function in a dummy context to extract text potentially
        // This is experimental and might not always work reliably
        const renderedHeader = flexRender(header, {
          /* dummy context */
        } as any);
        if (typeof renderedHeader === "string") return renderedHeader;
        // Could try accessing props.children if it's a simple element
      } catch {
        /* ignore errors during heuristic render */
      }
    }
    return column.id; // Fallback to column ID
  }, [column.columnDef.header, column.id]);

  const sortedUniqueValues = useMemo(() => {
    // No need for unique values for range or text filters
    if (filterVariant === "range" || filterVariant === "text") return [];

    // Get unique values for select filter
    try {
      // This inherently handles simple values and arrays (by treating array refs as unique keys)
      const uniqueMap = column.getFacetedUniqueValues();
      // Filter out potential undefined/null keys if they shouldn't be selectable options
      // Keep null/undefined if you explicitly want to filter by them
      const values = Array.from(uniqueMap.keys()).filter(
        (val) => val !== null && val !== undefined
      ); // Adjust filter as needed

      // No need to flatten like before, as 'intents' was the special array case.
      // For simple types like ClassType, educationLevel, curriculum, the keys are the values themselves.
      return values.sort();
    } catch (e) {
      console.error(
        "Error getting faceted unique values for column:",
        column.id,
        e
      );
      return [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [column.id, column.getFacetedUniqueValues(), filterVariant]);

  if (filterVariant === "range") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [min, max] = useMemo(
      () => {
        try {
          return column.getFacetedMinMaxValues() ?? [undefined, undefined];
        } catch (e) {
          console.error(
            "Error getting min/max values for column:",
            column.id,
            e
          );
          return [undefined, undefined];
        }
      },
      [column] // Depend only on the column object itself
    );
    return (
      <div>
        <Label htmlFor={`${id}-range-min`}>{columnHeader}</Label>
        <div className="flex gap-2 mt-1">
          <Input
            id={`${id}-range-min`}
            className="flex-1 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            value={(columnFilterValue as [number, number])?.[0] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                e.target.value !== "" ? Number(e.target.value) : undefined,
                old?.[1],
              ])
            }
            placeholder={`Min ${min !== undefined ? `(${min})` : ""}`}
            type="number"
            aria-label={`${columnHeader} min value`}
          />
          <Input
            id={`${id}-range-max`}
            className="flex-1 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            value={(columnFilterValue as [number, number])?.[1] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                e.target.value !== "" ? Number(e.target.value) : undefined,
              ])
            }
            placeholder={`Max ${max !== undefined ? `(${max})` : ""}`}
            type="number"
            aria-label={`${columnHeader} max value`}
          />
        </div>
      </div>
    );
  }

  if (filterVariant === "select") {
    return (
      <div>
        <Label htmlFor={`${id}-select`}>{columnHeader}</Label>
        <Select
          value={columnFilterValue?.toString() ?? "all"}
          onValueChange={(value) => {
            column.setFilterValue(value === "all" ? undefined : value);
          }}
        >
          <SelectTrigger id={`${id}-select`} className="mt-1">
            <SelectValue placeholder={`Filter ${columnHeader.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {/* Add options for null/empty if applicable */}
            {/* <SelectItem value="null">None</SelectItem> */}
            {sortedUniqueValues.map((value) => (
              <SelectItem key={String(value)} value={String(value)}>
                {String(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  // Default to text filter
  return (
    <div>
      <Label htmlFor={`${id}-input`}>{columnHeader}</Label>
      <div className="relative mt-1">
        <Input
          id={`${id}-input`}
          className="peer ps-9"
          value={(columnFilterValue ?? "") as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder={`Search ${columnHeader.toLowerCase()}...`}
          type="text"
        />
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
      </div>
    </div>
  );
}
