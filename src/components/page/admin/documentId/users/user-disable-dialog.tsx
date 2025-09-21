"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import MyImage from "@/components/common/myImage";
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
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/lib/context/toast/ToastContext";
import { UserModel } from "@/lib/types/userModel";
import { cn } from "@/lib/utils";
import { AuthUserResult } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";

interface Props {
  user: UserModel;
  auth: AuthUserResult;
}

const UserDisableDialog = ({ auth, user }: Props) => {
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
        auth?.token,
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
      <AlertDialogTrigger
        className={cn(
          buttonVariants({
            size: "sm",
            variant: "ghost",
            library: "shadcn",
            shape: "circle",
          }),
          "cursor-pointer",
        )}
      >
        <MyImage
          role="ICON"
          src={user.disable ? "/icons/checked.png" : "/icons/disabled.png"}
        />
        <span className="">{user.disable ? "Enable" : "Disable"}</span>
        {isPending && (
          <LoaderCircle
            className="-ms-1 me-2 animate-spin"
            size={12}
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
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
          <AlertDialogCancel type="button" className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleToggle()}
            className={cn(
              buttonVariants({
                variant: user.disable ? "success" : "warning",
                library: "daisy",
              }),
              "cursor-pointer",
            )}
          >
            {user.disable ? "Enable" : "Disable"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserDisableDialog;
