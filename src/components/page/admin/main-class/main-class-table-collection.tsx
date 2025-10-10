"use client";

import RealtimeEnabled from "@/components/common/realtime-enabled";
import { CommonDataTable } from "@/components/common/table/common-data-table";
import TableFilter from "@/components/common/table/table-filter";
import CreateMainClassDialog from "@/components/page/admin/main-class/create-main-class-dialog";
import { getMainClassesTableColumns } from "@/components/page/admin/main-class/getMainClassesTableColumns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { mainClassModelWithTrade } from "@/lib/schema/admin/main-classes-schema";
import { AuthUserResult } from "@/lib/utils/auth-user";
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

interface Props {
  auth: AuthUserResult;
  initialClasses?: mainClassModelWithTrade[];
  realtimeEnabled?: boolean;
}

const MainClassesTableCollection = ({
  auth,
  initialClasses = [],
  realtimeEnabled = false,
}: Props) => {
  const { data: classes, isConnected } =
    useRealtimeData<mainClassModelWithTrade>("main_class");
  const [displayClasses, setDisplayClasses] =
    useState<mainClassModelWithTrade[]>(initialClasses);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  // Sync with realtime data when available
  useEffect(() => {
    if (realtimeEnabled && classes) {
      // Always use realtime data when realtime is enabled, even if empty array
      setDisplayClasses(classes);
    } else if (!realtimeEnabled) {
      // Fall back to initial data when realtime is disabled
      setDisplayClasses(initialClasses);
    }
  }, [classes, realtimeEnabled, initialClasses]);

  const columns = getMainClassesTableColumns();

  const table = useReactTable<mainClassModelWithTrade>({
    data: displayClasses,
    columns: columns as ColumnDef<mainClassModelWithTrade, unknown>[],
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
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-2">
          <CardTitle className="flex items-center gap-4">
            <span>Main Classes</span>
            {realtimeEnabled && <RealtimeEnabled isConnected={isConnected} />}
          </CardTitle>
          <CardDescription>All registered main classes</CardDescription>
        </div>
        <CreateMainClassDialog auth={auth} />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Example filters */}
        <div className="flex flex-wrap gap-3">
          <div className="w-44">
            <TableFilter column={table.getColumn("name")!} />
          </div>
          <div className="w-36">
            <TableFilter column={table.getColumn("username")!} />
          </div>
          <div className="w-40">
            <TableFilter column={table.getColumn("trade")!} />
          </div>
        </div>

        {/* Data table */}
        <CommonDataTable
          table={table}
          columns={columns}
          data={displayClasses}
        />
      </CardContent>
    </Card>
  );
};

export default MainClassesTableCollection;
