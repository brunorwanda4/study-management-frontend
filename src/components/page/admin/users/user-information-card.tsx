"use client";

import MyImage from "@/components/common/myImage";
import UserDisableDialog from "@/components/page/admin/documentId/users/user-disable-dialog";
import DeleteUserDialog from "@/components/page/admin/users/deleteUserDialog";
import OpenImages from "@/components/page/admin/users/open-images";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserModel } from "@/lib/types/userModel";
import { cn } from "@/lib/utils";
import { AuthUserResult } from "@/lib/utils/auth-user";
import { calculateAge } from "@/lib/utils/calculate-age";
import Link from "next/link";

interface PropsUser {
  user: UserModel;
  auth: AuthUserResult;
}

const UserInformation = ({ user, auth }: PropsUser) => {
  const birthDate =
    user.age && new Date(user.age.year, user.age.month - 1, user.age.day);

  return (
    <Card className="max-w-fit">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <CardTitle>User</CardTitle>
          <div className="flex items-center gap-4">
            <UserDisableDialog user={user} auth={auth} />
            <DeleteUserDialog auth={auth} user={user} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <aside className="md:w-72">
          {/* Avatar */}
          <OpenImages
            images={user.image || "/images/default-avatar.jpg"}
            className="md:size-72"
            classname="mask mask-squircle"
          />

          <div className="mt-2 space-y-2">
            {/* Name */}
            {user.name && <h1 className="text-2xl font-medium">{user.name}</h1>}
            {user.username && (
              <div className="flex gap-2">
                <p className="text-xl font-normal opacity-80">
                  @{user.username}
                </p>
              </div>
            )}
            <div className="mt-4">
              <Link
                className={cn(buttonVariants({ library: "shadcn" }), "w-full")}
                href={`/a/collections/users/${user.username}/edit`}
              >
                <MyImage role="ICON" src="/icons/edit.png" /> Edit Profile
              </Link>
            </div>
            {/* Username */}

            {/* Email */}
            {user.email && (
              <div className="flex gap-2">
                <span>Email:</span>
                <p className="font-medium">{user.email}</p>
              </div>
            )}

            {/* Phone */}
            {user.phone && (
              <div className="flex gap-2">
                <span>Phone:</span>
                <p className="font-medium">{user.phone}</p>
              </div>
            )}

            {/* Role */}
            {user.role && (
              <div className="flex gap-2">
                <span>Role:</span>
                <p className="font-medium">{user.role}</p>
              </div>
            )}

            {/* Gender */}
            {user.gender && (
              <div className="flex gap-2">
                <span>Gender:</span>
                <p className="font-medium">{user.gender}</p>
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
            {user.address && (
              <div className="flex flex-col gap-1">
                <span>Address:</span>
                <p className="font-medium">
                  {[
                    user.address.village,
                    user.address.cell,
                    user.address.sector,
                    user.address.district,
                    user.address.province,
                    user.address.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            )}

            {/* Bio */}
            {user.bio && (
              <div>
                <span>Bio:</span>
                <p>{user.bio}</p>
              </div>
            )}

            {/* Status (disabled flag) */}
            {typeof user.disable === "boolean" && (
              <div className="flex items-center gap-2">
                <span>Status:</span>
                <div className="font-medium">
                  {user.disable ? "DISABLED" : "ACTIVE"}
                </div>
                <div
                  className={cn(
                    "size-3 rounded-full",
                    user.disable ? "bg-error" : "bg-success",
                  )}
                />
              </div>
            )}

            {/* Created & Updated dates */}
            {user.created_at && (
              <div className="flex text-sm text-gray-500">
                Created at{" "}
                {new Date(user.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}

            {user.updated_at && (
              <div className="flex text-sm text-gray-500">
                Updated at{" "}
                {new Date(user.updated_at).toLocaleDateString(undefined, {
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

export default UserInformation;
