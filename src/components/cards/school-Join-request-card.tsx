"use client"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SchoolJoinRequestAndSchool } from "@/lib/schema/school/school-join-request.schema";

interface props {
  lang: Locale;
  request: SchoolJoinRequestAndSchool;
  className?: string;
  currentUserImage ?: string;
}

const SchoolJoinRequestCard = ({
  lang,
  request,
  className,
  currentUserImage,
}: props) => {
  const { name, email, role, school } = request;
  const { id: schoolId, name: schoolName, logo: schoolLogo } = school;

  const displayName = name || email || "Unknown Applicant";
  const displayRole = role || "Member"; 

  const onApprove = () => {};
  const onReject = () => {};

  return (
    <div className={cn("basic-card p-4 w-72", className)}>
      {" "}
      {/* Adjusted width */}
      <div className="flex items-start gap-3">
        {/* Applicant's Avatar - Using a generic one or could try to derive from userId if possible elsewhere */}
        <Avatar className="size-12">
          {/* If you have a way to get the applicant's avatar using request.userId, use it here */}
          <AvatarImage src={currentUserImage?  currentUserImage:"/images/default-avatar.jpg"} alt={displayName} />
          {/* Generic placeholder */}
          <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden">
          {" "}
          {/* Added overflow-hidden */}
          <h3 className="font-medium text-base truncate">{displayName}</h3>{" "}
          {/* Display applicant name/email */}
          {email && (
            <p className="text-sm text-gray-500 truncate">{email}</p>
          )}{" "}
          {/* Display email if available */}
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-700">
        Requests to join as{" "}
        <span className="font-semibold capitalize">{displayRole}</span> at:
      </div>
      <div className="flex items-center gap-2 mt-2">
        {/* School Logo */}
        <Avatar className="size-8">
          {" "}
          {/* Smaller school logo */}
          <AvatarImage
            src={schoolLogo || "/images/default-school-logo.jpg"}
            alt={`${schoolName} logo`}
          />{" "}
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
      <Separator className="my-4" />
      <div className="flex gap-3">
        {" "}
        {/* Adjusted gap */}
        <Button
          type="button"
          variant="default" // Or 'success'
          className="flex-1"
          onClick={() => onApprove()} // Pass the request ID
        >
          Approve
        </Button>
        <Button
          type="button"
          variant="outline" // Or 'destructive'
          className="flex-1"
          onClick={() => onReject()} // Pass the request ID
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default SchoolJoinRequestCard;
