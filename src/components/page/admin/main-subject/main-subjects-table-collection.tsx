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
import apiRequest from "@/service/api-client";
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
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BsPlus } from "react-icons/bs";

interface Props {
  auth: AuthUserResult;
  realtimeEnabled?: boolean;
  currentSubjects: MainSubject[];
  serverMode?: boolean;
}

const MainSubjectsTableCollection = ({
  auth,
  realtimeEnabled = false,
  currentSubjects,
  serverMode = false,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = auth.token;

  // ✅ initialize realtime data ONLY if not serverMode
  const { data: realtimeSubjects, isConnected } = useRealtimeData<MainSubject>(
    "main_subject",
    !serverMode, // disable subscription when serverMode true
  );

  const initialPage = parseInt(searchParams.get("page") ?? "1", 10) - 1;
  const [pageIndex, setPageIndex] = useState(initialPage);
  const [pageSize] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "updated_at", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [data, setData] = useState<MainSubject[]>(currentSubjects);
  const [loading, setLoading] = useState(false);

  // ✅ client mode → realtime updates
  useEffect(() => {
    if (!serverMode && realtimeSubjects?.length) {
      setData(realtimeSubjects);
    }
  }, [realtimeSubjects, serverMode]);

  // ✅ server mode → fetch new data each page
  useEffect(() => {
    if (!serverMode) return;

    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const query = `?limit=${pageSize}&skip=${pageIndex * pageSize}`;
        const request = await apiRequest<void, MainSubject[]>(
          "get",
          `/main-subjects${query}`,
          undefined,
          { token },
        );

        if (request.statusCode === 200 && request.data) {
          setData(request.data);
        }
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [pageIndex, pageSize, token, serverMode]);

  const columns = useMemo(
    () => getMainSubjectsTableColumns() as ColumnDef<MainSubject, unknown>[],
    [],
  );

  const table = useReactTable<MainSubject>({
    data,
    columns,
    state: { sorting, columnFilters, pagination: { pageIndex, pageSize } },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: (updater) => {
      const nextPage =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize }).pageIndex
          : updater.pageIndex;

      if (nextPage !== pageIndex) {
        setPageIndex(nextPage);
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", (nextPage + 1).toString());
        router.replace(`?${params.toString()}`, { scroll: false });
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination: serverMode, // ✅ ensures react-table won't paginate locally
  });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-2">
          <CardTitle className="flex items-center gap-4">
            <span>Main Subjects</span>
            {realtimeEnabled && !serverMode && (
              <RealtimeEnabled isConnected={isConnected} />
            )}
          </CardTitle>
          <CardDescription>All registered academic subjects</CardDescription>
        </div>

        <Link
          href="/a/collections/main_subjects/create"
          className={cn(buttonVariants({ library: "daisy", variant: "info" }))}
        >
          <BsPlus /> Add new main subject
        </Link>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {["name", "code", "category", "level"].map((col) => (
            <div key={col} className="w-36">
              <TableFilter column={table.getColumn(col)!} />
            </div>
          ))}
        </div>

        {/* Data Table */}
        <CommonDataTable
          table={table}
          columns={columns}
          data={data}
          serverMode={serverMode}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
};

export default MainSubjectsTableCollection;
