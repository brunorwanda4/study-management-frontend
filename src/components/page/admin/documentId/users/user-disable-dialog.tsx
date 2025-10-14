"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/context/toast/ToastContext";
import { UserModel } from "@/lib/schema/user/user-schema";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useState, useTransition } from "react";

interface Props {
  user: UserModel;
  auth: AuthContext;
  isIcon?: boolean;
}

const UserDisableDialog = ({ auth, user, isIcon }: Props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleToggle = () => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const request = await apiRequest<{ disable: boolean }, UserModel>(
        "put",
        `/users/${user.id || user._id}`,
        {
          disable: user.disable ? false : true,
        },
        { token: auth?.token },
      );

      if (!request.data) {
        setError(request.message);
        showToast({
          title: "Uh oh! Something went wrong.",
          description: request.message,
          type: "error",
        });
      } else {
        const action = user.disable ? "disabled" : "enabled";
        setSuccess(`User ${request.data.name} ${action} successfully!`);
        showToast({
          title: `User ${request.data.name} ${action} successfully`,
          type: "success",
          description: (
            <p>
              You {action} <strong>{request.data.name}</strong> account.
            </p>
          ),
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size={"sm"}
          library="daisy"
          variant={user.disable ? "success" : "ghost"}
          role={isPending ? "loading" : user.disable ? "check" : "block"}
          data-tip={isIcon && user.disable ? "Enable user" : "Disable user"}
          className={cn(
            isIcon && user.disable
              ? "tooltip tooltip-top tooltip-success"
              : "tooltip tooltip-top",
          )}
        >
          <span className={cn(isIcon && "sr-only")}>
            {user.disable ? "Enable" : "Disable"}
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to{" "}
            <span className="font-medium capitalize">
              {user.disable ? "enable" : "disable"}
            </span>{" "}
            <span className="font-medium capitalize">{user.name}</span>'s
            account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {user.disable
              ? "This will re-enable the account and allow the user to access the system again."
              : "This action will disable the account. The user will not be able to access the system until it is enabled again."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button type="button" library="daisy" variant={"outline"}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={() => handleToggle()}
              library={"daisy"}
              variant={"primary"}
              role={isPending ? "loading" : undefined}
            >
              {user.disable ? "Enable" : "Disable"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserDisableDialog;
