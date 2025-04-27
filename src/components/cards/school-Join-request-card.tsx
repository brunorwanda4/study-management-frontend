"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SchoolJoinRequestAndSchool } from "@/lib/schema/school/school-join-school/school-join-request.schema";
import {
  approvedSchoolJoinRequestByCurrentUser,
  RejectSchoolJoinRequestByCurrentUser,
} from "@/service/school/school-join-request.service";
import { FormError, FormSuccess } from "../myComponents/form-message";
import { useState, useTransition } from "react";
import { formatTimeAgo } from "@/lib/functions/change-time";

interface props {
  lang: Locale;
  request: SchoolJoinRequestAndSchool;
  className?: string;
  currentUserImage?: string;
}

const SchoolJoinRequestCard = ({
  lang,
  request,
  className,
  currentUserImage,
}: props) => {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();
  const { name, email, role, school } = request;
  const { id: schoolId, name: schoolName, logo: schoolLogo } = school;

  const displayName = name || email || "Unknown Applicant";
  const displayRole = role || "Member";

  const onApprove = async () => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const approve = await approvedSchoolJoinRequestByCurrentUser(request.id);
      if (approve.data) {
        setSuccess(`You have been join ${school.name}`);
      } else {
        setError(`message :${approve.message} , error:${approve.error}`);
      }
    });
    console.log("approve", request.id);
  };

  const onReject = async () => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const approve = await RejectSchoolJoinRequestByCurrentUser(request.id);
      if (approve.data) {
        setSuccess(`You have been rejected to join ${school.name}`);
      } else {
        setError(approve.message);
      }
    });
  };

  return (
    <div className={cn("basic-card p-4 w-72", className)}>
      <div className="flex items-start gap-3">
        <Avatar className="size-12">
          <AvatarImage
            src={
              currentUserImage ? currentUserImage : "/images/default-avatar.jpg"
            }
            alt={displayName}
          />
          {/* Generic placeholder */}
          <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden">
          <h3 className="font-medium text-base truncate">{displayName}</h3>
          {email && <p className="text-sm text-gray-500 truncate">{email}</p>}
        </div>
      </div>
      <div className="mt-4 text-sm">
        Requests to join as{" "}
        <span className="font-semibold capitalize">{displayRole}</span> at:
      </div>
      <div>
        <div className="flex items-center gap-2 mt-2">
          <Avatar className="size-8">
            <AvatarImage
              src={schoolLogo || "/images/default-school-logo.jpg"}
              alt={`${schoolName} logo`}
            />
            <AvatarFallback>SCH</AvatarFallback>
          </Avatar>
          <Link
            href={`/${lang}/school/${schoolId}`}
            className="font-medium text-sm hover:underline truncate"
          >
            {schoolName}
          </Link>
        </div>
        <div className=" flex justify-end">
          <span className=" text-sm text-gray-500">
            {formatTimeAgo(request.updatedAt)}
          </span>
        </div>
      </div>
      <div className=" mt-2">
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
      <Separator className="my-2" />
      <div className="flex gap-3">
        <Button
          library="daisy"
          type="button"
          variant="primary"
          className="flex-1"
          disabled={isPending}
          onClick={() => onApprove()}
        >
          Approve{" "}
          {isPending && (
            <div
              role="status"
              aria-label="Loading"
              className={"loading loading-spinner"}
            />
          )}
        </Button>
        <Button
          type="button"
          library="daisy"
          variant="outline"
          className="flex-1"
          disabled={isPending}
          onClick={() => onReject()}
        >
          Reject{" "}
        </Button>
      </div>
    </div>
  );
};

export default SchoolJoinRequestCard;
