"use client";

import MyImage from "@/components/common/myImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AuthUserResult } from "@/lib/utils/auth-user";
import Link from "next/link";

import DeleteMainClassDialog from "@/components/page/admin/main-class/delete-main-class-dialog";
import MainClassDisableDialog from "@/components/page/admin/main-class/disable-main-class-dialog";
import UpdateMainClassDialog from "@/components/page/admin/main-class/update-trade-dialog";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider"; // ✅ import this
import { MainClassModelWithOthers } from "@/lib/schema/admin/main-classes-schema";
import { formatReadableDate } from "@/lib/utils/format-date";
import { useEffect, useState } from "react";

interface Props {
  mainClass: MainClassModelWithOthers;
  auth: AuthUserResult;
}

const MainClassInformationCard = ({ mainClass, auth }: Props) => {
  const { data } = useRealtimeData<MainClassModelWithOthers>("main_class"); // ✅ listen to realtime updates
  const [currentClass, setCurrentClass] = useState(mainClass);

  // ✅ Sync local state with realtime data
  useEffect(() => {
    if (data && data.length > 0) {
      const updated = data.find((d) => d._id === mainClass._id);
      if (updated) setCurrentClass(updated);
    }
  }, [data, mainClass._id]);

  return (
    <Card className="max-w-full lg:max-w-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Main Class</CardTitle>
          <div className="flex items-center gap-4">
            <MainClassDisableDialog mainClass={currentClass} auth={auth} />
            <DeleteMainClassDialog mainClass={currentClass} auth={auth} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <aside className="md:w-72">
          <div className="mt-2 space-y-2">
            {/* Name */}
            {currentClass.name && (
              <h1 className="text-2xl font-medium">{currentClass.name}</h1>
            )}

            {/* Username */}
            {currentClass.username && (
              <div className="flex gap-2">
                <p className="text-xl font-normal opacity-80">
                  @{currentClass.username}
                </p>
              </div>
            )}

            {/* Edit Button */}
            <div className="mt-4">
              <UpdateMainClassDialog mainClass={currentClass} auth={auth} />
            </div>

            {/* Description */}
            {currentClass.description && (
              <div>
                <span>Description:</span>
                <p className="font-medium">{currentClass.description}</p>
              </div>
            )}

            {/* Linked Trade */}
            {currentClass.trade && (
              <div className="mt-2">
                <div>
                  <Link
                    href={`/a/database/trades/${currentClass.trade.username}`}
                    className="flex flex-row gap-1"
                  >
                    <span>Trade:</span>
                    <p className="font-medium">{currentClass.trade.name}</p>
                  </Link>
                  {currentClass.trade.class_max &&
                    currentClass.trade.class_min && (
                      <p className="text-sm text-gray-500">
                        Class range: {currentClass.trade.class_min} -{" "}
                        {currentClass.trade.class_max}
                      </p>
                    )}
                  {currentClass.trade.type && (
                    <p className="text-sm text-gray-500">
                      Type: {currentClass.trade.type}
                    </p>
                  )}
                </div>

                {/* Trade sector */}
                {currentClass.trade.sector && (
                  <div>
                    <Link
                      href={`/a/database/sectors/${currentClass.trade.sector.username}`}
                      className="mt-1 flex items-center gap-2"
                    >
                      <span>Sector:</span>
                      {currentClass.trade.sector.logo && (
                        <MyImage
                          src={currentClass.trade.sector.logo}
                          role="ICON"
                        />
                      )}
                      <p className="font-medium">
                        {currentClass.trade.sector.name}
                      </p>
                    </Link>
                    {currentClass.trade.sector.country && (
                      <p className="text-sm text-gray-500">
                        Country: {currentClass.trade.sector.country}
                      </p>
                    )}
                    {currentClass.trade.sector.type && (
                      <p className="text-sm text-gray-500">
                        Type: {currentClass.trade.sector.type}
                      </p>
                    )}
                  </div>
                )}

                {/* Parent trade */}
                {currentClass.trade.parent_trade && (
                  <div className="mt-1">
                    <Link
                      href={`/a/database/trades/${currentClass.trade.parent_trade.username}`}
                      className="flex items-center gap-2"
                    >
                      <span>Parent Trade:</span>
                      <p className="font-medium">
                        {currentClass.trade.parent_trade.name}
                      </p>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Disabled */}
            {typeof currentClass.disable === "boolean" && (
              <div className="flex gap-2">
                <span>Status:</span>
                <p
                  className={cn(
                    "font-medium",
                    currentClass.disable ? "text-red-500" : "text-green-600",
                  )}
                >
                  {currentClass.disable ? "Disabled" : "Active"}
                </p>
              </div>
            )}

            <div className="space-y-2 border-t pt-4">
              {currentClass.created_at && (
                <div className="text-muted-foreground flex justify-between text-xs">
                  <span>Created:</span>
                  <span>{formatReadableDate(currentClass.created_at)}</span>
                </div>
              )}
              {currentClass.updated_at && (
                <div className="text-muted-foreground flex justify-between text-xs">
                  <span>Updated:</span>
                  <span>{formatReadableDate(currentClass.updated_at)}</span>
                </div>
              )}
            </div>
          </div>
        </aside>
      </CardContent>
    </Card>
  );
};

export default MainClassInformationCard;
