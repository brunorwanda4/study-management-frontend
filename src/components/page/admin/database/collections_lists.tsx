"use client";

import { formatText } from "@/lib/helpers/format-text";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  collection: string;
  className?: string;
}

export function CollectionsList({ collection, className }: Props) {
  const availablePages = ["users", "sectors", "trades", "main_classes"];
  const hasPage = availablePages.includes(collection);

  if (hasPage)
    return (
      <Link
        className={cn("link-hover font-medium", className)}
        href={`/en/a/database/${collection}`}
      >
        {formatText(collection)}
      </Link>
    );
  return (
    <span
      aria-disabled
      className={cn("cursor-not-allowed font-medium opacity-50", className)}
    >
      {formatText(collection)}
    </span>
  );
}
