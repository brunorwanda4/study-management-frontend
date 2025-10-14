"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
  mainClassSchema,
} from "@/lib/schema/admin/main-classes-schema";
import { TradeModule } from "@/lib/schema/admin/tradeSchema";
import { AuthUserResult } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";

interface Props {
  auth: AuthUserResult;
  trade?: TradeModule;
}

const CreateMainClassForm = ({ auth, trade }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const [trades, setTrades] = useState<TradeModule[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  // Fetch options when component mounts
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [tradesRes] = await Promise.all([
          trade
            ? { data: [] }
            : apiRequest<any, TradeModule[]>("get", "/trades", undefined, {
                token: auth.token,
              }),
        ]);

        if (tradesRes.data) {
          const activeTrades = tradesRes.data.filter((t) => !t.disable);
          setTrades(activeTrades);
        }
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [auth.token]);

  const form = useForm<MainClassModel>({
    resolver: zodResolver(mainClassSchema),
    defaultValues: {
      name: "",
      username: "",
      description: "",
      trade_id: trade ? trade._id || trade.id : undefined,
      disable: false,
      level: "1",
    },
    mode: "onChange",
  });

  const handleSubmit = (values: MainClassModel) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      console.log("🫡🫡", values);
      try {
        const api_data = { ...values, level: Number(values.level) };
        const request = await apiRequest<typeof api_data, any>(
          "post",
          "/main-classes",
          api_data,
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
          setSuccess("Main class created successfully!");
          showToast({
            title: "Main Class created",
            description: `Created: ${request.data.name}`,
            type: "success",
          });
          form.reset();
        }
      } catch (err) {
        setError(`Unexpected error occurred [${err}]. Please try again.`);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Name */}
        <div className="flex flex-row gap-4">
          <div className="flex w-1/2 flex-col space-y-4">
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
          <div className="flex w-1/2 flex-col space-y-4">
            {!trade && (
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
            )}
            {/* level */}
            <FormField
              name="level"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="level"
                      numberMode="level"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Disable */}
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
          <Button
            type="submit"
            variant="default"
            disabled={isPending}
            className="w-full sm:w-auto"
            role={isPending ? "loading" : undefined}
          >
            Add Main Class
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateMainClassForm;
