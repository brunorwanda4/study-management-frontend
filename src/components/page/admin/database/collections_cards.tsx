"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  formatCollectionName,
  formatCollectionNameLink,
} from "@/lib/functions/names_fn";
import { DbProps } from "@/lib/types/databaseStatus";

import Link from "next/link";
import { useState } from "react";
import { BsCollection, BsThreeDots } from "react-icons/bs";

const CollectionsCharts = ({ data, error }: DbProps) => {
  const [selectedType, setSelectedType] = useState("All Collection");

  if (error) {
    return (
      <div className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error.message}</span>
        {error.details && (
          <span className="mt-1 block text-sm">{error.details}</span>
        )}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 text-blue-500" />
        <p className="ml-3 text-gray-500">Loading database status...</p>
      </div>
    );
  }

  const collectionTypes = ["All Collection", "Public", "Private", "Role"];

  const filterCollections = () => {
    switch (selectedType) {
      case "Private":
        return data.collections.filter((collection) =>
          collection.name.startsWith("--"),
        );
      case "Role":
        return data.collections.filter((collection) =>
          collection.name.endsWith(".role"),
        );
      case "Public":
        return data.collections.filter(
          (collection) =>
            !collection.name.startsWith("--") &&
            !collection.name.endsWith(".role"),
        );
      default:
        return data.collections;
    }
  };

  const ChooseTypeOfCollection = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger type="button" className="btn btn-xs btn-ghost">
          <BsThreeDots size={22} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-base-300 w-52 p-0">
          <span className="flex w-full justify-center py-2 text-center">
            Collections Type
          </span>
          <Separator />
          <div className="happy-line gap-1 p-2">
            {collectionTypes.map((item) => (
              <button
                key={item}
                className={`btn btn-sm btn-ghost justify-start capitalize ${
                  selectedType === item ? "btn-active" : ""
                }`}
                onClick={() => setSelectedType(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const displayedCollections = filterCollections();

  return (
    <div className="happy-card border-base-200 w-1/2 border-2 p-0">
      <div className="m-3 flex justify-between">
        <h2 className="flex gap-2 text-xl font-semibold">
          <BsCollection size={24} /> Collection Distribution
        </h2>
        <ChooseTypeOfCollection />
      </div>
      <Separator />
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {displayedCollections.map((collection, index) => (
            <Link
              href={`/collection/${formatCollectionNameLink(collection.name)}`}
              key={index}
              className="bg-base-100/50 btn btn-ghost flex h-28 items-center justify-between rounded-lg p-0 shadow-sm"
            >
              <div className="p-4">
                <h3 className="text-start text-lg font-bold">
                  {formatCollectionName(collection.name)}
                </h3>
                <div className="text-sm">
                  <div className="flex gap-2">
                    <strong>Documents:</strong>
                    <span className="font-medium">
                      {collection.document_count.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <strong>Size:</strong>
                    <span className="font-medium">
                      {collection.size_bytes.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="btn btn-xs h-full w-1 rounded-l-none"
                style={{
                  backgroundColor: `hsl(${
                    (index * 360) / displayedCollections.length
                  }, 70%, 60%)`,
                }}
              ></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsCharts;
