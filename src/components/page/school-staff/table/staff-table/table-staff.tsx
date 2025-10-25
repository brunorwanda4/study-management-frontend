"use client";

import { CommonDataTable } from "@/components/common/table/common-data-table";
import TableFilter from "@/components/common/table/table-filter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { SchoolStaffWithRelations } from "@/lib/schema/school/school-staff-schema";
import { AuthContext } from "@/lib/utils/auth-context";
import {
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
import { useEffect, useMemo, useState } from "react";
import { StaffTableColumns } from "./staff-table-columns";

interface props {
  staffs: SchoolStaffWithRelations[];
  lang: Locale;
  auth: AuthContext;
  realtimeEnabled?: boolean;
}

export default function SchoolStaffTable({
  staffs,
  lang,
  auth,
  realtimeEnabled = false,
}: props) {
  const { data: initialStaff, isConnected } =
    useRealtimeData<SchoolStaffWithRelations>("school_staff");
  const [displayStaff, setDisplayStaff] =
    useState<SchoolStaffWithRelations[]>(staffs);

  useEffect(() => {
    if (realtimeEnabled && initialStaff) {
      setDisplayStaff(initialStaff as SchoolStaffWithRelations[]);
    } else if (!realtimeEnabled) {
      setDisplayStaff(initialStaff);
    }
  }, [initialStaff, realtimeEnabled]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "updated_at",
      desc: false,
    },
  ]);

  const data = useMemo(() => staffs, [staffs]); // Memoize data
  const tableColumns = useMemo(() => StaffTableColumns(lang), [lang]); // Memoize columns

  const table = useReactTable({
    data: data,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onSortingChange: setSorting,
    enableSortingRemoval: false, // Keep or change as needed
    // Add meta data if needed for filters accessing table instance
    // meta: {
    //    getUniqueClassNames: () => { ... calculate unique class names from 'students' ... }
    // }
  });

  // Make sure the 'colSpan' in the empty state matches the new number of columns
  const numberOfColumns = table.getAllColumns().length;

  return (
    <Card>
      <CardHeader className="flex items-center justify-between px-4 pt-4 pb-0">
        <h3 className="title-page">Staffs</h3>
      </CardHeader>
      <div className="flex flex-wrap gap-3 border-b px-4 py-2">
        <div className="w-44">
          <TableFilter column={table.getColumn("name")!} />
        </div>
        <div className="w-32">
          <TableFilter column={table.getColumn("gender")!} />
        </div>
        <div className="w-40">
          <TableFilter column={table.getColumn("phone")!} />
        </div>
        <div className="w-36">
          <TableFilter column={table.getColumn("createAt")!} />
        </div>
      </div>

      <CardContent className="p-0">
        <CommonDataTable
          table={table}
          columns={tableColumns}
          data={displayStaff}
        />
      </CardContent>
    </Card>
  );
}
