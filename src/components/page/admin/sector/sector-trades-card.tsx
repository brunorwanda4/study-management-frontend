"use client";

import NoItemsPage from "@/components/common/pages/no-items-page";
import CreateTradeDialog from "@/components/page/admin/trades/createTradeDialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { TradeModule } from "@/lib/schema/admin/tradeSchema";
import { AuthUserResult } from "@/lib/utils/auth-user";
import { formatReadableDate } from "@/lib/utils/format-date";
import { Calendar, Clock, GraduationCap, Lock, Unlock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
interface Props {
  sector: SectorModel;
  auth: AuthUserResult;
  trades: TradeModule[];
}

const SectorTradesCard = ({ sector, auth, trades }: Props) => {
  const { data: currentTrades } = useRealtimeData<TradeModule>("trade");
  const [displayTrades, setDisplayTrades] = useState<TradeModule[]>(trades);

  useEffect(() => {
    if (currentTrades && currentTrades.length > 0) {
      const filtered = currentTrades.filter(
        (t) => t.sector_id === sector.id || t.sector_id === sector._id,
      );
      setDisplayTrades(filtered);
    }
  }, [currentTrades, sector]);

  return (
    <Card className="w-full">
      <CardHeader className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Trades in {sector.name}</h2>
        <CreateTradeDialog sector={sector} auth={auth} />
      </CardHeader>

      <CardContent>
        {displayTrades.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10">
            <NoItemsPage
              title="No trades found 😥"
              details="Add a new trade to this sector"
            />
            <CreateTradeDialog sector={sector} auth={auth} />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {displayTrades.map((trade, i) => {
              const isDisabled = trade.disable === true;

              return (
                <Item
                  key={`${trade.id || trade._id}-${i}`}
                  variant="outline"
                  className="transition-all hover:shadow-sm"
                >
                  <Link href={`/a/collections/trades/${trade.username}`}>
                    <ItemContent className="flex flex-col gap-2 p-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <ItemTitle className="text-lg font-semibold">
                          {trade.name}
                        </ItemTitle>
                        <Badge variant={isDisabled ? "secondary" : "default"}>
                          {isDisabled ? "Disabled" : "Active"}
                        </Badge>
                      </div>

                      {/* Username */}
                      <div className="text-muted-foreground text-sm">
                        @{trade.username}
                      </div>

                      <div>
                        Type: <span className="font-medium">{trade.type}</span>
                      </div>
                      {/* Description */}
                      {trade.description && (
                        <ItemDescription className="text-muted-foreground text-sm">
                          {trade.description}
                        </ItemDescription>
                      )}

                      {/* Details */}
                      <div className="text-muted-foreground mt-2 flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          <span>
                            Class: {trade.class_min} - {trade.class_max}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Created:{" "}
                            {trade.created_at
                              ? formatReadableDate(trade.created_at)
                              : "—"}
                          </span>
                        </div>
                        {trade.updated_at && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              Updated: {formatReadableDate(trade.updated_at)}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          {isDisabled ? (
                            <Lock className="h-4 w-4" />
                          ) : (
                            <Unlock className="h-4 w-4" />
                          )}
                          <span>{isDisabled ? "Disabled" : "Active"}</span>
                        </div>
                      </div>
                    </ItemContent>
                  </Link>
                </Item>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SectorTradesCard;
