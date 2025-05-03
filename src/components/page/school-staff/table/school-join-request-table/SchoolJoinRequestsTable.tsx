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
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MoreHorizontal,
  SearchIcon,
  UserCheck, // Example icon for Approved
  UserX, // Example icon for Rejected
  Clock, // Example icon for Pending
  Users, // Icon for Role
  LogIn, // Icon for Source (From User)
  LogOut, // Icon for Source (Invite)
  Library, // Icon for Class
} from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MyLink from "@/components/myComponents/myLink"; // If needed for links
import { Locale } from "@/i18n"; // Assuming you use this for i18n
import { Badge } from "@/components/ui/badge"; // Using Badge for status
import {
  SchoolJoinRequestAndOther,
  SchoolJoinRequestDto,
  SchoolJoinRequestStatus,
} from "@/lib/schema/school/school-join-school/school-join-request.schema";
import { formatTimeAgo } from "@/lib/functions/change-time";
import MyImage from "@/components/myComponents/myImage";
import { studentImage, teacherImage } from "@/lib/context/images";
import SendJoinSchoolRequest from "../../dialog/send-join-school-request-dialog";
import { UserSchool } from "@/lib/utils/auth";

// --- Prisma Schema related types ---
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

const columnsFunction = (
  lang: Locale,
  onApprove?: (id: string) => void,
  onReject?: (id: string) => void
): ColumnDef<SchoolJoinRequestAndOther>[] => {
  const columns: ColumnDef<SchoolJoinRequestAndOther>[] = [
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
          // Stop propagation if clicking checkbox shouldn't trigger row actions
          // onClick={(e) => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: "Applicant", // Combines Name/Email for brevity, or keep separate
      accessorKey: "name", // Sort/Filter primarily by name
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-3">
            {item.user?.image && item.userId ? (
              <MyLink loading href={`/${lang}/p/${item.userId}`}>
                <MyImage
                  className="rounded-full size-12"
                  role="AVATAR"
                  src={
                    item.user.image ||
                    (item.role === "STUDENT" ? studentImage : teacherImage)
                  }
                  alt={item.name ?? undefined}
                />
              </MyLink>
            ) : (
              <MyImage
                className="rounded-full size-12"
                role="AVATAR"
                src={
                  item.user?.image ||
                  (item.role === "STUDENT" ? studentImage : teacherImage)
                }
                alt={item.name ?? undefined}
              />
            )}
            <div>
              {item.user?.name && item.userId && (
                <MyLink
                  loading
                  href={`/${lang}/p/${item.userId}`}
                  className="font-medium"
                >
                  {item.user.name}
                </MyLink>
              )}
              <span className="text-muted-foreground mt-0.5 text-xs">
                {item.email}
              </span>
            </div>
          </div>
        );
      },
      meta: {
        filterVariant: "text",
      },
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 capitalize">
          <Users className="h-4 w-4 text-muted-foreground" />
          {row.getValue("role")}
        </div>
      ),
      meta: {
        filterVariant: "select",
      },
      filterFn: (row, id, filterValue) => {
        const rowValue = row.getValue(id);
        if (filterValue === undefined || filterValue === "all") return true;
        return rowValue === filterValue;
      },
    },
    {
      header: "Class",
      accessorKey: "className", // Use the derived className
      cell: ({ row }) => {
        const className = row.original.class?.name;
        const classLink = row.original.classId
          ? `/${lang}/c/${row.original.classId}`
          : undefined;
        const content = (
          <div className="flex items-center gap-1">
            <Library className="h-4 w-4 text-muted-foreground" />
            {className || <span className="text-muted-foreground">-</span>}
          </div>
        );
        return className && classLink ? (
          <MyLink href={classLink}>{content}</MyLink>
        ) : (
          content
        );
      },
      meta: {
        filterVariant: "select", // Or 'text' if many classes
      },
      filterFn: (row, id, filterValue) => {
        const rowValue = row.getValue(id);
        if (filterValue === undefined || filterValue === "all") return true;
        // Handle null/undefined matching 'None' or similar if added to select
        if (filterValue === "none" && !rowValue) return true;
        return rowValue === filterValue;
      },
    },
    {
      header: "Source",
      accessorKey: "fromUser",
      cell: ({ row }) => {
        const fromUser = row.getValue("fromUser");
        const Icon = fromUser ? LogIn : LogOut;
        return (
          <div className="flex items-center gap-1">
            <Icon className="h-4 w-4 text-muted-foreground" />
            {fromUser ? "User Request" : "School Invite"}
          </div>
        );
      },
      meta: {
        filterVariant: "select",
      },
      filterFn: (row, id, filterValue) => {
        const rowValue = row.getValue(id); // boolean
        if (filterValue === undefined || filterValue === "all") return true;
        return rowValue === (filterValue === "true");
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.getValue("status") as SchoolJoinRequestStatus;
        let variant: "default" | "secondary" | "destructive" | "outline" =
          "secondary";
        let Icon = Clock;
        if (status === SchoolJoinRequestStatus.Approved) {
          variant = "default";
          Icon = UserCheck;
        } else if (status === SchoolJoinRequestStatus.Rejected) {
          variant = "destructive";
          Icon = UserX;
        } // Pending uses Clock and 'secondary'

        return (
          <Badge
            variant={variant}
            className="capitalize flex items-center gap-1"
          >
            <Icon className="h-3.5 w-3.5" />
            {status}
          </Badge>
        );
      },
      meta: {
        filterVariant: "select",
      },
      filterFn: (row, id, filterValue) => {
        const rowValue = row.getValue(id);
        if (filterValue === undefined || filterValue === "all") return true;
        return rowValue === filterValue;
      },
    },
    {
      header: "Requested",
      accessorKey: "createdAt",
      cell: ({ row }) => {
        return <time>{formatTimeAgo(row.original.createAt)}</time>;
      },
      enableSorting: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const request = row.original;
        const isPending = request.status === SchoolJoinRequestStatus.Pending;

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
              {/* Example: Copy Email Action */}
              {request.email && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent dropdown closing immediately if needed
                    navigator.clipboard.writeText(request.email!);
                    // Optional: Show toast notification
                  }}
                >
                  Copy Email
                </DropdownMenuItem>
              )}
              {/* Conditional Actions based on status */}
              {isPending && onApprove && (
                <DropdownMenuItem
                  className="text-green-600 focus:text-green-700 focus:bg-green-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onApprove(request.id);
                  }}
                >
                  Approve Request
                </DropdownMenuItem>
              )}
              {isPending && onReject && (
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive focus:bg-destructive/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReject(request.id);
                  }}
                >
                  Reject Request
                </DropdownMenuItem>
              )}
              {!isPending && (
                <DropdownMenuItem disabled>
                  {request.status === SchoolJoinRequestStatus.Approved
                    ? "Already Approved"
                    : "Already Rejected"}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                // Example: Navigate to a details page or open a modal
                onClick={() => console.log("View details for:", request.id)}
              >
                View Details
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
};

interface SchoolJoinRequestsTableProps {
  requests: SchoolJoinRequestDto[];
  lang: Locale;
  // Add handlers for actions
  onApproveRequest?: (id: string) => void;
  onRejectRequest?: (id: string) => void;
  isLoading?: boolean;
  currentSchool: UserSchool;
}

// --- React Component ---
export default function SchoolJoinRequestsTable({
  requests,
  lang,
  onApproveRequest,
  onRejectRequest,
  isLoading = false,
  currentSchool,
}: SchoolJoinRequestsTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "createdAt", // Default sort by request date
      desc: true, // Show newest first
    },
  ]);
  const [rowSelection, setRowSelection] = useState({});

  // Memoize columns to prevent re-creation on every render unless handlers change
  const tableColumns = useMemo(
    () => columnsFunction(lang, onApproveRequest, onRejectRequest),
    [lang, onApproveRequest, onRejectRequest]
  );

  const table = useReactTable({
    data: requests,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    // Add meta for passing handlers or other info if needed via context
    // meta: {
    //   approveRequest: onApproveRequest,
    //   rejectRequest: onRejectRequest,
    // },
  });

  return (
    <Card>
      <CardHeader className=" flex justify-between  w-full">
        <div>
          <CardTitle>School Join Requests</CardTitle>
          {/* Optional: Add description or global actions (e.g., bulk approve/reject) */}
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <div className="mt-2 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => console.log("Bulk Approve", rowSelection)}
              >
                Approve Selected (
                {table.getFilteredSelectedRowModel().rows.length})
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => console.log("Bulk Reject", rowSelection)}
              >
                Reject Selected (
                {table.getFilteredSelectedRowModel().rows.length})
              </Button>
            </div>
          )}
        </div>
        <SendJoinSchoolRequest lang={lang} currentSchool={currentSchool} />
      </CardHeader>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 px-4 pb-4 border-b">
        {/* Applicant filter */}
        <div className="w-48">
          <Filter column={table.getColumn("name")!} />
        </div>
        {/* Role filter */}
        <div className="w-36">
          <Filter column={table.getColumn("role")!} />
        </div>
        {/* Class filter */}
        <div className="w-48">
          <Filter column={table.getColumn("className")!} />
        </div>
        {/* Source filter */}
        <div className="w-40">
          <Filter column={table.getColumn("fromUser")!} />
        </div>
        {/* Status filter */}
        <div className="w-36">
          <Filter column={table.getColumn("status")!} />
        </div>
      </div>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const headerProps = (header.column.columnDef as any)
                      .headerProps;
                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "relative h-10 select-none whitespace-nowrap px-3", // Adjusted padding
                          header.column.getCanSort() ? "cursor-pointer" : "",
                          headerProps?.className
                        )}
                        aria-sort={
                          header.column.getCanSort()
                            ? header.column.getIsSorted() === "asc"
                              ? "ascending"
                              : header.column.getIsSorted() === "desc"
                              ? "descending"
                              : "none"
                            : undefined
                        }
                        onClick={header.column.getToggleSortingHandler()} // Apply directly for simplicity
                      >
                        <div className="flex items-center gap-2">
                          {" "}
                          {/* Wrapper for content + sort icon */}
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {
                            header.column.getCanSort() &&
                              ({
                                asc: (
                                  <ChevronUpIcon
                                    className="shrink-0 opacity-60"
                                    size={16}
                                  />
                                ),
                                desc: (
                                  <ChevronDownIcon
                                    className="shrink-0 opacity-60"
                                    size={16}
                                  />
                                ),
                              }[header.column.getIsSorted() as string] ?? (
                                <span className="size-4" />
                              )) /* Placeholder */
                          }
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={tableColumns.length}
                    className="h-24 text-center"
                  >
                    Loading requests... {/* Add a spinner maybe */}
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const cellProps = (cell.column.columnDef as any)
                        .cellProps;
                      return (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            "px-3 py-2 align-middle",
                            cellProps?.className
                          )} // Adjusted padding
                        >
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
                    colSpan={tableColumns.length}
                    className="h-24 text-center"
                  >
                    No pending join requests found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Pagination Controls */}
      <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
          {/* TODO: Add total count from server if using server-side pagination */}
        </div>
        {/* Placeholder for TanStack Table Pagination component */}
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
           <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
      </div>
    </Card>
  );
}

