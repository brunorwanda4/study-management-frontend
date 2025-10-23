/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CommonDataTable } from "@/components/common/table/common-data-table";
import TableFilter from "@/components/common/table/table-filter";
import { JoinSchoolRequestColumns } from "@/components/page/school-staff/table/school-join-request-table/join-school-request-columns-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Locale } from "@/i18n"; // Assuming you use this for i18n
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { Class } from "@/lib/schema/class/class-schema";
import { JoinSchoolRequestWithRelations } from "@/lib/schema/school/school-join-school/join-school-request-schema";
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
import SendJoinSchoolRequest from "../../dialog/send-join-school-request-dialog";

// --- Prisma Schema related types ---

interface SchoolJoinRequestsTableProps {
  requests: JoinSchoolRequestWithRelations[];
  lang: Locale;
  // Add handlers for actions
  onApproveRequest?: (id: string) => void;
  onRejectRequest?: (id: string) => void;
  isLoading?: boolean;
  auth: AuthContext;
  classes: Class[];
  realtimeEnabled?: boolean;
}

// --- React Component ---
export default function SchoolJoinRequestsTable({
  requests,
  lang,
  onApproveRequest,
  onRejectRequest,
  classes,
  auth,
  realtimeEnabled = false,
}: SchoolJoinRequestsTableProps) {
  const { data: initialRequests, isConnected } =
    useRealtimeData<JoinSchoolRequestWithRelations>("join_school_request");
  const [displayRequests, setDisplayRequests] =
    useState<JoinSchoolRequestWithRelations[]>(requests);

  useEffect(() => {
    if (realtimeEnabled && initialRequests) {
      setDisplayRequests(initialRequests as JoinSchoolRequestWithRelations[]);
    } else if (!realtimeEnabled) {
      setDisplayRequests(initialRequests);
    }
  }, [initialRequests, realtimeEnabled, initialRequests]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "updated_at", // Default sort by request date
      desc: true, // Show newest first
    },
  ]);
  const [rowSelection, setRowSelection] = useState({});

  // Memoize columns to prevent re-creation on every render unless handlers change
  const tableColumns = useMemo(
    () => JoinSchoolRequestColumns(lang, auth),
    [lang, onApproveRequest, onRejectRequest],
  );

  const table = useReactTable({
    data: displayRequests,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    // Add meta for passing handlers or other info if needed via context
    // meta: {
    //   approveRequest: onApproveRequest,
    //   rejectRequest: onRejectRequest,
    // },
  });

  return (
    <Card>
      <CardHeader className="flex w-full justify-between">
        <div>
          <CardTitle>School Join Requests</CardTitle>
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <div className="mt-2 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => console.log("Bulk Approve", rowSelection)}
              >
                Approve Selected (
                {table.getFilteredSelectedRowModel().rows.length})
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => console.log("Bulk Reject", rowSelection)}
              >
                Reject Selected (
                {table.getFilteredSelectedRowModel().rows.length})
              </Button>
            </div>
          )}
        </div>
        <SendJoinSchoolRequest classes={classes} lang={lang} auth={auth} />
      </CardHeader>

      <div className="flex flex-wrap gap-3 border-b px-4 pb-4">
        <div className="w-48">
          <TableFilter column={table.getColumn("name")!} />
        </div>
        <div className="w-36">
          <TableFilter column={table.getColumn("role")!} />
        </div>
        <div className="w-40">
          <TableFilter column={table.getColumn("fromUser")!} />
        </div>
        <div className="w-36">
          <TableFilter column={table.getColumn("status")!} />
        </div>
      </div>

      <CardContent className="p-0">
        <CommonDataTable
          table={table}
          columns={tableColumns}
          data={displayRequests}
        />
      </CardContent>
    </Card>
  );
}
