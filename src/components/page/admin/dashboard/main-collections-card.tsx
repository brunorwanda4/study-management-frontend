"use client";

import MyImage from "@/components/common/myImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemContent, ItemHeader } from "@/components/ui/item";
import { mainCollections } from "@/lib/const/main-collections";
import { CollectionStats } from "@/lib/types/databaseStatus";
import Link from "next/link";

interface MainCollectionsCardProps {
  collections: CollectionStats[];
}

const MainCollectionsCard = ({ collections }: MainCollectionsCardProps) => {
  const mainOnly = mainCollections.filter((main) =>
    collections.some((c) => c.name === main.name),
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Main Collections</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-2">
        {mainOnly.map((collection, i) => {
          const dbCollection = collections.find(
            (c) => c.name === collection.name,
          );

          return (
            <Link key={`${collection.href}-${i}`} href={collection.href}>
              <Item variant="muted" className="hover:bg-base-300 gap-2">
                <ItemHeader className="flex flex-row items-center gap-2">
                  <MyImage
                    src={collection.icon || "/icons/note.png"}
                    role="ICON"
                  />
                  <h4 className="text-lg">{collection.label}</h4>
                </ItemHeader>

                <ItemContent>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <span className="font-medium">
                        {dbCollection?.size_bytes || "0 KB"}
                      </span>
                      <span className="text-sm">Size</span>
                    </div>

                    <div className="flex gap-2">
                      <span className="font-medium">
                        {dbCollection?.document_count || 0}
                      </span>
                      <span className="text-sm">Docs</span>
                    </div>
                  </div>
                </ItemContent>
              </Item>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default MainCollectionsCard;
