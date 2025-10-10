"use client";

import RealtimeEnabled from "@/components/common/realtime-enabled";
import { CommonDataTable } from "@/components/common/table/common-data-table";
import TableFilter from "@/components/common/table/table-filter";
import { getMainSubjectsTableColumns } from "@/components/page/admin/main-subject/getMainSubjectsTableColumns";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { cn } from "@/lib/utils";
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
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";

interface Props {
  auth: AuthUserResult;
  realtimeEnabled?: boolean;
}

const MainSubjectsTableCollection = ({
  auth,
  realtimeEnabled = false,
}: Props) => {
  const { data: mainSubjects, isConnected } =
    useRealtimeData<MainSubject>("main_subject");

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = getMainSubjectsTableColumns();

  const table = useReactTable<MainSubject>({
    data: mainSubjects || [],
    columns: columns as ColumnDef<MainSubject, unknown>[],
    onColumnFiltersChange: setColumnFilters,
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
          <CardTitle className="flex items-center gap-4">
            <span> Main Subjects</span>
            {realtimeEnabled && <RealtimeEnabled isConnected={isConnected} />}
          </CardTitle>
          <CardDescription>
            All registered academic subjects
            {realtimeEnabled && (
              <div className="mt-1 flex items-center gap-2"></div>
            )}
          </CardDescription>
        </div>
        <Link
          href={`/a/database/main_subjects/create`}
          className={cn(buttonVariants({ library: "daisy", variant: "info" }))}
        >
          <BsPlus /> Add new main subject
        </Link>
        {/* <CreateMainSubjectDialog auth={auth} /> */}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="w-44">
            <TableFilter column={table.getColumn("name")!} />
          </div>
          <div className="w-36">
            <TableFilter column={table.getColumn("code")!} />
          </div>
          <div className="w-36">
            <TableFilter column={table.getColumn("category")!} />
          </div>
          <div className="w-36">
            <TableFilter column={table.getColumn("level")!} />
          </div>
          <div className="w-36">
            <TableFilter column={table.getColumn("is_active")!} />
          </div>
        </div>

        {/* Data table */}
        <CommonDataTable
          table={table}
          columns={columns}
          data={mainSubjects || []}
        />
      </CardContent>
    </Card>
  );
};

export default MainSubjectsTableCollection;
