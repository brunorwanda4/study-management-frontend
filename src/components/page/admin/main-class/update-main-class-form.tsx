"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { useToast } from "@/lib/context/toast/ToastContext";

import SelectWithSearch from "@/components/common/select-with-search";
import {
  MainClassModel,
  UpdateMainClassModel,
  updateMainClassSchema,
} from "@/lib/schema/admin/main-classes-schema";
import { TradeModule } from "@/lib/schema/admin/tradeSchema";
import { AuthUserResult } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";

interface Props {
  mainClass: MainClassModel;
  auth: AuthUserResult;
}

const UpdateMainClassForm = ({ mainClass, auth }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const [trades, setTrades] = useState<TradeModule[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  // Fetch trades for dropdown
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await apiRequest<any, TradeModule[]>(
          "get",
          "/trades",
          undefined,
          { token: auth.token },
        );

        if (res.data) {
          const activeTrades = res.data.filter((t) => !t.disable);
          setTrades(activeTrades);
        }
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [auth.token]);

  const form = useForm<UpdateMainClassModel>({
    resolver: zodResolver(updateMainClassSchema),
    defaultValues: {
      name: mainClass.name ?? "",
      username: mainClass.username ?? "",
      description: mainClass.description ?? "",
      trade_id: mainClass.trade_id ?? mainClass.trade_id ?? undefined,
      disable: mainClass.disable ?? false,
    },
    mode: "onChange",
  });

  const handleSubmit = (values: UpdateMainClassModel) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const payload = {
          ...values,
          updated_at: new Date().toISOString(),
        };

        const request = await apiRequest<UpdateMainClassModel, any>(
          "put",
          `/main-classes/${mainClass.id ?? mainClass._id}`,
          payload,
          { token: auth.token },
        );

        if (!request.data) {
          setError(request.message);
          showToast({
            title: "Error",
            description: request.message,
            type: "error",
          });
        } else {
          setSuccess("Main class updated successfully!");
          showToast({
            title: "Main Class updated",
            description: `Updated: ${request.data.name}`,
            type: "success",
          });
        }
      } catch (err) {
        setError(`Unexpected error occurred [${err}]. Please try again.`);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="flex flex-row gap-4">
          {/* Left column */}
          <div className="flex w-1/2 flex-col space-y-4">
            {/* Name */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Main class name"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username */}
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Unique username"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      className="min-h-24 resize-none"
                      disabled={isPending}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Right column */}
          <div className="flex w-1/2 flex-col space-y-4">
            {/* Trade select */}
            <FormField
              name="trade_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trade</FormLabel>
                  <SelectWithSearch
                    options={trades
                      .filter((t) => t.id || t._id)
                      .map((t) => ({
                        value: String(t.id ?? t._id),
                        label: (
                          <div className="flex w-full justify-between">
                            <span>{t.name}</span>
                            <span>
                              {t.class_min} - {t.class_max}
                            </span>
                          </div>
                        ),
                      }))}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    placeholder={
                      loadingOptions ? "Loading trades..." : "Select trade"
                    }
                    disabled={isPending || loadingOptions}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Disable toggle */}
            <FormField
              name="disable"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row-reverse justify-start gap-2">
                  <FormLabel>Disable</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Messages */}
        <FormError message={error} />
        <FormSuccess message={success} />

        {/* Footer */}
        <DialogFooter className="px-6 pb-6 sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              variant="primary"
              library="daisy"
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              Update Main Class{" "}
              {isPending && (
                <LoaderCircle
                  className="-ms-1 me-2 animate-spin"
                  size={12}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpdateMainClassForm;
