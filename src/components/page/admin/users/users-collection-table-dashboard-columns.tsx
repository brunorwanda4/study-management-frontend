"use client";

import MyImage from "@/components/common/myImage";
import { UserModel } from "@/lib/schema/user/user-schema";
import { cn } from "@/lib/utils";
import { generateImageProfile } from "@/lib/utils/generate-profile-image";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const getUsersTableCollectionDashboardColumns =
  (): ColumnDef<UserModel>[] => [
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
              row.original.disable
                ? "text-warning tooltip tooltip-warning"
                : "",
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
  ];
