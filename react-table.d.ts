import "@tanstack/react-table";

type FilterVariant =
  | "text"
  | "range"
  | "select"
  | "dateRange"
  | "number"
  | "multiSelect"
  | "boolean"
  | "bytes";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    filterVariant?: FilterVariant;
  }
}
