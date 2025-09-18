"use client";

import { DataTable } from "@/components/common/data-table";
import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { EducationModelGet } from "@/lib/types/educationModel";
import { SectorModelGet } from "@/types/sectorModel";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { FaCloudArrowDown } from "react-icons/fa6";
import DeleteSectorDialog from "./deleteSectorDialog";
import UpdateSectorDialog from "./updateSectorDialog";

interface props {
  sectors: SectorModelGet[];
  educations: EducationModelGet[];
  collectionName: string;
}

const AllSectorTable = ({ sectors, educations }: props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [SelectedSector, setSelectedSector] = useState<SectorModelGet[]>([]);

  const columns: ColumnDef<SectorModelGet>[] = [
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
      cell: ({ row }) => {
        const sector = row.original;
        return (
          <MyImage
            src={sector.symbol ? sector.symbol : "/icons/notebook.png"}
            className="size-8"
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        // const sector = row.original;
        return <span> {row.getValue("name")}</span>;
      },
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => <span>{row.getValue("username")}</span>,
    },
    {
      accessorKey: "education",
      header: "Education",
      cell: ({ row }) => (
        <span className="text-lowercase">{row.getValue("education")}</span>
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
      header: "Actions",
      cell: ({ row }) => {
        const sector = row.original;
        return (
          <div className="flex gap-2">
            <UpdateSectorDialog sector={sector} education={educations} />
            <DeleteSectorDialog sector={sector} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="happy-card container overflow-x-auto p-0">
      <div className="flex justify-between p-4">
        <h1 className="happy-title-base">Sector Table ({sectors.length})</h1>
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
          data={sectors}
          searchKeys={["username", "name", "education"]}
        />
      </div>
    </div>
  );
};

export default AllSectorTable;
