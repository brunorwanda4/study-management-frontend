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
import { TradeModule } from "@/lib/schema/admin/tradeSchema";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";

interface Props {
  trade: TradeModule;
  auth: AuthContext;
}

const DeleteTradeDialog = ({ trade, auth }: Props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleDelete = () => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const request = await apiRequest(
        "delete",
        `/trades/${trade.id || trade._id}`,
        undefined,
        { token: auth.token },
      );
      if (request.error || !request.data || request.statusCode !== 200) {
        setError(request.message);
        showToast({
          title: "Uh oh! Something went wrong.",
          description: request.message,
          type: "error",
        });
      } else {
        setSuccess("Trade deleted successfully!");
        showToast({
          title: "Trade deleted successfully",
          description: <p>{request.message}</p>,
          type: "success",
        });
        redirect("/a/collections/trades");
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
        <MyImage role="ICON" src="/icons/delete.png" />
        <span>Delete</span>
        {isPending && <LoaderCircle className="ms-2 animate-spin" size={12} />}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete trade <strong>{trade.name}</strong>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The trade will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className={cn(
              buttonVariants({ variant: "destructive", library: "shadcn" }),
              "cursor-pointer",
            )}
          >
            Delete
            {isPending && (
              <LoaderCircle className="ms-2 animate-spin" size={12} />
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTradeDialog;
