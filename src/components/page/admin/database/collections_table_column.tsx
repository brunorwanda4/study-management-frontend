"use client";

import { CollectionsList } from "@/components/page/admin/database/collections_lists";
import { Progress } from "@/components/ui/progress";
import { formatBytes, parseBytes } from "@/lib/helpers/format-bytes";
import { CollectionStats, DatabaseStats } from "@/lib/types/databaseStatus";
import { ColumnDef } from "@tanstack/react-table";

export const getCollectionsTableColumns = (
  database: DatabaseStats,
): ColumnDef<CollectionStats>[] => {
  return [
    {
      header: "Collection",
      meta: { filterVariant: "text" },
      accessorKey: "name",
      cell: ({ row }) => <CollectionsList collection={row.original.name} />,
    },

    {
      header: "Documents",
      accessorKey: "document_count",
      meta: { filterVariant: "number" },
      cell: ({ row }) => row.original.document_count.toLocaleString(),
    },

    {
      header: "Size",
      accessorKey: "size_bytes",
      meta: { filterVariant: "bytes" },
      cell: ({ row }) => row.original.size_bytes,
    },

    {
      header: "% Docs",
      id: "percent_docs",
      cell: ({ row }) => {
        const percent =
          (row.original.document_count / database.total_documents) * 100;
        return (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">{percent.toFixed(2)}%</span>
            <Progress value={percent} className="h-2" />
          </div>
        );
      },
    },

    {
      header: "% Size",
      id: "percent_size",
      cell: ({ row }) => {
        const collectionSize = parseBytes(row.original.size_bytes);
        const totalSize = parseBytes(database.total_size_bytes);

        const percent = (collectionSize / totalSize) * 100;

        return (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">
              {percent.toFixed(2)}% ({formatBytes(collectionSize)})
            </span>
            <Progress value={percent} className="h-2" />
          </div>
        );
      },
    },
  ];
};
