"use client";

import MyImage from "@/components/common/myImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AuthUserResult } from "@/lib/utils/auth-user";
import Link from "next/link";

import DeleteMainClassDialog from "@/components/page/admin/main-class/delete-main-class-dialog";
import MainClassDisableDialog from "@/components/page/admin/main-class/disable-main-class-dialog";
import UpdateMainClassDialog from "@/components/page/admin/main-class/update-trade-dialog";
import { MainClassModelWithOthers } from "@/lib/schema/admin/main-classes-schema";

interface Props {
  mainClass: MainClassModelWithOthers;
  auth: AuthUserResult;
}

const MainClassInformationCard = ({ mainClass, auth }: Props) => {
  return (
    <Card className="max-w-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Main Class</CardTitle>
          <div className="flex items-center gap-4">
            <MainClassDisableDialog mainClass={mainClass} auth={auth} />
            <DeleteMainClassDialog mainClass={mainClass} auth={auth} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <aside className="md:w-72">
          <div className="mt-2 space-y-2">
            {/* Name */}
            {mainClass.name && (
              <h1 className="text-2xl font-medium">{mainClass.name}</h1>
            )}

            {/* Username */}
            {mainClass.username && (
              <div className="flex gap-2">
                <p className="text-xl font-normal opacity-80">
                  @{mainClass.username}
                </p>
              </div>
            )}

            {/* Edit Button */}
            <div className="mt-4">
              <UpdateMainClassDialog mainClass={mainClass} auth={auth} />
            </div>

            {/* Description */}
            {mainClass.description && (
              <div>
                <span>Description:</span>
                <p className="font-medium">{mainClass.description}</p>
              </div>
            )}

            {/* Linked Trade */}
            {mainClass.trade && (
              <div className="mt-2">
                <div>
                  <Link
                    href={`/a/database/trades/${mainClass.trade.username}`}
                    className="flex flex-row gap-1"
                  >
                    <span>Trade:</span>
                    <p className="font-medium">{mainClass.trade.name}</p>
                  </Link>
                  {mainClass.trade.class_max && mainClass.trade.class_min && (
                    <p className="text-sm text-gray-500">
                      Class range: {mainClass.trade.class_min} -{" "}
                      {mainClass.trade.class_max}
                    </p>
                  )}
                  {mainClass.trade.type && (
                    <p className="text-sm text-gray-500">
                      Type: {mainClass.trade.type}
                    </p>
                  )}
                </div>

                {/* Trade sector */}
                {mainClass.trade.sector && (
                  <div>
                    <Link
                      href={`/a/database/sectors/${mainClass.trade.sector.username}`}
                      className="mt-1 flex items-center gap-2"
                    >
                      <span>Sector:</span>
                      {mainClass.trade.sector.logo && (
                        <MyImage
                          src={mainClass.trade.sector.logo}
                          role="ICON"
                        />
                      )}
                      <p className="font-medium">
                        {mainClass.trade.sector.name}
                      </p>
                    </Link>
                    {mainClass.trade.sector.country && (
                      <p className="text-sm text-gray-500">
                        Country: {mainClass.trade.sector.country}
                      </p>
                    )}
                    {mainClass.trade.sector.type && (
                      <p className="text-sm text-gray-500">
                        Type: {mainClass.trade.sector.type}
                      </p>
                    )}
                  </div>
                )}

                {/* Parent trade */}
                {mainClass.trade.parent_trade && (
                  <div className="mt-1">
                    <Link
                      href={`/a/database/trades/${mainClass.trade.parent_trade.username}`}
                      className="flex items-center gap-2"
                    >
                      <span>Parent Trade:</span>
                      <p className="font-medium">
                        {mainClass.trade.parent_trade.name}
                      </p>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Disabled */}
            {typeof mainClass.disable === "boolean" && (
              <div className="flex gap-2">
                <span>Status:</span>
                <p
                  className={cn(
                    "font-medium",
                    mainClass.disable ? "text-red-500" : "text-green-600",
                  )}
                >
                  {mainClass.disable ? "Disabled" : "Active"}
                </p>
              </div>
            )}

            {/* Created & Updated */}
            {mainClass.created_at && (
              <div className="flex text-sm text-gray-500">
                Created at{" "}
                {new Date(mainClass.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}

            {mainClass.updated_at && (
              <div className="flex text-sm text-gray-500">
                Updated at{" "}
                {new Date(mainClass.updated_at).toLocaleDateString(undefined, {
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

export default MainClassInformationCard;
