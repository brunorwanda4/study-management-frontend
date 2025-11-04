"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Column } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";
import { useId, useMemo } from "react";

type FilterVariant =
  | "text"
  | "range"
  | "select"
  | "dateRange"
  | "number"
  | "multiSelect"
  | "boolean"
  | "bytes";

export default function TableFilter({
  column,
}: {
  column: Column<any, unknown>;
}) {
  const id = useId();
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const columnHeader =
    typeof column.columnDef.header === "string" ? column.columnDef.header : "";

  // Get all unique faceted values for select/multiSelect
  const sortedUniqueValues = useMemo(() => {
    if (
      filterVariant === "range" ||
      filterVariant === "number" ||
      filterVariant === "dateRange"
    )
      return [];

    const values = Array.from(column.getFacetedUniqueValues().keys());

    const flattened = values.reduce((acc: string[], curr) => {
      if (Array.isArray(curr)) return [...acc, ...curr];
      return [...acc, String(curr)];
    }, []);

    return Array.from(new Set(flattened)).sort() as string[];
  }, [column, filterVariant]);

  // 🟢 Range filter (number)
  if (filterVariant === "range") {
    return (
      <div className="*:not-first:mt-2">
        <Label>{columnHeader}</Label>
        <div className="flex gap-2">
          <Input
            id={`${id}-min`}
            className="flex-1 rounded-e-none w-24"
            value={(columnFilterValue as [number, number])?.[0] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                e.target.value ? Number(e.target.value) : undefined,
                old?.[1],
              ])
            }
            placeholder="Min"
            type="number"
          />
          <Input
            id={`${id}-max`}
            className="-ms-px flex-1 rounded-s-none w-24"
            value={(columnFilterValue as [number, number])?.[1] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                e.target.value ? Number(e.target.value) : undefined,
              ])
            }
            placeholder="Max"
            type="number"
          />
        </div>
      </div>
    );
  }

  // 🟢 Date range filter
  if (filterVariant === "dateRange") {
    return (
      <div className="*:not-first:mt-2">
        <Label>{columnHeader}</Label>
        <div className="flex">
          <Input
            id={`${id}-from`}
            type="date"
            className="flex-1 rounded-e-none"
            value={(columnFilterValue as [string, string])?.[0] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [string, string]) => [
                e.target.value || undefined,
                old?.[1],
              ])
            }
          />
          <Input
            id={`${id}-to`}
            type="date"
            className="-ms-px flex-1 rounded-s-none"
            value={(columnFilterValue as [string, string])?.[1] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [string, string]) => [
                old?.[0],
                e.target.value || undefined,
              ])
            }
          />
        </div>
      </div>
    );
  }

  // 🟢 Number filter
  if (filterVariant === "number") {
    return (
      <div className="*:not-first:mt-2">
        <Label htmlFor={`${id}-number`}>{columnHeader}</Label>
        <Input
          id={`${id}-number`}
          type="number"
          value={
            typeof columnFilterValue === "number" ||
            typeof columnFilterValue === "string"
              ? columnFilterValue
              : ""
          }
          onChange={(e) =>
            column.setFilterValue(
              e.target.value ? Number(e.target.value) : undefined,
            )
          }
          placeholder={`Filter ${columnHeader}`}
        />
      </div>
    );
  }

  // 🟢 Boolean filter
  if (filterVariant === "boolean") {
    return (
      <div className="*:not-first:mt-2">
        <Label htmlFor={`${id}-boolean`}>{columnHeader}</Label>
        <Select
          value={columnFilterValue?.toString() ?? "all"}
          onValueChange={(val) =>
            column.setFilterValue(val === "all" ? undefined : val === "true")
          }
        >
          <SelectTrigger id={`${id}-boolean`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }

  // 🟢 Select filter
  if (filterVariant === "select") {
    return (
      <div className="*:not-first:mt-2">
        <Label htmlFor={`${id}-select`}>{columnHeader}</Label>
        <Select
          value={columnFilterValue?.toString() ?? "all"}
          onValueChange={(value) =>
            column.setFilterValue(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger id={`${id}-select`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {sortedUniqueValues.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  // 🟢 MultiSelect filter
  if (filterVariant === "multiSelect") {
    const selected = (columnFilterValue as string[]) ?? [];
    return (
      <div className="*:not-first:mt-2">
        <Label>{columnHeader}</Label>
        <Select
          onValueChange={(val) => {
            const newValue = selected.includes(val)
              ? selected.filter((v) => v !== val)
              : [...selected, val];
            column.setFilterValue(newValue);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={`Select ${columnHeader}`} />
          </SelectTrigger>
          <SelectContent>
            {sortedUniqueValues.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selected.length > 0 && (
          <div className="text-sm text-muted-foreground mt-1">
            Selected: {selected.join(", ")}
          </div>
        )}
      </div>
    );
  }

  // 🟢 Bytes filter (e.g., 10 MB)
  if (filterVariant === "bytes") {
    return (
      <div className="*:not-first:mt-2">
        <Label htmlFor={`${id}-bytes`}>{columnHeader}</Label>
        <Input
          id={`${id}-bytes`}
          type="number"
          placeholder="Size in bytes"
          value={(columnFilterValue as number) ?? ""}
          onChange={(e) =>
            column.setFilterValue(
              e.target.value ? Number(e.target.value) : undefined,
            )
          }
        />
      </div>
    );
  }

  // 🟢 Default text filter
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={`${id}-input`}>{columnHeader}</Label>
      <div className="relative">
        <Input
          id={`${id}-input`}
          className="peer ps-9"
          value={(columnFilterValue ?? "") as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder={`Search ${columnHeader.toLowerCase()}`}
          type="text"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
      </div>
    </div>
  );
}
