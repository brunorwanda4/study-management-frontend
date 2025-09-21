"use client";

import MyImage from "@/components/common/myImage";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { generateEducationIcon } from "@/lib/utils/generate-profile-image";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const getSectorsTableColumns = (): ColumnDef<SectorModel>[] => {
  return [
    {
      header: "Name",
      accessorKey: "name",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <Link
          href={`/a/database/sectors/${row.original.username}`}
          className="flex flex-row items-center gap-2"
        >
          <MyImage
            src={row.original.logo || generateEducationIcon()}
            alt={`Education logo ${row.original.name}`}
            className="size-12"
          />
          <span className="font-medium">{row.original.name}</span>
        </Link>
      ),
    },
    {
      header: "Username",
      accessorKey: "username",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <Link href={`/a/database/sectors/${row.original.username}`}>
          {row.original.username}
        </Link>
      ),
    },
    {
      header: "Type",
      accessorKey: "type",
      meta: { filterVariant: "select" },
    },
    {
      header: "Country",
      accessorKey: "country",
      meta: { filterVariant: "text" },
    },
    {
      header: "Curriculum",
      accessorKey: "curriculum",
      meta: { filterVariant: "range" },
      cell: ({ row }) => row.original.curriculum?.join(" - ") ?? "N/A",
    },

    {
      header: "Created At",
      accessorKey: "created_at",
      meta: { filterVariant: "dateRange" },
      cell: ({ row }) => {
        return (
          <div className="space-y-2">
            <div className="flex flex-row gap-1">
              <span>Created on:</span>
              <span>
                {row.original.created_at
                  ? new Date(row.original.created_at).toLocaleDateString()
                  : "-"}
              </span>
            </div>
            <div className="flex flex-row gap-1">
              <span>update on:</span>
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
