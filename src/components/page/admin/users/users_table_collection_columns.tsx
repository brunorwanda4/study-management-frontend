"use client";

import MyImage from "@/components/common/myImage";
import type { UserModel } from "@/lib/schema/user/user-schema";
import { cn } from "@/lib/utils";
import { generateImageProfile } from "@/lib/utils/generate-profile-image";
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
          <MyImage
            role="AVATAR"
            className="size-12"
            src={
              row.original.image ||
              generateImageProfile(row.original.name, row.original.gender)
            }
          />
          <div className="flex flex-col gap-1">
            <span className="font-medium">{row.original.name}</span>
            <span className="text-sm">{row.original.gender}</span>
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
    header: "School",
    accessorFn: (user) =>
      user.current_school_id ? "Assigned" : "Not Assigned",
    id: "school",
    meta: { filterVariant: "select" },
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
