"use client";

import { CommonDataTable } from "@/components/common/table/common-data-table";
import TableFilter from "@/components/common/table/table-filter";
import { getCollectionsTableColumns } from "@/components/page/admin/database/collections_table_column";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CollectionStats, DatabaseStats } from "@/lib/types/databaseStatus";
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
  data: DatabaseStats;
}

const CollectionsTable = ({ data }: Props) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  // ✅ Pass database stats into column builder
  const columns = getCollectionsTableColumns(data);

  // ✅ Table must be based on CollectionStats, not DatabaseStats
  const table = useReactTable<CollectionStats>({
    data: data.collections,
    columns: columns as ColumnDef<CollectionStats, unknown>[],
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
      <CardHeader>
        <div className="space-y-2">
          <CardTitle>Collections</CardTitle>
          <CardDescription>
            All collections are in database 'Mongodb'
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <div className="w-44">
            <TableFilter column={table.getColumn("name")!} />
          </div>
          <div className="w-36">
            <TableFilter column={table.getColumn("document_count")!} />
          </div>
          <div className="w-36">
            <TableFilter column={table.getColumn("size_bytes")!} />
          </div>
        </div>
        <CommonDataTable
          table={table}
          columns={columns}
          data={data.collections}
        />
      </CardContent>
    </Card>
  );
};

export default CollectionsTable;
