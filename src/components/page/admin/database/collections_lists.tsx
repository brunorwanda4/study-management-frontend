"use client";

import { mainCollections } from "@/lib/const/main-collections";
import { formatText } from "@/lib/helpers/format-text";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  collection: string;
  className?: string;
}

export function CollectionsList({ collection, className }: Props) {
  const matchedCollection = mainCollections.find(
    (col) => col.name === collection,
  );

  if (matchedCollection)
    return (
      <Link
        className={cn("link-hover font-medium", className)}
        href={matchedCollection.href}
      >
        {matchedCollection.label || formatText(collection)}
      </Link>
    );

  // If not found — disabled label
  return (
    <span
      aria-disabled
      className={cn("cursor-not-allowed font-medium opacity-50", className)}
    >
      {formatText(collection)}
    </span>
  );
}
