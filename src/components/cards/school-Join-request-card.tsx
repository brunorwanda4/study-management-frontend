"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SchoolJoinRequestAndSchool } from "@/lib/schema/school/school-join-request.schema";
import { approvedSchoolJoinRequestByCurrentUser, RejectSchoolJoinRequestByCurrentUser } from "@/service/school/school-join-request.service";
import { FormError, FormSuccess } from "../myComponents/form-message";
import { useState, useTransition } from "react";

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
  const { id, name, email, role, school } = request;
  const { id: schoolId, name: schoolName, logo: schoolLogo } = school;

  const displayName = name || email || "Unknown Applicant";
  const displayRole = role || "Member";

  const onApprove = async () => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const approve = await approvedSchoolJoinRequestByCurrentUser(id);
      if (approve.data) {
        setSuccess(`You have been join ${school.name}`);
      } else {
        setError(approve.message);
      }
    });
  };

  const onReject = async () => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const approve = await RejectSchoolJoinRequestByCurrentUser(id);
      if (approve.data) {
        setSuccess(`You have been reject ${school.name}`);
      } else {
        setError(approve.message);
      }
    });
  };


  return (
    <div className={cn("basic-card p-4 w-72", className)}>
      {/* Adjusted width */}
      <div className="flex items-start gap-3">
        {/* Applicant's Avatar - Using a generic one or could try to derive from userId if possible elsewhere */}
        <Avatar className="size-12">
          {/* If you have a way to get the applicant's avatar using request.userId, use it here */}
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
          {/* Added overflow-hidden */}
          <h3 className="font-medium text-base truncate">{displayName}</h3>
          {/* Display applicant name/email */}
          {email && <p className="text-sm text-gray-500 truncate">{email}</p>} {id}
          {/* Display email if available */}
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-700">
        Requests to join as
        <span className="font-semibold capitalize">{displayRole}</span> at:
      </div>
      <div className="flex items-center gap-2 mt-2">
        {/* School Logo */}
        <Avatar className="size-8">
          {/* Smaller school logo */}
          <AvatarImage
            src={schoolLogo || "/images/default-school-logo.jpg"}
            alt={`${schoolName} logo`}
          />
          {/* Use school logo or placeholder */}
          <AvatarFallback>SCH</AvatarFallback>
        </Avatar>
        {/* School Name - Linked */}
        <Link
          href={`/${lang}/school/${schoolId}`}
          className="font-medium text-sm hover:underline truncate"
        >
          {schoolName}
        </Link>
      </div>
      <div className=" mt-2">
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
      <Separator className="my-2" />
      <div className="flex gap-3">
        {/* Adjusted gap */}
        <Button
          type="button"
          variant="default" // Or 'success'
          className="flex-1"
          disabled={isPending}
          onClick={() => onApprove()} // Pass the request ID
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
          variant="outline" // Or 'destructive'
          className="flex-1"
          disabled={isPending}
          onClick={() => onReject()} // Pass the request ID
        >
          Reject{" "}
          {isPending && (
            <div
              role="status"
              aria-label="Loading"
              className={"loading loading-spinner"}
            />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SchoolJoinRequestCard;
