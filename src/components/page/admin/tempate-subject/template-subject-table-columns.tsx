"use client";

import MyLink, { LoadingIndicatorText } from "@/components/common/myLink";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n";
import type { TemplateSubjectWithOther } from "@/lib/schema/subject/template-schema";
import { cn } from "@/lib/utils";
import { formatReadableDate } from "@/lib/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";

export const templateSubjectTableColumns = (
  lang: Locale,
): ColumnDef<TemplateSubjectWithOther>[] => {
  return [
    {
      header: "Subject",
      accessorKey: "name",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <MyLink
          href={`/a/collections/template_subjects/${row.original.code}`}
          className={cn("flex flex-col gap-1")}
        >
          <span className="font-medium">{row.original.name}</span>
        </MyLink>
      ),
    },
    {
      header: "Code",
      accessorKey: "code",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <MyLink href={`/a/collections/template_subjects/${row.original.code}`}>
          <span className="">{row.original.code}</span>
        </MyLink>
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
      header: "Prerequisites",
      accessorKey: "prerequisites",
      cell: ({ row }) => {
        if (row.original.prerequisite_classes) {
          return (
            <div>
              {row.original.prerequisite_classes.slice(0, 2).map((cls) => {
                return (
                  <MyLink
                    href={`/${lang}/a/collections/main_classes/${cls.username}`}
                    key={cls._id || cls.username}
                    // loading
                  >
                    <LoadingIndicatorText>{cls.name}</LoadingIndicatorText>
                  </MyLink>
                );
              })}
            </div>
          );
        }
        return (
          <div className="text-sm">
            {row.original.prerequisites && row.original.prerequisites.length > 0
              ? `${row.original.prerequisites.length} classes`
              : "None"}
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
                  ? formatReadableDate(row.original.created_at)
                  : "-"}
              </span>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-muted-foreground">Updated:</span>
              <span>
                {row.original.updated_at
                  ? formatReadableDate(row.original.updated_at)
                  : "-"}
              </span>
            </div>
          </div>
        );
      },
    },
  ];
};
