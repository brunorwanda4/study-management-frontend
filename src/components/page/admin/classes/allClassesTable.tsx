"use client";

import { DataTable } from "@/components/common/data-table";
import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ClassModelGet } from "@/lib/types/classModel";
import { ClassTypeModelGet } from "@/lib/types/classTypeModel";
import { EducationModelGet } from "@/lib/types/educationModel";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FaCloudArrowDown } from "react-icons/fa6";
import DeleteClassDialog from "./deleteClassDialog";

interface props {
  classes: ClassModelGet[];
  educations: EducationModelGet[];
  classTypes: ClassTypeModelGet[];
  collectionName: string;
}

const AllClassesTable = ({ classes, collectionName }: props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [SelectedSector, setSelectedSector] = useState<ClassModelGet[]>([]);

  const columns: ColumnDef<ClassModelGet>[] = [
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
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const classModel = row.original;
        return (
          <Link href={`/collection/${collectionName}/${classModel.id}`}>
            <MyImage src="/icons/teacher.png" className="size-8" />
          </Link>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const classModel = row.original;
        return (
          <Link
            href={`/collection/${collectionName}/${classModel.id}`}
            className="line-clamp-1"
          >
            {row.getValue("name") || <span className="text-myGray">N/A</span>}
          </Link>
        );
      },
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => (
        <div>
          {row.getValue("username") || <span className="text-myGray">N/A</span>}
        </div>
      ),
    },
    {
      accessorKey: "class_type",
      header: "Type",
      cell: ({ row }) => (
        <div className="text-lowercase">
          {row.getValue("class_type") || (
            <span className="text-myGray">N/A</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => (
        <div className="text-lowercase">
          {row.getValue("code") || <span className="text-myGray">N/A</span>}
        </div>
      ),
    },
    {
      accessorKey: "class_room",
      header: "Class room",
      cell: ({ row }) => (
        <div>
          {row.getValue("class_room") || (
            <span className="text-myGray">N/A</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "class_teacher",
      header: "Teacher",
      cell: ({ row }) => (
        <div>
          {row.getValue("class_teacher") || (
            <span className="text-myGray">N/A</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "created_on",
      header: "Created On",
      cell: ({ row }) => (
        <div>
          {new Date(row.getValue("created_on")).toLocaleDateString() || (
            <span className="text-myGray">N/A</span>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const classModel = row.original;
        return (
          <div className="flex gap-2">
            <Link
              className="btn btn-xs btn-warning"
              href={`/collection/${collectionName}/update/${classModel.id}`}
            >
              Update
            </Link>
            <DeleteClassDialog classModel={classModel} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="happy-card container overflow-x-auto p-0">
      <div className="flex justify-between p-4">
        <h1 className="happy-title-base">Classes Table ({classes.length})</h1>
        <div className="space-x-2">
          <Link
            className="btn btn-sm btn-info"
            href={`/collection/${collectionName}/add`}
          >
            <BsPlus /> Create new class
          </Link>
          <Button library="daisy" variant="success" size="sm">
            <FaCloudArrowDown /> Export
          </Button>
        </div>
      </div>
      <Separator />
      <div className="p-4 pt-0">
        <DataTable
          columns={columns}
          data={classes}
          searchKeys={[
            "username",
            "name",
            "class_room",
            "class_teacher",
            "code",
          ]}
        />
      </div>
    </div>
  );
};

export default AllClassesTable;
