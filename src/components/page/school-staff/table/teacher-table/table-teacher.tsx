"use client";

import { CommonDataTable } from "@/components/common/table/common-data-table";
import TableFilter from "@/components/common/table/table-filter";
import EmptyTeachers from "@/components/page/school-staff/school-teachers/empty-teachers";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { TeacherWithRelations } from "@/lib/schema/school/teacher-schema";
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
import { TeacherTableColumns } from "./teacher-table-columns";

interface props {
  teachers: TeacherWithRelations[];
  lang: Locale;
  auth: AuthContext;
  realtimeEnabled?: boolean;
}

export default function SchoolTeacherTable({
  teachers,
  lang,
  auth,
  realtimeEnabled = true,
}: props) {
  const { data: initialTeachers, isConnected } =
    useRealtimeData<TeacherWithRelations>("teacher");
  const [displayTeachers, setDisplayTeachers] =
    useState<TeacherWithRelations[]>(teachers);

  useEffect(() => {
    if (realtimeEnabled && initialTeachers) {
      setDisplayTeachers(initialTeachers as TeacherWithRelations[]);
    } else if (!realtimeEnabled) {
      setDisplayTeachers(initialTeachers);
    }
  }, [initialTeachers, realtimeEnabled]);


      if (displayTeachers.length === 0 && teachers.length === 0)
      return <EmptyTeachers isSchool auth={auth} />;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);

  const tableColumns = TeacherTableColumns(lang, auth);

  const table = useReactTable({
    data: displayTeachers,
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
    <Card className="basic-card-no-p space-y-6">
      <CardHeader className="flex items-center justify-between px-4 pt-4 pb-0">
        <h3 className="title-page">Teachers</h3>
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
      </div>

      <CardContent className="p-0">
        <CommonDataTable
          table={table}
          columns={tableColumns}
          data={displayTeachers}
        />
      </CardContent>
    </Card>
  );
}
