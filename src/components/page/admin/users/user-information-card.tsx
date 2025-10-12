"use client";

import UserDisableDialog from "@/components/page/admin/documentId/users/user-disable-dialog";
import DeleteUserDialog from "@/components/page/admin/users/deleteUserDialog";
import OpenImages from "@/components/page/admin/users/open-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { UserModel } from "@/lib/schema/user/user-schema";
import { cn } from "@/lib/utils";
import { AuthUserResult } from "@/lib/utils/auth-user";
import { calculateAge } from "@/lib/utils/calculate-age";
import { formatReadableDate } from "@/lib/utils/format-date";
import { useEffect, useState } from "react";

interface PropsUser {
  auth: AuthUserResult;
  initialUser: UserModel;
}

const UserInformation = ({ auth, initialUser }: PropsUser) => {
  const { data } = useRealtimeData<UserModel>("user");
  const [currentUser, setCurrentUser] = useState(initialUser);

  useEffect(() => {
    if (data && data.length > 0) {
      const updated = data.find((d) => d._id === initialUser._id);
      if (updated) setCurrentUser(updated);
    }
  }, [data, initialUser._id]);

  const birthDate =
    currentUser.age &&
    new Date(
      currentUser.age.year,
      currentUser.age.month - 1,
      currentUser.age.day,
    );

  return (
    <Card className="max-w-fit">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <CardTitle>User</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              library="daisy"
              variant={"ghost"}
              role="update"
              size={"sm"}
              href={`/a/collections/users/${currentUser.username}/edit`}
              data-tip={"Update user"}
              className="tooltip tooltip-top to-warning"
            >
              <span className="sr-only">Edit Profile</span>
            </Button>
            <UserDisableDialog isIcon user={currentUser} auth={auth} />
            <DeleteUserDialog isIcon auth={auth} user={currentUser} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <aside className="md:w-72">
          {/* Avatar */}
          <OpenImages
            images={currentUser.image || "/images/default-avatar.jpg"}
            className="md:size-72"
            classname="mask mask-squircle"
          />

          <div className="mt-2 space-y-2">
            {/* Name */}
            {currentUser.name && (
              <h1 className="text-2xl font-medium">{currentUser.name}</h1>
            )}
            {currentUser.username && (
              <div className="flex gap-2">
                <p className="text-xl font-normal opacity-80">
                  @{currentUser.username}
                </p>
              </div>
            )}
            {/* Email */}
            {currentUser.email && (
              <div className="flex gap-2">
                <span>Email:</span>
                <p className="font-medium">{currentUser.email}</p>
              </div>
            )}

            {/* Phone */}
            {currentUser.phone && (
              <div className="flex gap-2">
                <span>Phone:</span>
                <p className="font-medium">{currentUser.phone}</p>
              </div>
            )}

            {/* Role */}
            {currentUser.role && (
              <div className="flex gap-2">
                <span>Role:</span>
                <p className="font-medium">{currentUser.role}</p>
              </div>
            )}

            {/* Gender */}
            {currentUser.gender && (
              <div className="flex gap-2">
                <span>Gender:</span>
                <p className="font-medium">{currentUser.gender}</p>
              </div>
            )}

            {/* Age */}
            {birthDate && (
              <div className="flex gap-2">
                Age:{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="cursor-pointer font-medium">
                        {calculateAge(birthDate)} years old
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Born on{" "}
                        {birthDate.toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}

            {/* Address */}
            {currentUser.address && (
              <div className="flex flex-col gap-1">
                <span>Address:</span>
                <p className="font-medium">
                  {[
                    currentUser.address.village,
                    currentUser.address.cell,
                    currentUser.address.sector,
                    currentUser.address.district,
                    currentUser.address.province,
                    currentUser.address.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            )}

            {/* Bio */}
            {currentUser.bio && (
              <div>
                <span>Bio:</span>
                <p>{currentUser.bio}</p>
              </div>
            )}

            {/* Status (disabled flag) */}
            {typeof currentUser.disable === "boolean" && (
              <div className="flex items-center gap-2">
                <span>Status:</span>
                <div className="font-medium">
                  {currentUser.disable ? "DISABLED" : "ACTIVE"}
                </div>
                <div
                  className={cn(
                    "size-3 rounded-full",
                    currentUser.disable ? "bg-error" : "bg-success",
                  )}
                />
              </div>
            )}

            {/* Created & Updated dates */}
            {currentUser.created_at && (
              <div className="flex text-sm text-gray-500">
                Created at {formatReadableDate(currentUser.created_at)}
              </div>
            )}

            {currentUser.updated_at && (
              <div className="flex text-sm text-gray-500">
                Updated at {formatReadableDate(currentUser.updated_at)}
              </div>
            )}
          </div>
        </aside>
      </CardContent>
    </Card>
  );
};

export default UserInformation;
