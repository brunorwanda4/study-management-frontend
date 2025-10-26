"use client";

import RealtimeEnabled from "@/components/common/realtime-enabled";
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
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema";
import type { TradeWithNonNullableId } from "@/lib/types/tradeModel";
import type { AuthContext } from "@/lib/utils/auth-context";
import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface Props {
  auth: AuthContext;
  initialTrades?: TradeModelWithOthers[];
  realtimeEnabled?: boolean;
}

const TradesTableCollection = ({
  auth,
  initialTrades = [],
  realtimeEnabled = false,
}: Props) => {
  const { data: trades, isConnected } =
    useRealtimeData<TradeWithNonNullableId>("trade");
  const [displayTrades, setDisplayTrades] =
    useState<TradeModelWithOthers[]>(initialTrades);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "updated_at", desc: false },
  ]);

  // Sync with realtime data when available
  useEffect(() => {
    if (realtimeEnabled && trades) {
      // Always use realtime data when realtime is enabled, even if empty array
      setDisplayTrades(trades as TradeModelWithOthers[]);
    } else if (!realtimeEnabled) {
      // Fall back to initial data when realtime is disabled
      setDisplayTrades(initialTrades);
    }
  }, [trades, realtimeEnabled, initialTrades]);

  const columns = getTradesTableColumns();

  const table = useReactTable<TradeModelWithOthers>({
    data: displayTrades,
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
          <CardTitle className="flex items-center gap-4">
            <span>Trades</span>
            {realtimeEnabled && <RealtimeEnabled isConnected={isConnected} />}
          </CardTitle>
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
        <CommonDataTable table={table} columns={columns} data={displayTrades} />
      </CardContent>
    </Card>
  );
};

export default TradesTableCollection;
