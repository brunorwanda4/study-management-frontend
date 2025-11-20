"use client";

import MyAvatar from "@/components/common/image/my-avatar";
import type { UserModel } from "@/lib/schema/user/user-schema";
import { cn } from "@/lib/utils";
import { formatTimeAgo } from "@/lib/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const getUsersTableCollectionColumns = (): ColumnDef<UserModel>[] => [
  {
    header: "Name",
    accessorKey: "name",
    meta: { filterVariant: "text" },
    cell: ({ row }) => {
      return (
        <Link
          href={`/a/collections/users/${row.original.username}`}
          className={cn(
            "flex flex-row items-center gap-2",
            row.original.disable && "text-warning tooltip tooltip-warning",
          )}
          data-tip={cn(row.original.disable && "Disabled user")}
        >
          <MyAvatar
            src={row.original.image}
            alt={row.original.name}
            type="squircle"
            size="sm"
          />
          <div className="flex flex-col gap-1">
            <span
              className="font-medium line-clamp-1"
              title={row.original.name}
            >
              {row.original.name}
            </span>
            <span className="text-sm" title={row.original.name}>
              {row.original.gender}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    header: "Username",
    accessorKey: "username",
    meta: { filterVariant: "text" },
    cell: ({ row }) => {
      return (
        <Link
          href={`/a/collections/users/${row.original.username}`}
          className={cn(
            "flex items-center gap-2",
            row.original.disable ? "text-warning tooltip tooltip-warning" : "",
          )}
          data-tip={cn(row.original.disable ? "Disabled user" : "")}
        >
          {row.original.username}
        </Link>
      );
    },
  },
  {
    header: "Email",
    accessorKey: "email",
    meta: { filterVariant: "text" },
    cell: ({ row }) => {
      return (
        <Link href={`/a/collections/users/${row.original.username}`}>
          {row.original.email}
        </Link>
      );
    },
  },
  {
    header: "Role",
    accessorFn: (user) => user.role ?? "N/A",
    id: "role",
    meta: { filterVariant: "select" },
  },
  {
    header: "Phone",
    accessorKey: "phone",
    meta: { filterVariant: "text" },
  },
  {
    header: "Created At",
    accessorKey: "created_at",
    meta: { filterVariant: "dateRange" },
    cell: ({ row }) => {
      return (
        <div className="space-y-2">
          <div className="flex flex-row gap-1">
            <span title="Created on" className=" text-xs line-clamp-1">
              Created on:
            </span>
            <span
              title={row.original.created_at}
              className=" text-xs line-clamp-1"
            >
              {row.original.created_at
                ? formatTimeAgo(row.original.created_at)
                : "-"}
            </span>
          </div>
          <div className="flex flex-row gap-1">
            <span title="update on" className=" text-xs line-clamp-1">
              update on:
            </span>
            <span
              title={row.original.updated_at}
              className=" text-xs line-clamp-1"
            >
              {row.original.updated_at
                ? formatTimeAgo(row.original.updated_at)
                : "-"}
            </span>
          </div>
        </div>
      );
    },
  },
];
