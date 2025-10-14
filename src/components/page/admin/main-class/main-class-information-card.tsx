"use client";

import MainClassDisableDialog from "@/components/page/admin/main-class/disable-main-class-dialog";
import UpdateMainClassDialog from "@/components/page/admin/main-class/update-trade-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { MainClassModel } from "@/lib/schema/admin/main-classes-schema";
import { cn } from "@/lib/utils";
import { AuthUserResult } from "@/lib/utils/auth-user";
import { formatReadableDate } from "@/lib/utils/format-date";
import { useEffect, useState } from "react";

interface Props {
  mainClass: MainClassModel;
  auth: AuthUserResult;
}

const MainClassInformationCard = ({ mainClass, auth }: Props) => {
  const { data } = useRealtimeData<MainClassModel>("main_class");
  const [currentClass, setCurrentClass] = useState(mainClass);

  // ✅ Sync local state with realtime data
  useEffect(() => {
    if (data && data.length > 0) {
      const updated = data.find((d) => d._id === mainClass._id);
      if (updated) setCurrentClass(updated);
    }
  }, [data, mainClass._id]);

  return (
    <Card className="h-fit max-w-full lg:max-w-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Main Class</CardTitle>
          <div className="flex items-center">
            <UpdateMainClassDialog
              isIcon
              mainClass={currentClass}
              auth={auth}
            />
            <MainClassDisableDialog
              isIcon
              mainClass={currentClass}
              auth={auth}
            />
            {/* You can later re-enable Delete dialog here */}
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
                <p className="text-lg font-normal opacity-80">
                  @{currentClass.username}
                </p>
              </div>
            )}

            {/* Level */}
            {currentClass.level && (
              <div className="flex gap-2">
                <span>Level:</span>
                <p className="font-normal opacity-80">{currentClass.level}</p>
              </div>
            )}

            {/* Description */}
            {currentClass.description && (
              <div>
                <span>Description:</span>
                <p>{currentClass.description}</p>
              </div>
            )}

            {/* Status */}
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

            {/* Dates */}
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
