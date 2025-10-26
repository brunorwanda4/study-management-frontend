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
import { mainCollections } from "@/lib/const/main-collections";
import { CollectionStats, DatabaseStats } from "@/lib/types/databaseStatus";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface Props {
  data: DatabaseStats;
}

const CollectionsTable = ({ data }: Props) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // ✅ our custom sorting: main collections first, others after, alphabetically
  const mainNames = mainCollections.map((m) => m.name);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
      // @ts-ignore: we attach custom compare logic to this sorting
      compareFn: (a: string, b: string) => {
        const aIsMain = mainNames.includes(a);
        const bIsMain = mainNames.includes(b);

        if (aIsMain && !bIsMain) return -1;
        if (!aIsMain && bIsMain) return 1;
        return a.localeCompare(b);
      },
    },
  ]);

  const columns = getCollectionsTableColumns(data) as ColumnDef<
    CollectionStats,
    unknown
  >[];

  // ✅ Let table use that new sorting
  const table = useReactTable<CollectionStats>({
    data: data.collections,
    columns,
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
      <CardHeader>
        <div className="space-y-2">
          <CardTitle>Collections</CardTitle>
          <CardDescription>
            All collections are in database <strong>MongoDB</strong>.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filters */}
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

        {/* Table */}
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
