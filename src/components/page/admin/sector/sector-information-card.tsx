"use client";

import DeleteSectorDialog from "@/components/page/admin/sector/deleteSectorDialog";
import SectorDisableDialog from "@/components/page/admin/sector/sector-disable-dialog";
import UpdateSectorDialog from "@/components/page/admin/sector/updateSectorDialog";
import OpenImages from "@/components/page/admin/users/open-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { AuthUserResult } from "@/lib/utils/auth-user";

interface PropsSector {
  sector: SectorModel;
  auth: AuthUserResult;
}

const SectorInformationCard = ({ sector, auth }: PropsSector) => {
  return (
    <Card className="max-w-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Sector</CardTitle>
          <div className="flex items-center gap-4">
            <SectorDisableDialog sector={sector} auth={auth} />
            <DeleteSectorDialog sector={sector} auth={auth} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <aside className="md:w-72">
          {/* Logo */}
          <OpenImages
            images={sector.logo || "/images/default-sector.png"}
            className="md:size-72"
            classname="mask mask-squircle"
          />

          <div className="mt-2 space-y-2">
            {/* Name */}
            {sector.name && (
              <h1 className="text-2xl font-medium">{sector.name}</h1>
            )}

            {/* Username */}
            {sector.username && (
              <div className="flex gap-2">
                <p className="text-xl font-normal opacity-80">
                  @{sector.username}
                </p>
              </div>
            )}

            {/* Edit Button */}
            <div className="mt-4">
              <UpdateSectorDialog sector={sector} auth={auth} />
            </div>

            {/* Description */}
            {sector.description && (
              <div>
                <span>Description:</span>
                <p className="font-medium">{sector.description}</p>
              </div>
            )}

            {/* Country */}
            {sector.country && (
              <div className="flex gap-2">
                <span>Country:</span>
                <p className="font-medium">{sector.country}</p>
              </div>
            )}

            {/* Type */}
            {sector.type && (
              <div className="flex gap-2">
                <span>Type:</span>
                <p className="font-medium capitalize">{sector.type}</p>
              </div>
            )}

            {/* Curriculum (start - end years) */}
            {sector.curriculum && (
              <div className="flex gap-2">
                <span>Curriculum:</span>
                <p className="font-medium">
                  {sector.curriculum[0]} - {sector.curriculum[1]}
                </p>
              </div>
            )}

            {/* Created & Updated dates */}
            {sector.created_at && (
              <div className="flex text-sm text-gray-500">
                Created at{" "}
                {new Date(sector.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}

            {sector.updated_at && (
              <div className="flex text-sm text-gray-500">
                Updated at{" "}
                {new Date(sector.updated_at).toLocaleDateString(undefined, {
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

export default SectorInformationCard;
