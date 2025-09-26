"use client";

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
import { useState } from "react";

interface Props {
  data: mainClassModelWithTrade[];
  auth: AuthUserResult;
}

const MainClassesTableCollection = ({ data, auth }: Props) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  const columns = getMainClassesTableColumns();

  const table = useReactTable<mainClassModelWithTrade>({
    data,
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
          <CardTitle>Main Classes</CardTitle>
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
        <CommonDataTable table={table} columns={columns} data={data} />
      </CardContent>
    </Card>
  );
};

export default MainClassesTableCollection;
