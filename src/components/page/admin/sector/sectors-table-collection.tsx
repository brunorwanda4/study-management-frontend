"use client";

import { CommonDataTable } from "@/components/common/table/common-data-table";
import TableFilter from "@/components/common/table/table-filter";
import CreateSectorDialog from "@/components/page/admin/sector/CreateSectorDialog";
import { getSectorsTableColumns } from "@/components/page/admin/sector/getSectorsTableColumns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
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
  auth: AuthUserResult;
  realtimeEnabled?: boolean;
}

const SectorsTableCollection = ({ auth, realtimeEnabled = false }: Props) => {
  const { data: sectors, isConnected } = useRealtimeData<SectorModel>();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  const columns = getSectorsTableColumns();

  const table = useReactTable<SectorModel>({
    data: sectors,
    columns: columns as ColumnDef<SectorModel, unknown>[],
    state: { sorting, columnFilters },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-2">
          <CardTitle>Sectors</CardTitle>
          <CardDescription>
            All registered education sectors
            {realtimeEnabled && (
              <div className="mt-1 flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    isConnected ? "animate-pulse bg-green-500" : "bg-yellow-500"
                  }`}
                />
                <span className="text-muted-foreground text-xs">
                  {isConnected ? "Live updates connected" : "Connecting..."}
                </span>
              </div>
            )}
          </CardDescription>
        </div>

        <CreateSectorDialog auth={auth} />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="w-44">
            <TableFilter column={table.getColumn("name")!} />
          </div>
          <div className="w-36">
            <TableFilter column={table.getColumn("username")!} />
          </div>
          <div className="w-36">
            <TableFilter column={table.getColumn("type")!} />
          </div>
          <div className="w-36">
            <TableFilter column={table.getColumn("country")!} />
          </div>
        </div>

        {/* Data table */}
        <CommonDataTable table={table} columns={columns} data={sectors} />
      </CardContent>
    </Card>
  );
};

export default SectorsTableCollection;
