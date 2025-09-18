"use client";

import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/lib/hooks/use-toast";
import { FetchError } from "@/lib/types/fetchErr";
import { UserModel, UserModelPut, UserRoleModel } from "@/lib/types/userModel";
import { cn } from "@/lib/utils";
import { updateUserAPI } from "@/service/admin/fetchDataFn";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { FaCloudArrowDown } from "react-icons/fa6";
import CreateNewUserDialog from "./createNewUserDialog";
import UserActionDialog from "./userActionDialog";

interface props {
  users: UserModel[];
  usersRole: UserRoleModel[] | FetchError;
  collectionName: string;
}

const UsersTableCollection = ({ users, usersRole, collectionName }: props) => {
  const [isPending, startTransition] = useTransition();
  const [SelectedUsers, setSelectedUsers] = useState<UserModel[]>([]);

  const columns: ColumnDef<UserModel>[] = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              setSelectedUsers(
                value
                  ? table.getFilteredRowModel().rows.map((row) => row.original)
                  : [],
              );
            }}
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setSelectedUsers((prev) =>
              value
                ? [...prev, row.original]
                : prev.filter((user) => user.id !== row.original.id),
            );
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <Link
            href={`/collection/${collectionName}/${user.id}`}
            className={cn("link-hover", user.disable && "text-warning")}
          >
            {row.getValue("name")}
          </Link>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-lowercase">{row.getValue("email")}</span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <span>{row.getValue("role")}</span>,
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => <span>{row.getValue("username") || "N/A"}</span>,
    },
    {
      accessorKey: "create_on",
      header: "Created On",
      cell: ({ row }) => (
        <span>{new Date(row.getValue("create_on")).toLocaleDateString()}</span>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        const disableUser: UserModelPut = { disable: true };
        const Enable: UserModelPut = { disable: false };
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-base-200">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/collection/${collectionName}/${payment.id}`}>
                  View account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={isPending}
                onClick={() =>
                  handleSubmit(
                    payment.disable ? Enable : disableUser,
                    payment.id,
                  )
                }
                className="text-warning"
              >
                {payment.disable ? "Enable" : "Disable"} account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleSubmit = (values: UserModelPut, id: string) => {
    startTransition(async () => {
      const result = await updateUserAPI(values, id);

      if ("message" in result) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: result.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: `User ${result.name} updated successfully`,
          description: <div>user: {result.name}</div>,
        });
      }
    });
  };

  return (
    <div className="happy-card container overflow-x-auto p-0">
      <div className="flex justify-between p-4">
        <h1 className="happy-title-base">Users Table ({users.length})</h1>
        <div className="space-x-2">
          {SelectedUsers.length > 0 && (
            <UserActionDialog
              setUsers={setSelectedUsers}
              users={SelectedUsers}
            />
          )}
          <CreateNewUserDialog usersRole={usersRole} />
          <Button variant="success" size="sm">
            <FaCloudArrowDown /> Export
          </Button>
        </div>
      </div>
      <Separator />
      <div className="p-4 pt-0">
        <DataTable
          columns={columns}
          data={users}
          searchKeys={["email", "name", "role"]}
        />
      </div>
    </div>
  );
};

export default UsersTableCollection;
