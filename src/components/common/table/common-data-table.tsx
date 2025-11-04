"use client";
import LoadingPage from "@/components/common/pages/loading-page";
import NoItemsPage from "@/components/common/pages/no-items-page";
import { Button } from "@/components/ui/button";
import { SIDEBAR_WIDTH, useSidebar } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  type Table as TanStackTable,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

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
  loading?: boolean;
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
  loading = false,
}: DataTableProps<TData, TValue>) {
  const { open } = useSidebar();
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
      <div
        className={cn(
          "w-full overflow-x-auto rounded-md border transition-all duration-300",
          open ? "max-w-full" : "max-w-full", // can keep default
        )}
        style={{
          maxWidth: open ? `calc(100% - ${SIDEBAR_WIDTH}px)` : "100%",
        }}
      >
        <Table className="table-auto border-collapse">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="relative h-10 border-t select-none"
                      aria-sort={
                        header.column.getIsSorted() === "asc"
                          ? "ascending"
                          : header.column.getIsSorted() === "desc"
                            ? "descending"
                            : "none"
                      }
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex h-full cursor-pointer items-center justify-between gap-2 select-none",
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: (
                              <ChevronUpIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? (
                            <span className="size-4" aria-hidden="true" />
                          )}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground h-24 text-center text-sm"
                >
                  <LoadingPage />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={rowClassName ? rowClassName(row) : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
        </Table>
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
            // disabled={
            //   serverMode ? data.length < pageSize : !table.getCanNextPage()
            // }
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
