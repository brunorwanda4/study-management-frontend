/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { Locale } from "@/i18n";
import { SchoolStaffDto } from "@/lib/schema/school/school-staff.schema";
import { cn } from "@/lib/utils";
import {
  Column,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { SendStaffRequestToJoinSchool } from "../../dialog/createStaffModal";
import { StaffTableColumns } from "./staff-table-columns";

interface props {
  staffs: SchoolStaffDto[];
  lang: Locale;
  schoolId: string;
}

export default function SchoolStaffTable({ staffs, lang, schoolId }: props) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name", // Default sort by name perhaps? Or enrollment date?
      desc: false,
    },
  ]);

  const data = useMemo(() => staffs, [staffs]); // Memoize data
  const tableColumns = useMemo(() => StaffTableColumns(lang), [lang]); // Memoize columns

  const table = useReactTable({
    data: data,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onSortingChange: setSorting,
    enableSortingRemoval: false, // Keep or change as needed
    // Add meta data if needed for filters accessing table instance
    // meta: {
    //    getUniqueClassNames: () => { ... calculate unique class names from 'students' ... }
    // }
  });

  // Make sure the 'colSpan' in the empty state matches the new number of columns
  const numberOfColumns = table.getAllColumns().length;

  return (
    <div className="basic-card-no-p space-y-6">
      <div className="flex items-center justify-between px-4 pt-4 pb-0">
        <h3 className="title-page">Staffs</h3>
        {/* Pass Classes data if the modal needs it */}
        <SendStaffRequestToJoinSchool schoolId={schoolId} />
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 border-b px-4 py-2">
        {" "}
        {/* Add border */}
        {/* Search input for Student Name */}
        <div className="w-44">
          {/* Make sure the accessorKey "name" matches the column */}
          <Filter column={table.getColumn("name")!} />
        </div>
        {/* Filter for Student ID */}
        <div className="w-36">
          <Filter column={table.getColumn("id")!} />
        </div>
        {/* Gender select */}
        <div className="w-32">
          {" "}
          {/* Adjusted width */}
          <Filter column={table.getColumn("gender")!} />
        </div>
        {/* Class select */}
        <div className="w-40">
          {" "}
          {/* Adjusted width */}
          {/* Use the correct accessor key 'class.name' */}
          <Filter column={table.getColumn("class.name")!} />
        </div>
        {/* Age range inputs */}
        <div className="w-36">
          <Filter column={table.getColumn("age")!} />
        </div>
        {/* Phone search */}
        <div className="w-40">
          {" "}
          {/* Adjusted width */}
          <Filter column={table.getColumn("phone")!} />
        </div>
        {/* Enrolled On search (basic text) */}
        <div className="w-36">
          <Filter column={table.getColumn("createAt")!} />
        </div>
        {/* Remove filters for traffic and link */}
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/50">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="relative h-10 border-t px-3 whitespace-nowrap select-none" // Added padding/whitespace
                    // Calculate width based on column definition if needed
                    // style={{ width: header.getSize() }}
                    aria-sort={
                      header.column.getIsSorted() === "asc"
                        ? "ascending"
                        : header.column.getIsSorted() === "desc"
                          ? "descending"
                          : "none"
                    }
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          "flex h-full items-center justify-between gap-2",
                          header.column.getCanSort() &&
                            "cursor-pointer select-none", // Use cn for conditional class
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
                        tabIndex={header.column.getCanSort() ? 0 : undefined}
                        title={
                          header.column.getCanSort()
                            ? `Sort by ${typeof header.column.columnDef.header === "string" ? header.column.columnDef.header : ""}`
                            : undefined
                        } // Add title for sortable headers
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {/* Sorting Indicator */}
                        {
                          {
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
                          }[header.column.getIsSorted() as string] ??
                            (header.column.getCanSort() ? (
                              <span
                                className="size-4 opacity-30"
                                aria-hidden="true"
                              >
                                ↕
                              </span>
                            ) : null) // Placeholder sort icon
                        }
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
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
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-3 py-2">
                    {" "}
                    {/* Added padding */}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              {/* Use dynamic colSpan */}
              <TableCell colSpan={numberOfColumns} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

interface FilterProps {
  column: Column<any, unknown>;
}

export function Filter({ column }: FilterProps) {
  const id = useId();

  const filterVariant = column?.columnDef?.meta?.filterVariant;
  const columnHeader =
    typeof column?.columnDef?.header === "string"
      ? column.columnDef.header
      : "";

  const sortedUniqueValues = useMemo(() => {
    if (!column || filterVariant === "range") return [];

    const values = Array.from(column.getFacetedUniqueValues().keys());
    const flattened = values.flatMap((val) =>
      Array.isArray(val) ? val : [val],
    );
    return Array.from(new Set(flattened)).sort();
  }, [column, filterVariant]);

  if (!column) {
    console.warn(
      "Filter component received an undefined column. Check if the column ID used in getColumn() is correct.",
    );
    return null;
  }

  const columnFilterValue = column.getFilterValue();

  const renderRangeFilter = () => (
    <div className="*:not-first:mt-2">
      <Label>{columnHeader}</Label>
      <div className="flex">
        <Input
          id={`${id}-range-1`}
          className="flex-1 rounded-e-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old: [number, number]) => [
              e.target.value ? Number(e.target.value) : undefined,
              old?.[1],
            ])
          }
          placeholder="Min"
          type="number"
          aria-label={`${columnHeader} min`}
        />
        <Input
          id={`${id}-range-2`}
          className="-ms-px flex-1 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old: [number, number]) => [
              old?.[0],
              e.target.value ? Number(e.target.value) : undefined,
            ])
          }
          placeholder="Max"
          type="number"
          aria-label={`${columnHeader} max`}
        />
      </div>
    </div>
  );

  const renderSelectFilter = () => (
    <div className="*:not-first:mt-2">
      <Label htmlFor={`${id}-select`}>{columnHeader}</Label>
      <Select
        value={columnFilterValue?.toString() ?? "all"}
        onValueChange={(value) =>
          column.setFilterValue(value === "all" ? undefined : value)
        }
      >
        <SelectTrigger id={`${id}-select`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {sortedUniqueValues.map((value) => (
            <SelectItem key={String(value)} value={String(value)}>
              {String(value)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const renderTextFilter = () => (
    <div className="*:not-first:mt-2">
      <Label htmlFor={`${id}-input`}>{columnHeader}</Label>
      <div className="relative">
        <Input
          id={`${id}-input`}
          className="peer ps-9"
          value={(columnFilterValue ?? "") as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder={`Search ${columnHeader.toLowerCase()}`}
          type="text"
        />
        <div className="/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
      </div>
    </div>
  );

  switch (filterVariant) {
    case "range":
      return renderRangeFilter();
    case "select":
      return renderSelectFilter();
    default:
      return renderTextFilter();
  }
}
