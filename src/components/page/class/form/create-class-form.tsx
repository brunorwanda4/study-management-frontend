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
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import {
  CreateClassSchema,
  type CreateClass,
} from "@/lib/schema/class/class-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

interface Props {
  auth: AuthContext;
  isSchool?: boolean;
  trade?: TradeModule;
}

const CreateClassForm = ({ auth, trade }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const [trades, setTrades] = useState<TradeModule[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

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
  }, [auth.token, trade]);

  const form = useForm<CreateClass>({
    resolver: zodResolver(CreateClassSchema),
    defaultValues: {
      name: "",
      username: "",
      description: "",
      is_active: true,
      type: "Private",
      capacity: 45,
      grade_level: "",
      school_id: auth.school ? auth.school.id : undefined,
      creator_id: auth.user.id,
      trade_id: undefined,
    },
    mode: "onChange",
  });

  const handleSubmit = (values: CreateClass) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const api_data = { ...values };

        const request = await apiRequest<typeof api_data, any>(
          "post",
          "/school/classes", // ✅ changed to correct endpoint
          api_data,
          { token: auth.token, schoolToken: auth.schoolToken },
        );

        if (!request.data) {
          setError(request.message);
          showToast({
            title: "Error",
            description: request.message,
            type: "error",
          });
        } else {
          setSuccess("Class created successfully!");
          showToast({
            title: "Class Created",
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
        <div className="flex flex-row gap-4">
          {/* Left Side */}
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
                      placeholder="Class name"
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

          {/* Right Side */}
          <div className="flex w-1/2 flex-col space-y-4">
            {/* Capacity */}
            <FormField
              name="capacity"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={5}
                      max={80}
                      placeholder="Number of students"
                      disabled={isPending}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                          label: t.name,
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
            {/* Grade level */}
            <FormField
              name="grade_level"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Level</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Grade level"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Is Active */}
            <FormField
              name="is_active"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row-reverse justify-start gap-2">
                  <FormLabel>Active</FormLabel>
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
            <Button type="button" variant="outline" library="daisy">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="info"
            disabled={isPending}
            className="w-full sm:w-auto"
            role={isPending ? "loading" : undefined}
            library="daisy"
          >
            Add Class
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateClassForm;
