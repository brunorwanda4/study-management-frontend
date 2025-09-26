"use client";

import { CommonDataTable } from "@/components/common/table/common-data-table";
import TableFilter from "@/components/common/table/table-filter";
import CreateTradeDialog from "@/components/page/admin/trades/createTradeDialog";
import { getTradesTableColumns } from "@/components/page/admin/trades/getTradesTableColumns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema";
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
  data: TradeModelWithOthers[];
  auth: AuthUserResult;
}

const TradesTableCollection = ({ data, auth }: Props) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  const columns = getTradesTableColumns();

  const table = useReactTable<TradeModelWithOthers>({
    data,
    columns: columns as ColumnDef<TradeModelWithOthers, unknown>[],
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
          <CardTitle>Trades</CardTitle>
          <CardDescription>All registered education trades</CardDescription>
        </div>
        <CreateTradeDialog auth={auth} />
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
          <div className="w-36">
            <TableFilter column={table.getColumn("type")!} />
          </div>
          <div className="w-44">
            <TableFilter column={table.getColumn("sector")!} />
          </div>
          <div className="w-44">
            <TableFilter column={table.getColumn("parent_trade")!} />
          </div>
        </div>

        {/* Data table */}
        <CommonDataTable table={table} columns={columns} data={data} />
      </CardContent>
    </Card>
  );
};

export default TradesTableCollection;
