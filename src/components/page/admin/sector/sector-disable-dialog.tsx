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
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { cn } from "@/lib/utils";
import { AuthUserResult } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { useState, useTransition } from "react";

interface Props {
  sector: SectorModel;
  auth: AuthUserResult;
  isIcon?: boolean;
}

const SectorDisableDialog = ({ auth, sector, isIcon }: Props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleToggle = () => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const request = await apiRequest<{ disable: boolean }, SectorModel>(
        "put",
        `/sectors/${sector.id || sector._id}`,
        {
          disable: sector.disable ? false : true,
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
        const action = sector.disable ? "disabled" : "enabled";
        setSuccess(`Sector ${request.data.name} ${action} successfully!`);
        showToast({
          title: `Sector ${request.data.name} ${action} successfully`,
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
          library="daisy"
          role={isPending ? "loading" : sector.disable ? "check" : "block"}
          size={"sm"}
          variant={sector.disable ? "warning" : "secondary"}
          type="button"
          data-tip={isIcon && sector.disable ? "Enable" : "Disable"}
          className={cn(
            "cursor-pointer",
            isIcon && "tooltip tooltip-top w-fit",
            isIcon && sector.disable ? "tooltip-warning" : "tooltip-secondary",
          )}
        >
          <span className={cn(isIcon && "sr-only")}>
            {sector.disable ? "Enable" : "Disable"}
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to{" "}
            <span className="font-medium capitalize">
              {sector.disable ? "enable" : "disable"}
            </span>{" "}
            <span className="font-medium">{sector.name}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {sector.disable
              ? "This will re-enable the account and allow the sector to access the system again."
              : "This action will disable the account. The sector will not be able to access the system until it is enabled again."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel asChild type="button" className="cursor-pointer">
            <Button library="daisy" variant={"outline"}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              type="button"
              onClick={() => handleToggle()}
              variant={sector.disable ? "warning" : "secondary"}
              library="daisy"
              role={isPending ? "loading" : undefined}
            >
              {sector.disable ? "Enable" : "Disable"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SectorDisableDialog;
