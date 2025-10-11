"use client";

import { Badge } from "@/components/ui/badge";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const getMainSubjectsTableColumns = (): ColumnDef<MainSubject>[] => {
  return [
    {
      header: "Subject",
      accessorKey: "name",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <Link
          href={`/a/collections/main_subjects/${row.original.code}`}
          className={cn(
            "flex flex-col gap-1",
            !row.original.is_active
              ? "text-muted-foreground tooltip tooltip-warning"
              : "",
          )}
          data-tip={!row.original.is_active ? "Inactive Subject" : ""}
        >
          <span className="font-medium">{row.original.name}</span>
        </Link>
      ),
    },
    {
      header: "Code",
      accessorKey: "code",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <Link href={`/a/collections/main_subjects/${row.original.code}`}>
          {" "}
          <span className="">{row.original.code}</span>
        </Link>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      meta: { filterVariant: "select" },
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.category}
        </Badge>
      ),
    },
    {
      header: "Level",
      accessorKey: "level",
      meta: { filterVariant: "select" },
      cell: ({ row }) => row.original.level || "N/A",
    },
    {
      header: "Hours / Credits",
      accessorKey: "estimated_hours",
      meta: { filterVariant: "range" },
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <span className="font-medium">{row.original.estimated_hours}h</span>
            <span className="text-muted-foreground">•</span>
            <span>{row.original.credits || 0} credits</span>
          </div>
          <div className="text-muted-foreground text-xs">
            {row.original.main_class_ids?.length || 0} classes
          </div>
        </div>
      ),
    },
    {
      header: "Prerequisites",
      accessorKey: "prerequisites",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.prerequisites && row.original.prerequisites.length > 0
            ? `${row.original.prerequisites.length} subjects`
            : "None"}
        </div>
      ),
    },
    {
      header: "Academic Year",
      accessorKey: "starting_year",
      meta: { filterVariant: "dateRange" },
      cell: ({ row }) => {
        const startYear = row.original.starting_year
          ? new Date(row.original.starting_year).getFullYear()
          : null;
        const endYear = row.original.ending_year
          ? new Date(row.original.ending_year).getFullYear()
          : null;

        return (
          <div className="text-sm">
            {startYear && endYear
              ? `${startYear} - ${endYear}`
              : startYear
                ? `From ${startYear}`
                : "Not set"}
          </div>
        );
      },
    },
    {
      header: "Created / Updated",
      accessorKey: "created_at",
      meta: { filterVariant: "dateRange" },
      cell: ({ row }) => {
        return (
          <div className="space-y-1 text-sm">
            <div className="flex flex-row gap-2">
              <span className="text-muted-foreground">Created:</span>
              <span>
                {row.original.created_at
                  ? new Date(row.original.created_at).toLocaleDateString()
                  : "-"}
              </span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-muted-foreground">Updated:</span>
              <span>
                {row.original.updated_at
                  ? new Date(row.original.updated_at).toLocaleDateString()
                  : "-"}
              </span>
            </div>
          </div>
        );
      },
    },
  ];
};
