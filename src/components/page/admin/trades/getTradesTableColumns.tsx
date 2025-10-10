"use client";

import MyImage from "@/components/common/myImage";
import { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const getTradesTableColumns = (): ColumnDef<TradeModelWithOthers>[] => {
  return [
    {
      header: "Name",
      accessorKey: "name",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <Link
          href={`/a/collections/trades/${row.original.username}`}
          className={cn(
            "flex flex-row items-center gap-2",
            row.original.disable ? "text-warning tooltip tooltip-warning" : "",
          )}
          data-tip={cn(row.original.disable ? "Disabled Trade" : "")}
        >
          <span className="font-medium">{row.original.name}</span>
        </Link>
      ),
    },
    {
      header: "Username",
      accessorKey: "username",
      meta: { filterVariant: "text" },
      cell: ({ row }) => (
        <Link
          href={`/a/collections/trades/${row.original.username}`}
          className={cn(
            "flex items-center gap-2",
            row.original.disable ? "text-warning tooltip tooltip-warning" : "",
          )}
          data-tip={cn(row.original.disable ? "Disabled Trade" : "")}
        >
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
      header: "Sector",
      accessorKey: "sector",
      accessorFn: (row) => row.sector?.name ?? "Unassigned",
      meta: { filterVariant: "select" },
      cell: ({ row }) => {
        if (!row.original.sector)
          return (
            <span className="cursor-not-allowed font-medium opacity-50">
              Unassigned
            </span>
          );
        return (
          <Link
            href={`/a/collections/sectors/${row.original.sector?.username}`}
            className="flex items-center gap-2"
          >
            {row.original.sector?.logo && (
              <MyImage src={row.original.sector?.logo} role="ICON" />
            )}
            {row.original.sector?.name}
          </Link>
        );
      },
    },
    {
      header: "Trade",
      accessorKey: "parent_trade",
      accessorFn: (row) => row.parent_trade?.name ?? "Unassigned",
      meta: { filterVariant: "select" },
      cell: ({ row }) => {
        if (!row.original.parent_trade)
          return (
            <span className="cursor-not-allowed font-medium opacity-50">
              Unassigned
            </span>
          );
        return (
          <Link
            href={`/a/collections/trades/${row.original.parent_trade?.username}`}
          >
            {row.original.parent_trade?.name}
          </Link>
        );
      },
    },
    {
      header: "Classes",
      accessorKey: "class_min",
      meta: { filterVariant: "range" },
      cell: ({ row }) =>
        `${row.original.class_min} - ${row.original.class_max}`,
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
              <span>Updated on:</span>
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
