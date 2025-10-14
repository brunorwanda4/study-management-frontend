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
import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/lib/context/toast/ToastContext";
import { MainClassModel } from "@/lib/schema/admin/main-classes-schema";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useState, useTransition } from "react";

interface Props {
  mainClass: MainClassModel;
  auth: AuthContext;
  isIcon?: boolean;
}

const MainClassDisableDialog = ({ mainClass, auth, isIcon }: Props) => {
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
        <Button
          className={cn(
            "w-full",
            isIcon && "tooltip tooltip-top tooltip-error w-fit",
          )}
          variant={"ghost"}
          size={"sm"}
          library="daisy"
          role={mainClass.disable ? "check" : "block"}
          data-tip={isIcon && " Update main class"}
        >
          <span className={cn(isIcon && "sr-only")}>
            {mainClass.disable ? "Enable" : "Disable"}
          </span>
        </Button>
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