// --- Filter Component (Re-use the one from your example) ---
// Ensure this component is imported or defined in the same file/scope
function Filter({ column }: { column: Column<any, unknown> }) {
  const id = useId();
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const columnHeader = useMemo(() => {
    const header = column.columnDef.header;
    if (typeof header === "string") return header;
    // Basic heuristic for function headers (might need improvement)
    if (typeof header === "function") {
      try {
        const rendered = flexRender(header, {} as any); // Dummy render
        if (typeof rendered === "string") return rendered;
      } catch {
        /* ignore */
      }
    }
    return column.id;
  }, [column.columnDef.header, column.id]);

  const sortedUniqueValues = useMemo(() => {
    if (filterVariant === "range" || filterVariant === "text") return [];

    try {
      const uniqueMap = column.getFacetedUniqueValues();
      let values = Array.from(uniqueMap.keys());

      // Specific handling for boolean 'fromUser' column
      if (column.id === "fromUser") {
        // Map boolean to strings for display in Select
        return values
          .map((val) =>
            val === true ? "true" : val === false ? "false" : null
          )
          .filter((val) => val !== null) // Filter out potential non-boolean values
          .sort();
      }
      // Handle className potentially having null/undefined
      if (column.id === "className") {
        const hasNone = values.some((v) => v === null || v === undefined);
        values = values.filter((v) => v !== null && v !== undefined); // Remove nulls/undefineds
        values.sort();
        // Add a 'None' option if there were null/undefined classNames
        if (hasNone) {
          values.unshift("none"); // Use 'none' as the value for filtering nulls
        }
        return values;
      }

      // Default handling for other select types (role, status)
      return values
        .filter((val) => val !== null && val !== undefined) // Filter out nulls/undefineds generally
        .sort();
    } catch (e) {
      console.error("Error getting faceted unique values for:", column.id, e);
      return [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [column.id, column.getFacetedUniqueValues(), filterVariant]); // Update dependencies if needed

  // Range Filter (if you add numeric columns like age, etc.)
  if (filterVariant === "range") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [min, max] = useMemo(
      () => column.getFacetedMinMaxValues() ?? [undefined, undefined],
      [column] // Depend on column object
    );
    return (
      <div>
        <Label htmlFor={`${id}-range-min`}>{columnHeader}</Label>
        {/* ... (keep the range input structure from your example) ... */}
        <div className="flex gap-2 mt-1">
          <Input
            id={`${id}-range-min`}
            // ... props ...
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
            // ... props ...
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

  // Select Filter
  if (filterVariant === "select") {
    // Map boolean values to display text for 'fromUser'
    const getDisplayValue = (value: any) => {
      if (column.id === "fromUser") {
        if (value === "true") return "User Request";
        if (value === "false") return "School Invite";
      }
      if (column.id === "className" && value === "none") {
        return "None"; // Display for null/undefined classes
      }
      // Capitalize role/status for display
      if (column.id === "role" || column.id === "status") {
        return String(value).charAt(0).toUpperCase() + String(value).slice(1);
      }
      return String(value);
    };

    return (
      <div>
        <Label htmlFor={`${id}-select`}>{columnHeader}</Label>
        <Select
          value={String(columnFilterValue ?? "all")} // Ensure value is a string
          onValueChange={(value) => {
            column.setFilterValue(value === "all" ? undefined : value);
          }}
        >
          <SelectTrigger id={`${id}-select`} className="mt-1 capitalize">
            {" "}
            {/* Capitalize trigger */}
            <SelectValue placeholder={`Filter ${columnHeader.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {sortedUniqueValues.map((value) => (
              <SelectItem
                key={String(value)}
                value={String(value)}
                className="capitalize"
              >
                {" "}
                {/* Capitalize options */}
                {getDisplayValue(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  // Default Text Filter
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
