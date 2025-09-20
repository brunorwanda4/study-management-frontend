"use client";
import { CommonDataTable } from "@/components/common/table/common-data-table";
import TableFilter from "@/components/common/table/table-filter";
import CreateNewUserDialog from "@/components/page/admin/users/createNewUserDialog";
import { getUsersTableCollectionColumns } from "@/components/page/admin/users/users_table_collection_columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserModel } from "@/lib/types/userModel";
import { AuthUserResult } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  users: UserModel[];
  auth: AuthUserResult;
  serverMode?: boolean; // flag: true = server fetching, false = SSR
}

const UsersTableCollection = ({
  users: initialUsers,
  auth,
  serverMode = true,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = auth.token;
  // ✅ restore page index from URL
  const initialPage = parseInt(searchParams.get("page") ?? "1", 10) - 1;
  const [data, setData] = useState<UserModel[]>(initialUsers);

  const [pageIndex, setPageIndex] = useState(initialPage);
  const [pageSize] = useState(10);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  const columns = getUsersTableCollectionColumns();

  const table = useReactTable<UserModel>({
    data,
    columns: columns as ColumnDef<UserModel, unknown>[],
    state: { sorting, columnFilters, pagination: { pageIndex, pageSize } },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const nextIndex =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize }).pageIndex
          : updater.pageIndex;
      setPageIndex(nextIndex);

      // ✅ update URL param
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", (nextIndex + 1).toString());
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true, // ✅ controlled
    pageCount: -1, // unknown total, infinite scroll style
  });

  // ✅ Fetch users on page change
  useEffect(() => {
    if (!serverMode) return;

    const fetchUsers = async () => {
      const query = `?limit=${pageSize}&skip=${pageIndex * pageSize}`;
      const request = await apiRequest<void, UserModel[]>(
        "get",
        `/users${query}`,
        undefined,
        token,
      );

      if (request.statusCode === 200 && request.data) {
        setData(request.data);
      }
    };

    fetchUsers();
  }, [pageIndex, pageSize, token]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Users</CardTitle>
          <CreateNewUserDialog auth={auth} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <div className="w-44">
            <TableFilter column={table.getColumn("name")!} />
          </div>
          <div className="w-36">
            <TableFilter column={table.getColumn("username")!} />
          </div>
          <div className="w-36">
            <TableFilter column={table.getColumn("email")!} />
          </div>
          <div className="w-36">
            <TableFilter column={table.getColumn("role")!} />
          </div>
          <div className="w-36">
            <TableFilter column={table.getColumn("phone")!} />
          </div>
          <div className="">
            <TableFilter column={table.getColumn("created_at")!} />
          </div>
        </div>

        {/* ✅ pass table + data */}
        <CommonDataTable
          table={table}
          columns={columns}
          data={serverMode ? data : initialUsers}
          serverMode={serverMode}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
        />
      </CardContent>
    </Card>
  );
};

export default UsersTableCollection;
