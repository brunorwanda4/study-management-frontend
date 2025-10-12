"use client";
import MyImage from "@/components/common/myImage";
import { CommonDataTable } from "@/components/common/table/common-data-table";
import { getUsersTableCollectionDashboardColumns } from "@/components/page/admin/users/users-collection-table-dashboard-columns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { UserModel } from "@/lib/schema/user/user-schema";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface props {
  realtimeEnabled?: boolean;
  initialUsers: UserModel[];
}

const UsersCollectionTableDashboard = ({
  realtimeEnabled,
  initialUsers,
}: props) => {
  const { data: users, isConnected } = useRealtimeData<UserModel>("user");
  const [displayUsers, setDisplayUsers] = useState<UserModel[]>(initialUsers);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  useEffect(() => {
    if (realtimeEnabled && users) {
      setDisplayUsers(users as UserModel[]);
    } else if (!realtimeEnabled) {
      setDisplayUsers(initialUsers);
    }
  }, [users, realtimeEnabled, initialUsers]);

  const columns = getUsersTableCollectionDashboardColumns();

  const table = useReactTable<UserModel>({
    data: displayUsers,
    columns: columns as ColumnDef<UserModel, unknown>[],
    state: { sorting, columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onSortingChange: setSorting,
  });
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <MyImage src="/icons/family.png" role="ICON" loading="lazy" />
            <CardTitle>Users</CardTitle>
          </div>
          <Button
            href="/a/collections/users"
            type="button"
            library="daisy"
            variant={"secondary"}
            size={"sm"}
            role="href"
          >
            View all
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CommonDataTable
          noFooter
          table={table}
          columns={columns}
          data={displayUsers}
        />
      </CardContent>
    </Card>
  );
};

export default UsersCollectionTableDashboard;
