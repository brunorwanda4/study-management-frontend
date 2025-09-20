"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Table as TanStackTable,
  useReactTable,
} from "@tanstack/react-table";

import {
  TableBody,
  TableCell,
  Table as TableComponent,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  table?: TanStackTable<TData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowClassName?: (row: any) => string;
}
export function CommonDataTable<TData, TValue>({
  columns,
  data,
  table: externalTable,
  rowClassName,
}: DataTableProps<TData, TValue>) {
  // Always call the hook
  const internalTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Choose which one to use
  const table = externalTable ?? internalTable;

  return (
    <div className="overflow-hidden rounded-md border">
      <TableComponent>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
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
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={rowClassName ? rowClassName(row) : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableComponent>
    </div>
  );
}
