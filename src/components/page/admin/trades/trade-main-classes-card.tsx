"use client";

import NoItemsPage from "@/components/common/pages/no-items-page";
import CreateMainClassDialog from "@/components/page/admin/main-class/create-main-class-dialog";
import UpdateMainClassDialog from "@/components/page/admin/main-class/update-trade-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { MainClassModel } from "@/lib/schema/admin/main-classes-schema";
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { formatReadableDate } from "@/lib/utils/format-date";
import { Calendar, Clock, Layers } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  trade: TradeModule;
  auth: AuthContext;
  mainClasses: MainClassModel[];
}

const TradeMainClassesCard = ({ trade, auth, mainClasses }: Props) => {
  const { data: currentMainClasses } =
    useRealtimeData<MainClassModel>("main_class");
  const [displayMainClasses, setDisplayMainClasses] =
    useState<MainClassModel[]>(mainClasses);

  // Sync with realtime data
  useEffect(() => {
    if (currentMainClasses && currentMainClasses.length > 0) {
      const filtered = currentMainClasses.filter(
        (cls) => cls.trade_id === trade.id || cls.trade_id === trade._id,
      );
      setDisplayMainClasses(filtered);
    }
  }, [currentMainClasses, trade]);

  return (
    <Card className="w-full">
      <CardHeader className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Main Classes for {trade.name}</h2>
        <CreateMainClassDialog trade={trade} auth={auth} />
      </CardHeader>

      <CardContent>
        {displayMainClasses.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10">
            <NoItemsPage
              title="This trade doesn't have any main classes yet 😥"
              details="Add a new main class for this trade"
            />
            <CreateMainClassDialog trade={trade} auth={auth} />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {displayMainClasses.map((cls, i) => (
              <Item
                key={`${cls.id || cls._id}-${i}`}
                variant="outline"
                className="transition-all hover:shadow-sm"
              >
                <ItemContent className="flex flex-col gap-2 p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <ItemTitle className="text-lg font-semibold">
                        {cls.name}
                      </ItemTitle>
                      <div className="text-muted-foreground text-sm">
                        @{cls.username}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <UpdateMainClassDialog
                        mainClass={cls}
                        auth={auth}
                        isIcon
                      />
                      <Badge
                        variant={cls.disable ? "destructive" : "secondary"}
                      >
                        {cls.disable ? "Disabled" : "Active"}
                      </Badge>
                    </div>
                  </div>

                  {/* Description */}
                  {cls.description && (
                    <ItemDescription className="text-muted-foreground text-sm">
                      {cls.description}
                    </ItemDescription>
                  )}

                  {/* Additional Details */}
                  <div className="text-muted-foreground mt-2 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Layers className="h-4 w-4" />
                      <span>Trade: {trade.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        Created:{" "}
                        {cls.created_at
                          ? formatReadableDate(cls.created_at)
                          : "—"}
                      </span>
                    </div>
                    {cls.updated_at && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Updated: {formatReadableDate(cls.updated_at)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Link to full details */}
                  <div className="mt-2">
                    <Link
                      href={`/a/collections/main_classes/${cls.username}`}
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      View full details
                    </Link>
                  </div>
                </ItemContent>
              </Item>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TradeMainClassesCard;
