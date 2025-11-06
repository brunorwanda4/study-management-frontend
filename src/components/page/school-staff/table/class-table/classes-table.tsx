"use client";

import { CommonDataTable } from "@/components/common/table/common-data-table";
import { ClassTableColumn } from "@/components/page/school-staff/table/class-table/class-table-column";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { ClassWithOthers } from "@/lib/schema/relations-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import {
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

// --- Column Definitions for Classes ---

interface ClassTableProps {
  classes: ClassWithOthers[];
  lang: Locale;
  realtimeEnabled?: boolean;
  auth: AuthContext;
}
// --- React Component ---
export default function ClassesTable({
  classes,
  lang,
  auth,
  realtimeEnabled = true,
}: ClassTableProps) {
  const { data: initialClasses, isConnected } =
    useRealtimeData<ClassWithOthers>("class");
  const [displayClasses, setDisplayClasses] =
    useState<ClassWithOthers[]>(classes);

  useEffect(() => {
    if (realtimeEnabled && initialClasses) {
      setDisplayClasses(initialClasses as ClassWithOthers[]);
    } else if (!realtimeEnabled) {
      setDisplayClasses(initialClasses);
    }
  }, [initialClasses, realtimeEnabled]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name", // Default sort by name
      desc: false,
    },
  ]);

  const [rowSelection, setRowSelection] = useState({}); // Add row selection state
  const tableColumns = ClassTableColumn(lang, auth);
  const table = useReactTable({
    data: classes, // Use the new classes data
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
      rowSelection, // Pass row selection state
    },
    enableRowSelection: true, // Enable row selection
    onRowSelectionChange: setRowSelection, // Add handler for row selection
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client-side filtering
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
    onSortingChange: setSorting,
    enableSortingRemoval: false,
  });

  return (
    <Card>
      <CardHeader className=" border-b-0">
        <CardTitle>All Classes</CardTitle>
        {/* Add description or controls here if needed */}
      </CardHeader>

      <CardContent className="p-0">
        <CommonDataTable
          table={table}
          columns={tableColumns}
          data={displayClasses}
        />
      </CardContent>
    </Card>
  );
}
