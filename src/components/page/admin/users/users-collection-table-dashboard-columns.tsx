"use client";

import MyAvatar from "@/components/common/image/my-avatar";
import MyLink from "@/components/common/myLink";
import type { UserModel } from "@/lib/schema/user/user-schema";
import { cn } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const getUsersTableCollectionDashboardColumns =
  (): ColumnDef<UserModel>[] => [
    {
      header: "Name",
      accessorKey: "name",
      meta: { filterVariant: "text" },
      cell: ({ row }) => {
        return (
          <MyLink
            href={`/a/collections/users/${row.original.username}`}
            className={cn(
              "flex flex-row items-center gap-2",
              row.original.disable && "text-warning tooltip tooltip-warning",
            )}
            data-tip={cn(row.original.disable && "Disabled user")}
          >
            <MyAvatar
              alt={row.original.name}
              size="sm"
              src={row.original.image}
            />
            <div className="flex flex-col gap-1">
              <span
                title={row.original.name}
                className="font-medium line-clamp-1"
              >
                {row.original.name}
              </span>
              <span className="text-xs">{row.original.gender}</span>
            </div>
          </MyLink>
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
