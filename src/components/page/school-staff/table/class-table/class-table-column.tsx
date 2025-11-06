"use client";

import MyAvatar from "@/components/common/image/my-avatar";
import ClassModifySheet from "@/components/page/class/class-modify-sheet";
import { Button } from "@/components/ui/button"; // For Actions
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Locale } from "@/i18n";
import type { ClassWithOthers } from "@/lib/schema/relations-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const ClassTableColumn = (lang: Locale, auth: AuthContext) => {
  const columns: ColumnDef<ClassWithOthers>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className=" items-center cursor-pointer">
          <ClassModifySheet auth={auth} cls={row.original} isTable />
        </div>
      ),
      meta: {
        filterVariant: "text",
      },
    },

    {
      header: "Level",
      accessorKey: "trade.name",
      cell: ({ row }) => {
        if (!row.original?.trade?.name) return null;
        return <div>{row.original?.trade?.name}</div>;
      },
      meta: {
        filterVariant: "select",
      },
      filterFn: (row, id, filterValue) => {
        // Handle potential nulls if using select
        const rowValue = row.getValue(id);
        if (filterValue === undefined || filterValue === "all") return true;
        return rowValue === filterValue;
      },
    },
    {
      header: "Students",
      accessorKey: "studentCount",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">32</div>
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
      header: "Subjects",
      accessorKey: "studentCount",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">9</div>
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
      header: "Teacher",
      accessorKey: "class_teacher", // Use the derived field
      cell: ({ row }) => {
        if (!row.original.class_teacher)
          return <span className="text-muted-foreground">N/A</span>;
        return (
          <div className=" flex gap-2 items-center">
            <MyAvatar
              src={row.original.class_teacher.image}
              alt={row.original.class_teacher.name}
              size="xs"
            />
            {row.original.class_teacher.name}
          </div>
        );
      },
      enableSorting: true, // Enable if desired, ensure data is sortable
      // Filtering is not enabled for this column
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
