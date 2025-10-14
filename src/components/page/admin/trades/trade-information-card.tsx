"use client";

import MyImage from "@/components/common/myImage";
import DeleteTradeDialog from "@/components/page/admin/trades/deleteTradeDialog";
import TradeDisableDialog from "@/components/page/admin/trades/trade-disable-dialog";
import UpdateTradeDialog from "@/components/page/admin/trades/updateTradeDialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { MainClassModel } from "@/lib/schema/admin/main-classes-schema";
import { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema";
import { AuthUserResult } from "@/lib/utils/auth-user";
import { formatReadableDate } from "@/lib/utils/format-date";
import {
  ArrowUpRight,
  Building2,
  ClipboardList,
  FileText,
  Layers,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PropsTrade {
  trade: TradeModelWithOthers;
  auth: AuthUserResult;
  main_classes?: MainClassModel[];
}

const TradeInformationCard = ({ trade, auth, main_classes }: PropsTrade) => {
  const { data } = useRealtimeData<TradeModelWithOthers>("trade");
  const [currentTrade, setCurrentTrade] = useState(trade);

  useEffect(() => {
    if (data && data.length > 0) {
      const updated = data.find((d) => d._id === trade._id);
      if (updated) setCurrentTrade(updated);
    }
  }, [data, trade._id]);

  return (
    <Card className="h-fit max-w-full lg:max-w-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Trade Information</CardTitle>
          <div className="flex items-center gap-3">
            <UpdateTradeDialog isIcon trade={currentTrade} auth={auth} />
            <TradeDisableDialog trade={currentTrade} auth={auth} />
            <DeleteTradeDialog trade={currentTrade} auth={auth} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <aside className="md:w-80">
          {/* Header */}
          <div className="space-y-3 border-b pb-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{currentTrade.name}</h1>
                {currentTrade.username && (
                  <p className="text-muted-foreground text-lg">
                    @{currentTrade.username}
                  </p>
                )}
              </div>
              <Badge variant={currentTrade.disable ? "secondary" : "default"}>
                {currentTrade.disable ? "Disabled" : "Active"}
              </Badge>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {/* Type & Class Range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <ClipboardList className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-sm">Type</p>
                  <p className="font-medium capitalize">
                    {currentTrade.type || "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Layers className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-sm">Class Range</p>
                  <p className="font-medium">
                    {currentTrade.class_min} - {currentTrade.class_max}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            {currentTrade.description && (
              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Description
                </h3>
                <p className="text-sm leading-relaxed">
                  {currentTrade.description}
                </p>
              </div>
            )}

            {/* Sector Info */}
            {currentTrade.sector && (
              <div className="flex items-start gap-2">
                <Building2 className="text-muted-foreground mt-1 h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-sm">Sector</p>
                  <Link
                    href={`/a/collections/sectors/${currentTrade.sector.username}`}
                    className="group flex items-center gap-2"
                  >
                    {currentTrade.sector.logo && (
                      <MyImage src={currentTrade.sector.logo} role="ICON" />
                    )}
                    <p className="font-medium group-hover:underline">
                      {currentTrade.sector.name}
                    </p>
                    <ArrowUpRight className="text-muted-foreground h-3 w-3" />
                  </Link>
                  {currentTrade.sector.country && (
                    <p className="text-muted-foreground text-sm">
                      Country: {currentTrade.sector.country}
                    </p>
                  )}
                  {currentTrade.sector.type && (
                    <p className="text-muted-foreground text-sm">
                      Type: {currentTrade.sector.type}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Parent Trade */}
            {currentTrade.parent_trade && (
              <div className="flex items-start gap-2">
                <FileText className="text-muted-foreground mt-1 h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-sm">Parent Trade</p>
                  <Link
                    href={`/a/collections/trades/${currentTrade.parent_trade.username}`}
                    className="group flex items-center gap-1"
                  >
                    <p className="font-medium group-hover:underline">
                      {currentTrade.parent_trade.name}
                    </p>
                    <ArrowUpRight className="text-muted-foreground h-3 w-3" />
                  </Link>
                  {currentTrade.parent_trade.type && (
                    <p className="text-muted-foreground text-sm capitalize">
                      Type: {currentTrade.parent_trade.type}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Other Details */}
            <div className="flex items-center gap-2">
              <Users className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-muted-foreground text-sm">Classes Linked</p>
                <p className="font-medium">
                  {main_classes?.length || 0} classes
                </p>
              </div>
            </div>

            {/* Timestamps */}
            <div className="space-y-2 border-t pt-4">
              {currentTrade.created_at && (
                <div className="text-muted-foreground flex justify-between text-xs">
                  <span>Created:</span>
                  <span>{formatReadableDate(currentTrade.created_at)}</span>
                </div>
              )}
              {currentTrade.updated_at && (
                <div className="text-muted-foreground flex justify-between text-xs">
                  <span>Updated:</span>
                  <span>{formatReadableDate(currentTrade.updated_at)}</span>
                </div>
              )}
            </div>
          </div>
        </aside>
      </CardContent>
    </Card>
  );
};

export default TradeInformationCard;
