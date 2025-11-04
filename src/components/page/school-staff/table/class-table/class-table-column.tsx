"use client";

import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import { Button } from "@/components/ui/button"; // For Actions
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Locale } from "@/i18n";
import type { ClassWithOthers } from "@/lib/schema/class/class-schema";
import type { ClassType } from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ShieldCheckIcon } from "lucide-react";

export const ClassTableColumn = (lang: Locale) => {
  const columns: ColumnDef<ClassWithOthers>[] = [
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
        <div className="flex gap-2">
          {row.original.image && (
            <MyLink
              href={`/${lang}/c/${row.original.username}`}
              className="flex items-center gap-2 font-medium"
            >
              <MyImage
                src={row.original.image}
                alt={row.original.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            </MyLink>
          )}
          <div className="flex flex-col">
            <MyLink
              href={`/${lang}/c/${row.original.username}`}
              className="flex items-center gap-2 font-medium"
            >
              <span>{row.original.name}</span>
            </MyLink>
            <MyLink
              href={`/${lang}/c/${row.original.username}`}
              className="flex items-center gap-2 font-medium"
            >
              <span>{row.original.username}</span>
            </MyLink>
          </div>
        </div>
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
        const type = row.getValue("classType") as ClassType | null;
        return type ? (
          <div className="flex items-center gap-1">
            <ShieldCheckIcon className="text-muted-foreground h-4 w-4" />
            <span
              className={cn(
                "rounded px-2 py-0.5 text-xs font-medium",
                type === "Private"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  : type === "Public"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200", // Default/fallback
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
        return <div>{row.getValue("educationLever")}</div>;
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
          <div className="flex items-center gap-1 text-sm">{curriculum}</div>
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
                onClick={() =>
                  navigator.clipboard.writeText(
                    classData.id || classData._id || "",
                  )
                } // Example action
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
};
