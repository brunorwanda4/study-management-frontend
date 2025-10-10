"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AuthUserResult } from "@/lib/utils/auth-user";

import MyImage from "@/components/common/myImage";
import DeleteTradeDialog from "@/components/page/admin/trades/deleteTradeDialog";
import TradeDisableDialog from "@/components/page/admin/trades/trade-disable-dialog";
import UpdateTradeDialog from "@/components/page/admin/trades/updateTradeDialog";
import { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema";
import Link from "next/link";

interface PropsTrade {
  trade: TradeModelWithOthers;
  auth: AuthUserResult;
}

const TradeInformationCard = ({ trade, auth }: PropsTrade) => {
  return (
    <Card className="max-w-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Trade</CardTitle>
          <div className="flex items-center gap-4">
            <TradeDisableDialog trade={trade} auth={auth} />
            <DeleteTradeDialog trade={trade} auth={auth} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <aside className="md:w-72">
          <div className="mt-2 space-y-2">
            {/* Name */}
            {trade.name && (
              <h1 className="text-2xl font-medium">{trade.name}</h1>
            )}

            {/* Username */}
            {trade.username && (
              <div className="flex gap-2">
                <p className="text-xl font-normal opacity-80">
                  @{trade.username}
                </p>
              </div>
            )}

            {/* Edit Button */}
            <div className="mt-4">
              <UpdateTradeDialog trade={trade} auth={auth} />
            </div>

            {/* Class Min/Max */}
            <div className="flex gap-2">
              <span>Class Range:</span>
              <p className="font-medium">
                {trade.class_min} - {trade.class_max}
              </p>
            </div>

            {/* Type */}
            {trade.type && (
              <div className="flex gap-2">
                <span>Type:</span>
                <p className="font-medium capitalize">{trade.type}</p>
              </div>
            )}

            {/* Description */}
            {trade.description && (
              <div>
                <span>Description:</span>
                <p className="font-medium">{trade.description}</p>
              </div>
            )}

            {/* Sector */}
            {trade.sector && (
              <div className="mt-2">
                <Link
                  href={`/a/collections/sectors/${trade.sector.username}`}
                  className="flex flex-row items-center gap-2"
                >
                  <span>Sector:</span>
                  <div className="flex items-center gap-1">
                    {trade.sector.logo && (
                      <MyImage src={trade.sector.logo} role="ICON" />
                    )}
                    <p className="font-medium">{trade.sector.name}</p>
                  </div>
                </Link>
                {trade.sector.country && (
                  <p className="text-sm text-gray-500">
                    Country: {trade.sector.country}
                  </p>
                )}
                {trade.sector.type && (
                  <p className="text-sm text-gray-500">
                    Type: {trade.sector.type}
                  </p>
                )}
              </div>
            )}

            {/* Parent Trade */}
            {trade.parent_trade && (
              <div className="mt-2">
                <Link
                  href={`/a/collections/trades/${trade.parent_trade.username}`}
                  className="flex items-center gap-2"
                >
                  <span>Parent Trade:</span>
                  <p className="font-medium">{trade.parent_trade.name}</p>
                </Link>
                {trade.parent_trade.type && (
                  <p className="text-sm text-gray-500">
                    Type: {trade.parent_trade.type}
                  </p>
                )}
              </div>
            )}

            {/* Disabled */}
            {typeof trade.disable === "boolean" && (
              <div className="flex gap-2">
                <span>Status:</span>
                <p
                  className={cn(
                    "font-medium",
                    trade.disable ? "text-red-500" : "text-green-600",
                  )}
                >
                  {trade.disable ? "Disabled" : "Active"}
                </p>
              </div>
            )}

            {/* Created & Updated */}
            {trade.created_at && (
              <div className="flex text-sm text-gray-500">
                Created at{" "}
                {new Date(trade.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}

            {trade.updated_at && (
              <div className="flex text-sm text-gray-500">
                Updated at{" "}
                {new Date(trade.updated_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </div>
        </aside>
      </CardContent>
    </Card>
  );
};

export default TradeInformationCard;
