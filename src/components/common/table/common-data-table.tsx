"use client";
import NoItemsPage from "@/components/common/pages/no-items-page";
import { Button } from "@/components/ui/button";
import {
  TableBody,
  TableCell,
  Table as TableComponent,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  Table as TanStackTable,
  useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  table?: TanStackTable<TData>;
  rowClassName?: (row: any) => string;
  serverMode?: boolean;
  pageIndex?: number;
  setPageIndex?: (i: number) => void;
  pageSize?: number;
  noFooter?: boolean;
}

export function CommonDataTable<TData, TValue>({
  columns,
  data,
  table: externalTable,
  rowClassName,
  serverMode,
  pageIndex,
  setPageIndex,
  noFooter = false,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const internalTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });
  const table = externalTable ?? internalTable;

  return (
    <div className="w-full space-y-4">
      <div className="w-full max-w-full overflow-x-auto rounded-md border">
        <TableComponent className="table-auto border-collapse">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-2 text-sm font-medium whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getPaginationRowModel().rows.length ? (
              table.getPaginationRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={rowClassName ? rowClassName(row) : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-2 text-sm whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground h-24 text-center text-sm"
                >
                  <NoItemsPage title="It look no items founds! 😥" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableComponent>
      </div>

      {!noFooter && (
        <div className="flex items-center justify-start gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            // onClick={() => {
            //   if (serverMode && setPageIndex) {
            //     setPageIndex(Math.max((pageIndex ?? 0) - 1, 0));
            //   } else {
            //     table.previousPage();
            //   }
            // }}
            disabled={
              serverMode ? (pageIndex ?? 0) === 0 : !table.getCanPreviousPage()
            }
          >
            Previous
          </Button>

          <span className="text-sm">
            {/* Page {table.getState().pagination.pageIndex + 1} */}
            Page{" "}
            {serverMode
              ? (pageIndex ?? 0) + 1
              : table.getState().pagination.pageIndex + 1}{" "}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            // disabled={!table.getCanNextPage()}
            // onClick={() => {
            //   if (serverMode && setPageIndex) {
            //     setPageIndex((pageIndex ?? 0) + 1);
            //   } else {
            //     table.nextPage();
            //   }
            // }}
            disabled={
              serverMode ? data.length < pageSize : !table.getCanNextPage()
            }
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
