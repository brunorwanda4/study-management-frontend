/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CommonDataTable } from "@/components/common/table/common-data-table";
import TableFilter from "@/components/common/table/table-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { Class } from "@/lib/schema/class/class-schema";
import { StudentWithRelations } from "@/lib/schema/school/student-schema";
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
import { StudentTableColumns } from "./student-table-columns";

interface props {
  students: StudentWithRelations[];
  lang: Locale;
  classes: Class[];
  auth: AuthContext;
  realtimeEnabled?: boolean;
}

export default function SchoolStudentTable({
  students,
  lang,
  classes,
  auth,
  realtimeEnabled = false,
}: props) {
  const { data: initialStudents, isConnected } =
    useRealtimeData<StudentWithRelations>("student");
  const [displayStudents, setDisplayStudents] =
    useState<StudentWithRelations[]>(students);

  useEffect(() => {
    if (realtimeEnabled && initialStudents) {
      setDisplayStudents(initialStudents as StudentWithRelations[]);
    } else if (!realtimeEnabled) {
      setDisplayStudents(initialStudents);
    }
  }, [initialStudents, realtimeEnabled]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "updated_at",
      desc: false,
    },
  ]);

  const tableColumns = useMemo(() => StudentTableColumns(lang), [lang]); // Memoize columns

  const table = useReactTable({
    data: displayStudents,
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
    enableSortingRemoval: false,
  });

  return (
    <Card>
      <CardHeader className="flex w-full justify-between">
        <div className="flex items-center justify-between px-4 pt-4 pb-0">
          <CardTitle className="">Students</CardTitle>
        </div>
      </CardHeader>
      <div className="flex flex-wrap gap-3 border-b px-4 py-2">
        <div className="w-44">
          <TableFilter column={table.getColumn("name")!} />
        </div>
        <div className="w-32">
          <TableFilter column={table.getColumn("gender")!} />
        </div>
        <div className="w-36">
          <TableFilter column={table.getColumn("age")!} />
        </div>
        <div className="w-40">
          <TableFilter column={table.getColumn("phone")!} />
        </div>
      </div>

      <CardContent className="p-0">
        <CommonDataTable
          table={table}
          columns={tableColumns}
          data={displayStudents}
        />
      </CardContent>
    </Card>
  );
}
