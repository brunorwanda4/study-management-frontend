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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo } from "react";

type FilterVariant =
  | "text"
  | "range"
  | "number"
  | "select"
  | "multiSelect"
  | "boolean"
  | "dateRange";

export default function TableFilter({
  column,
}: {
  column: Column<any, unknown>;
}) {
  const id = useId();
  const columnHeader =
    typeof column.columnDef.header === "string" ? column.columnDef.header : "";

  const key = column.id;
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterVariant = column.columnDef.meta?.filterVariant as
    | FilterVariant
    | undefined;

  const columnFilterValue = column.getFilterValue();

  // Restore from query params
  useEffect(() => {
    const value = searchParams.get(key);
    if (value !== null) {
      switch (filterVariant) {
        case "range":
        case "dateRange": {
          const [min, max] = value.split(",");
          column.setFilterValue([min || undefined, max || undefined]);
          break;
        }
        case "multiSelect":
          column.setFilterValue(value.split(","));
          break;
        case "number":
          column.setFilterValue(Number(value));
          break;
        case "boolean":
          column.setFilterValue(value === "true");
          break;
        default:
          column.setFilterValue(value);
      }
    }
  }, [searchParams, key, column, filterVariant]);

  // Update URL on filter change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (
      columnFilterValue === undefined ||
      columnFilterValue === "" ||
      (Array.isArray(columnFilterValue) && columnFilterValue.every((v) => !v))
    ) {
      params.delete(key);
    } else {
      let value = "";
      switch (filterVariant) {
        case "range":
        case "dateRange":
          value = (
            columnFilterValue as [string | number, string | number]
          ).join(",");
          break;
        case "multiSelect":
          value = (columnFilterValue as string[]).join(",");
          break;
        default:
          value = String(columnFilterValue);
      }
      params.set(key, value);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [columnFilterValue, filterVariant, key, router, searchParams]);

  const facetedValues = column.getFacetedUniqueValues();

  const sortedUniqueValues = useMemo(() => {
    if (["range", "number", "dateRange"].includes(filterVariant ?? ""))
      return [];

    const values = Array.from(facetedValues.keys());
    const flattenedValues = values.reduce((acc: string[], curr) => {
      if (Array.isArray(curr)) return [...acc, ...curr];
      return [...acc, String(curr)];
    }, []);

    return Array.from(new Set(flattenedValues)).sort();
  }, [facetedValues, filterVariant]);

  // --- Filter Renderers ---

  // Select Input
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
            <SelectValue placeholder={`Select ${columnHeader.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {sortedUniqueValues.map((v) => {
              const val = String(v);
              return (
                <SelectItem key={val} value={val} className="capitalize">
                  {val.toLocaleLowerCase()}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    );
  }

  // Range (numbers)
  if (filterVariant === "range") {
    return (
      <div className="*:not-first:mt-2">
        <Label>{columnHeader}</Label>
        <div className="flex gap-1">
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

  // Date Range
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

  // Number (single input)
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

  // Boolean filter
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
            <SelectValue placeholder={`Select ${columnHeader}`} />
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

  // MultiSelect
  if (filterVariant === "multiSelect") {
    return (
      <div className="*:not-first:mt-2">
        <Label>{columnHeader}</Label>
        <Select
          onValueChange={(val) => {
            const old = (columnFilterValue as string[]) ?? [];
            column.setFilterValue(
              old.includes(val) ? old.filter((v) => v !== val) : [...old, val],
            );
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={`Select ${columnHeader}`} />
          </SelectTrigger>
          <SelectContent>
            {sortedUniqueValues.map((v) => {
              const val = String(v);
              return (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {Array.isArray(columnFilterValue) && columnFilterValue.length > 0 && (
          <div className="text-muted-foreground mt-1 text-sm">
            Selected: {columnFilterValue.join(", ")}
          </div>
        )}
      </div>
    );
  }

  // Default: Text
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
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <SearchIcon size={16} />
        </div>
      </div>
    </div>
  );
}
