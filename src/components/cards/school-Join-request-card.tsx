"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Locale } from "@/i18n";
import { useToast } from "@/lib/context/toast/ToastContext";
import { formatTimeAgo } from "@/lib/functions/change-time";
import {
  JoinSchoolRequest,
  JoinSchoolRequestWithRelations,
} from "@/lib/schema/school/school-join-school/join-school-request-schema";
import { cn } from "@/lib/utils";
import { AuthContext, setAuthCookies } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import Link from "next/link";
import { useState, useTransition } from "react";
import { FormError, FormSuccess } from "../common/form-message";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface Props {
  lang: Locale;
  request: JoinSchoolRequestWithRelations;
  className?: string;
  auth: AuthContext;
}

const SchoolJoinRequestCard = ({ lang, request, className, auth }: Props) => {
  const [error, setError] = useState<string | null | undefined>("");
  const [success, setSuccess] = useState<string | null | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const onApprove = async () => {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const res = await apiRequest<void, { school_token: string }>(
        "put",
        `/join-school-requests/${request._id || request.id}/accept`,
        undefined,
        { token: auth.token, schoolToken: auth.token },
      );

      if (res.data) {
        const msg = `You have been accepted to join ${request.school?.name}`;
        setAuthCookies(auth.token, auth.user.id, res.data.school_token);
        setSuccess(msg);
        showToast({
          title: "Request accepted 🫡",
          description: msg,
          type: "default",
        });
      } else {
        showToast({
          title: "Something went wrong",
          description: res.message,
          type: "error",
        });
        setError(res.message);
      }
    });
  };

  const onReject = async () => {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const res = await apiRequest<void, JoinSchoolRequest>(
        "put",
        `/join-school-requests/${request._id || request.id}/reject`,
        undefined,
        { token: auth.token, schoolToken: auth.token },
      );

      if (res.data) {
        const msg = `You have rejected the request to join ${request.school?.name}`;
        setSuccess(msg);
        showToast({
          title: "Request rejected 😥",
          description: msg,
          type: "default",
        });
      } else {
        showToast({
          title: "Something went wrong",
          description: res.message,
          type: "error",
        });
        setError(res.message);
      }
    });
  };

  return (
    <Card
      className={cn("w-80 shadow-md transition-all hover:shadow-lg", className)}
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarImage
              src={request.invited_user?.image || "/images/default-avatar.jpg"}
              alt={request.invited_user?.name || "User Avatar"}
            />
            <AvatarFallback>
              {request.invited_user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="truncate">
            <CardTitle className="text-base font-semibold">
              {request.invited_user?.name}
            </CardTitle>
            {request.invited_user?.email && (
              <CardDescription className="text-muted-foreground truncate text-sm">
                {request.invited_user.email}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm">
          Request to join as{" "}
          <span className="font-semibold capitalize">{request.role}</span> at:
        </p>

        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage
              src={request.school?.logo || "/images/default-school-logo.jpg"}
              alt={`${request.school?.name} logo`}
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>

          <Link
            href={`/${lang}/school/${request.school?.username}`}
            className="truncate text-sm font-medium hover:underline"
          >
            {request.school?.name}
          </Link>
        </div>
        {request.message && <div>{request.message}</div>}
        <div className="flex justify-end">
          <span className="text-muted-foreground text-xs">
            {formatTimeAgo(request.updated_at)}
          </span>
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />
      </CardContent>

      <Separator />

      <CardFooter className="flex gap-3">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          disabled={isPending}
          library="daisy"
          onClick={onApprove}
        >
          Approve
          {isPending && (
            <div role="status" className="loading loading-spinner ms-2" />
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          library="daisy"
          className="flex-1"
          disabled={isPending}
          onClick={onReject}
        >
          Reject
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SchoolJoinRequestCard;
