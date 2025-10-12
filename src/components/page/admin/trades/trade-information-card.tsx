"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthUserResult } from "@/lib/utils/auth-user";

import MyImage from "@/components/common/myImage";
import DeleteTradeDialog from "@/components/page/admin/trades/deleteTradeDialog";
import TradeDisableDialog from "@/components/page/admin/trades/trade-disable-dialog";
import UpdateTradeDialog from "@/components/page/admin/trades/updateTradeDialog";
import { Badge } from "@/components/ui/badge";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema";
import { formatReadableDate } from "@/lib/utils/format-date";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PropsTrade {
  trade: TradeModelWithOthers;
  auth: AuthUserResult;
}

const TradeInformationCard = ({ trade, auth }: PropsTrade) => {
  const { data } = useRealtimeData<TradeModelWithOthers>("trade");
  const [currentTrade, setCurrentTrade] = useState(trade);

  useEffect(() => {
    if (data && data.length > 0) {
      const updated = data.find((d) => d._id === trade._id);
      if (updated) setCurrentTrade(updated);
    }
  }, [data, trade._id]);
  return (
    <Card className="max-w-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Trade</CardTitle>
          <div className="flex items-center gap-2">
            <UpdateTradeDialog isIcon trade={currentTrade} auth={auth} />
            <TradeDisableDialog trade={currentTrade} auth={auth} />
            <DeleteTradeDialog trade={currentTrade} auth={auth} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <aside className="md:w-72">
          <div className="mt-2 space-y-2">
            {/* Name */}
            {currentTrade.name && (
              <h1 className="text-2xl font-medium">{currentTrade.name}</h1>
            )}

            {/* Username */}
            {currentTrade.username && (
              <div className="flex gap-2">
                <p className="text-xl font-normal opacity-80">
                  @{currentTrade.username}
                </p>
              </div>
            )}

            {/* Class Min/Max */}
            <div className="flex gap-2">
              <span>Class Range:</span>
              <p className="font-medium">
                {currentTrade.class_min} - {currentTrade.class_max}
              </p>
            </div>

            {/* Type */}
            {currentTrade.type && (
              <div className="flex gap-2">
                <span>Type:</span>
                <p className="font-medium capitalize">{currentTrade.type}</p>
              </div>
            )}

            {/* Description */}
            {currentTrade.description && (
              <div>
                <span>Description:</span>
                <p className="font-medium">{currentTrade.description}</p>
              </div>
            )}

            {/* Sector */}
            {currentTrade.sector && (
              <div className="mt-2">
                <Link
                  href={`/a/collections/sectors/${currentTrade.sector.username}`}
                  className="flex flex-row items-center gap-2"
                >
                  <span>Sector:</span>
                  <div className="flex items-center gap-1">
                    {currentTrade.sector.logo && (
                      <MyImage src={currentTrade.sector.logo} role="ICON" />
                    )}
                    <p className="font-medium">{currentTrade.sector.name}</p>
                  </div>
                </Link>
                {currentTrade.sector.country && (
                  <p className="text-sm text-gray-500">
                    Country: {currentTrade.sector.country}
                  </p>
                )}
                {currentTrade.sector.type && (
                  <p className="text-sm text-gray-500">
                    Type: {currentTrade.sector.type}
                  </p>
                )}
              </div>
            )}

            {/* Parent CurrentTrade */}
            {currentTrade.parent_trade && (
              <div className="mt-2">
                <Link
                  href={`/a/collections/trades/${currentTrade.parent_trade.username}`}
                  className="flex items-center gap-2"
                >
                  <span>Parent Trade:</span>
                  <p className="font-medium">
                    {currentTrade.parent_trade.name}
                  </p>
                </Link>
                {currentTrade.parent_trade.type && (
                  <p className="text-sm text-gray-500">
                    Type: {currentTrade.parent_trade.type}
                  </p>
                )}
              </div>
            )}

            {/* Disabled */}
            {typeof currentTrade.disable === "boolean" && (
              <div className="flex gap-2">
                <span>Status:</span>
                <Badge variant={currentTrade.disable ? "secondary" : "default"}>
                  {currentTrade.disable ? "Disabled" : "Active"}
                </Badge>
              </div>
            )}

            {/* Created & Updated */}
            {currentTrade.created_at && (
              <div className="flex text-sm text-gray-500">
                Created at {formatReadableDate(currentTrade.created_at)}
              </div>
            )}

            {currentTrade.updated_at && (
              <div className="flex text-sm text-gray-500">
                Updated at {formatReadableDate(currentTrade.updated_at)}
              </div>
            )}
          </div>
        </aside>
      </CardContent>
    </Card>
  );
};

export default TradeInformationCard;
