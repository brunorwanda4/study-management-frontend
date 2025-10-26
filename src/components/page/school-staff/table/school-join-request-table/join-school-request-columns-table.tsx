"use client";

import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/i18n";
import { studentImage, teacherImage } from "@/lib/context/images";
import { useToast } from "@/lib/context/toast/ToastContext";
import { formatTimeAgo } from "@/lib/functions/change-time";
import type { JoinStatus } from "@/lib/schema/common-details-schema";
import type {
  JoinSchoolRequest,
  JoinSchoolRequestWithRelations,
} from "@/lib/schema/school/school-join-school/join-school-request-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Clock,
  LogIn,
  LogOut,
  MoreHorizontal,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";
import { useState, useTransition } from "react";

export const JoinSchoolRequestColumns = (
  lang: Locale,
  auth: AuthContext,
): ColumnDef<JoinSchoolRequest>[] => {
  const columns: ColumnDef<JoinSchoolRequestWithRelations>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          // Stop propagation if clicking checkbox shouldn't trigger row actions
          // onClick={(e) => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: "Applicant", // Combines Name/Email for brevity, or keep separate
      accessorKey: "name", // Sort/Filter primarily by name
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-3">
            {item.invited_user ? (
              <MyLink loading href={`/${lang}/p/${item.invited_user.username}`}>
                <MyImage
                  className="size-12 rounded-full"
                  role="AVATAR"
                  src={
                    item.invited_user.image ||
                    (item.invited_user.role === "STUDENT"
                      ? studentImage
                      : teacherImage)
                  }
                  alt={item.invited_user.name ?? undefined}
                />
              </MyLink>
            ) : (
              <MyImage
                className="size-12 rounded-full"
                role="AVATAR"
                src={item.role === "Student" ? studentImage : teacherImage}
                alt={item.email ?? undefined}
              />
            )}
            <div className="flex flex-col">
              {item.invited_user && (
                <MyLink
                  loading
                  href={`/${lang}/p/${item.invited_user.username}`}
                  className="font-medium"
                >
                  <span>{item.invited_user.name}</span>
                </MyLink>
              )}
              <span className="text-muted-foreground mt-0.5 text-xs">
                {item.email}
              </span>
            </div>
          </div>
        );
      },
      meta: {
        filterVariant: "text",
      },
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 capitalize">
          <Users className="text-muted-foreground h-4 w-4" />
          {row.getValue("role")}
        </div>
      ),
      meta: {
        filterVariant: "select",
      },
      filterFn: (row, id, filterValue) => {
        const rowValue = row.getValue(id);
        if (filterValue === undefined || filterValue === "all") return true;
        return rowValue === filterValue;
      },
    },
    // {
    //   header: "Class",
    //   accessorKey: "className", // Use the derived className
    //   cell: ({ row }) => {
    //     const className = row.original.class?.name;
    //     const classLink = row.original.classId
    //       ? `/${lang}/c/${row.original.classId}`
    //       : undefined;
    //     const content = (
    //       <div className="flex items-center gap-1">
    //         <Library className="text-muted-foreground h-4 w-4" />
    //         {className || <span className="text-muted-foreground">-</span>}
    //       </div>
    //     );
    //     return className && classLink ? (
    //       <MyLink href={classLink}>{content}</MyLink>
    //     ) : (
    //       content
    //     );
    //   },
    //   meta: {
    //     filterVariant: "select", // Or 'text' if many classes
    //   },
    //   filterFn: (row, id, filterValue) => {
    //     const rowValue = row.getValue(id);
    //     if (filterValue === undefined || filterValue === "all") return true;
    //     // Handle null/undefined matching 'None' or similar if added to select
    //     if (filterValue === "none" && !rowValue) return true;
    //     return rowValue === filterValue;
    //   },
    // }, // TODO: add class in join school schema
    {
      header: "Source",
      accessorKey: "fromUser",
      cell: ({ row }) => {
        const fromUser = row.getValue("fromUser");
        const Icon = fromUser ? LogIn : LogOut;
        return (
          <div className="flex items-center gap-1">
            <Icon className="text-muted-foreground h-4 w-4" />
            {fromUser ? "User Request" : "School Invite"}
          </div>
        );
      },
      meta: {
        filterVariant: "select",
      },
      filterFn: (row, id, filterValue) => {
        const rowValue = row.getValue(id); // boolean
        if (filterValue === undefined || filterValue === "all") return true;
        return rowValue === (filterValue === "true");
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.getValue("status") as JoinStatus;
        let variant: "default" | "secondary" | "destructive" | "outline" =
          "secondary";
        let Icon = Clock;
        if (status === "Accepted") {
          variant = "default";
          Icon = UserCheck;
        } else if (status === "Rejected") {
          variant = "destructive";
          Icon = UserX;
        } // Pending uses Clock and 'secondary'

        return (
          <Badge
            variant={variant}
            className="flex items-center gap-1 capitalize"
          >
            <Icon className="h-3.5 w-3.5" />
            {status}
          </Badge>
        );
      },
      meta: {
        filterVariant: "select",
      },
      filterFn: (row, id, filterValue) => {
        const rowValue = row.getValue(id);
        if (filterValue === undefined || filterValue === "all") return true;
        return rowValue === filterValue;
      },
    },
    {
      header: "Requested",
      accessorKey: "createdAt",
      cell: ({ row }) => {
        return <time>{formatTimeAgo(row.original.created_at)}</time>;
      },
      enableSorting: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const request = row.original;
        const [isPending, startTransition] = useTransition();
        const { showToast } = useToast();
        const [open, setOpen] = useState(false);

        const handleDelete = () => {
          startTransition(async () => {
            const del_request = await apiRequest<void, { message: string }>(
              "delete",
              `/join-school-requests/${request._id || request.id}`,
              undefined,
              { token: auth.token, schoolToken: auth.schoolToken },
            );

            if (!del_request.data) {
              showToast({
                title: "Failed to delete request",
                description: del_request.message,
                type: "error",
              });
            } else {
              showToast({
                title: "Deleted successfully",
                description: "The join request has been removed.",
                type: "success",
              });
              setOpen(false); // <-- close popover after delete
            }
          });
        };

        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                shape="circle"
                library="daisy"
                className=""
                size="sm"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>

            <PopoverContent align="center" showArrow>
              <Label>Actions</Label>
              <div className="flex flex-col gap-0">
                {request.email && (
                  <Button
                    variant="ghost"
                    library="daisy"
                    className="justify-start"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(request.email!);
                      showToast({
                        title: "Copied!",
                        description: "Email copied to clipboard.",
                        type: "info",
                      });
                      setOpen(false); // optional — close after copy
                    }}
                  >
                    Copy email
                  </Button>
                )}

                <Button
                  variant="ghost"
                  library="daisy"
                  className="justify-start"
                  size="sm"
                  onClick={() => {
                    // cancel request logic...
                    setOpen(false);
                  }}
                >
                  Cancel request
                </Button>

                <Button
                  variant="ghost"
                  library="daisy"
                  className="justify-start"
                  size="sm"
                  onClick={() => {
                    console.log("View details for:", request.id);
                    setOpen(false);
                  }}
                >
                  View Details
                </Button>

                <Separator />

                <Button
                  variant="ghost"
                  library="daisy"
                  className="text-error justify-start"
                  size="sm"
                  role="delete"
                  onClick={handleDelete}
                  disabled={isPending}
                >
                  {isPending ? "Deleting..." : "Delete Request"}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return columns;
};
