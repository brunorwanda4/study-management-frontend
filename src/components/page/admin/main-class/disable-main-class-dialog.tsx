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
import { MainClassModel } from "@/lib/schema/admin/main-classes-schema";
import { cn } from "@/lib/utils";
import { AuthUserResult } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";

interface Props {
  mainClass: MainClassModel;
  auth: AuthUserResult;
}

const MainClassDisableDialog = ({ mainClass, auth }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleToggle = () => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const request = await apiRequest<{ disable: boolean }, MainClassModel>(
        "put",
        `/main-classes/${mainClass.id || mainClass._id}`,
        { disable: mainClass.disable ? false : true },
        { token: auth.token },
      );

      if (!request.data) {
        setError(request.message);
        showToast({
          title: "Uh oh! Something went wrong.",
          description: request.message,
          type: "error",
        });
      } else {
        const action = mainClass.disable ? "enabled" : "disabled";
        setSuccess(`Main class ${request.data.name} ${action} successfully!`);
        showToast({
          title: `Main class ${request.data.name} ${action}`,
          description: (
            <p>
              You {action} <strong>{request.data.name}</strong>.
            </p>
          ),
          type: "success",
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          buttonVariants({ size: "sm", variant: "ghost", library: "shadcn" }),
          "cursor-pointer",
        )}
      >
        <MyImage
          role="ICON"
          src={mainClass.disable ? "/icons/checked.png" : "/icons/disabled.png"}
        />
        <span>{mainClass.disable ? "Enable" : "Disable"}</span>
        {isPending && <LoaderCircle className="ms-2 animate-spin" size={12} />}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to{" "}
            <span className="capitalize">
              {mainClass.disable ? "enable" : "disable"}
            </span>{" "}
            <strong>{mainClass.name}</strong>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {mainClass.disable
              ? "This will re-enable the main class."
              : "This action will disable the main class until re-enabled."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleToggle}
            className={cn(
              buttonVariants({
                variant: mainClass.disable ? "success" : "warning",
                library: "daisy",
              }),
              "cursor-pointer",
            )}
          >
            {mainClass.disable ? "Enable" : "Disable"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MainClassDisableDialog;
