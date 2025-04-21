"use client";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { authUser } from "@/types/userModel";
import { Class, SendUserRequest, User } from "../../../prisma/prisma/generated";
import { toLowerCase } from "@/utils/functions/characters";
import {
  deleteUserRequest,
  UserJoinClassRequest,
} from "@/services/actions/send-user-request-action";
import { handleFormSubmission } from "@/hooks/form-notification";
import { LoaderCircle } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";

interface props {
  lang: Locale;
  user: authUser;
  sender: User;
  getClass?: Class | null;
  notification: SendUserRequest;
}

const NotificationCard = ({ lang, sender, getClass, notification }: props) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const acceptNotification = () => {
    setError("");
    setSuccess("");
    setWarning("");
    handleFormSubmission(
      () => UserJoinClassRequest(notification),
      startTransition
    );
  };

  const deleteNotification = () => {
    setError("");
    setSuccess("");
    setWarning("");
    handleFormSubmission(
      () => deleteUserRequest(notification.id),
      startTransition
    );
  };
  return (
    <div
      className={cn(
        "basic-card flex-row justify-between",
        error && " border-error",
        success && "border-success",
        warning && "border-warning"
      )}
    >
      <div className=" flex space-x-2">
        <Link href={`/${lang}/profile/${sender.id}`}>
          <Avatar className=" size-12">
            <AvatarImage src={sender.image ? sender.image : "/profiles/b/20.png"} />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link href={`/profile/student/${lang}/profile/${sender.id}`}>
            <div className=" flex space-x-2">
              <h4 className=" font-medium">
                {sender.name || "Murekezi Hindiro"}
              </h4>
              <span className=" font-medium text-myGray capitalize text-sm">
                {toLowerCase(sender.role)}
              </span>
            </div>
          </Link>
          <div className=" flex items-center">
            <span className=" font-medium text-myGray capitalize">
              {(notification.type === "STUDENTJOINCLASS" ||
                notification.type === "TEACHERjOINCLASS") &&
                "Join class"}
            </span>
          </div>
        </div>
      </div>
      {/* notification */}
      <div className=" flex space-x-2 items-center flex-col">
        <div className=" flex gap-2 items-center">
          <Avatar className=" size-4">
            <AvatarImage
              src={getClass?.symbol ? getClass.symbol : "/images/17.jpg"}
            />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
          <h5 className=" font-medium ">
            {getClass?.name ? getClass.name : "Class Name"}
          </h5>
        </div>
        <p>{notification.message}</p>
      </div>
      <div>
        <div className=" flex flex-col space-y-2">
          {(notification.type === "TEACHERjOINCLASS" ||
            notification.type === "STUDENTJOINCLASS") &&
          !notification.accept ? (
            <Button
              disabled={isPending}
              onClick={() => acceptNotification()}
              variant="info"
              size="sm"
            >
              Accept
              {isPending && (
                <LoaderCircle
                  className="-ms-1 me-2 animate-spin"
                  size={12}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
            </Button>
          ) : (
            <Button
              disabled={isPending}
              size="sm"
              onClick={() => deleteNotification()}
            >
              delete
              {isPending && (
                <LoaderCircle
                  className="-ms-1 me-2 animate-spin"
                  size={12}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
            </Button>
          )}
          <span className=" text-sm font-medium text-myGray">
            {formatDistanceToNowStrict(new Date(notification.created_at))} ago
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
