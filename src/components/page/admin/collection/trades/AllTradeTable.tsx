"use client";

import { DataTable } from "@/components/common/data-table";
import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { TradeModelGet } from "@/lib/types/tradeModel";
import { SectorModelGet } from "@/types/sectorModel";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { FaCloudArrowDown } from "react-icons/fa6";
import DeleteTradeDialog from "./deleteTradeDialog";
import UpdateTradeDialog from "./updateTradeDialog";

interface props {
  sectors: SectorModelGet[];
  trades: TradeModelGet[];
  collectionName: string;
}

const AllTradeTable = ({ sectors, trades }: props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [SelectedSector, setSelectedSector] = useState<TradeModelGet[]>([]);

  const columns: ColumnDef<TradeModelGet>[] = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              setSelectedSector(
                value
                  ? table.getFilteredRowModel().rows.map((row) => row.original)
                  : [],
              );
            }}
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setSelectedSector((prev) =>
              value
                ? [...prev, row.original]
                : prev.filter((sector) => sector.id !== row.original.id),
            );
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "symbol",
      header: "Symbol",
      cell: ({}) => {
        return <MyImage src="/icons/video-conference.png" className="size-8" />;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        // const sector = row.original;
        return <span className="line-clamp-1"> {row.getValue("name")}</span>;
      },
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => <span>{row.getValue("username")}</span>,
    },
    {
      accessorKey: "sector",
      header: "Sector",
      cell: ({ row }) => (
        <span className="text-lowercase">{row.getValue("sector")}</span>
      ),
    },
    {
      accessorKey: "class_rooms",
      header: "Levels",
      cell: ({ row }) => (
        <span className="text-lowercase">{row.getValue("class_rooms")}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span>{row.getValue("description") || "N/A"}</span>,
    },
    {
      accessorKey: "create_on",
      header: "Created On",
      cell: ({ row }) => (
        <span>{new Date(row.getValue("create_on")).toLocaleDateString()}</span>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const trade = row.original;
        return (
          <div className="flex gap-2">
            <UpdateTradeDialog trade={trade} sectors={sectors} />
            <DeleteTradeDialog trade={trade} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="happy-card container overflow-x-auto p-0">
      <div className="flex justify-between p-4">
        <h1 className="happy-title-base">Trade Table ({sectors.length})</h1>
        <div className="space-x-2">
          <Button variant="success" size="sm">
            <FaCloudArrowDown /> Export
          </Button>
        </div>
      </div>
      <Separator />
      <div className="p-4 pt-0">
        <DataTable
          columns={columns}
          data={trades}
          searchKeys={["username", "name", "sector", "class_rooms"]}
        />
      </div>
    </div>
  );
};

export default AllTradeTable;
