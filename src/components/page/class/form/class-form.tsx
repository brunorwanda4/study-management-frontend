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

import UploadImage from "@/components/common/cards/form/upload-image";
import { FormError, FormSuccess } from "@/components/common/form-message";
import SelectWithSearch from "@/components/common/select-with-search";

import { useToast } from "@/lib/context/toast/ToastContext";
import apiRequest from "@/service/api-client";

import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import {
  CreateClassSchema,
  type Class,
  type CreateClass,
} from "@/lib/schema/class/class-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  isSchool?: boolean;
  trade?: TradeModule;
  cls?: Class;
}

const ClassForm = ({ auth, trade, cls, isSchool }: Props) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [trades, setTrades] = useState<TradeModule[]>([]);
  const [loadingTrades, setLoadingTrades] = useState(true);

  const { showToast } = useToast();
  // TODO: after user select trade it get all main classes to make connect with main classes
  // -------------------------------
  // Fetch available trades
  // -------------------------------
  useEffect(() => {
    const loadTrades = async () => {
      try {
        if (trade) {
          setTrades([]);
          return;
        }

        const res = await apiRequest<any, TradeModule[]>(
          "get",
          "/trades",
          undefined,
          {
            token: auth.token,
          },
        );

        const activeTrades = res.data?.filter((t) => !t.disable) ?? [];
        setTrades(activeTrades);
      } finally {
        setLoadingTrades(false);
      }
    };

    loadTrades();
  }, [auth.token, trade]);

  // -------------------------------
  // Initialize form
  // -------------------------------
  const form = useForm<CreateClass>({
    resolver: zodResolver(CreateClassSchema),
    defaultValues: {
      name: cls?.name ?? "",
      username: cls?.username ?? "",
      description: cls?.description ?? "",
      is_active: cls?.is_active ?? true,
      type: cls?.type ?? "Private",
      capacity: cls?.capacity ?? 45,
      grade_level: cls?.grade_level ?? "",
      image: cls?.image ?? undefined,
      school_id:
        cls?.school_id ??
        (isSchool && auth.school ? auth.school.id : undefined),
      creator_id: cls?.creator_id ?? auth.user.id,
      trade_id: cls?.trade_id,
    },
    mode: "onChange",
  });

  // -------------------------------
  // Submit handler
  // -------------------------------
  const handleSubmit = (values: CreateClass) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(async () => {
      try {
        const endpoint = cls
          ? isSchool
            ? `/school/classes/${cls._id || cls.id}`
            : `/classes/${cls._id || cls.id}`
          : isSchool
            ? "/school/classes"
            : "/classes";

        const response = await apiRequest<typeof values, Class>(
          cls ? "put" : "post",
          endpoint,
          values,
          { token: auth.token, schoolToken: auth.schoolToken },
        );

        if (!response.data) {
          setError(response.message);
          showToast({
            title: "Error",
            description: response.message,
            type: "error",
          });
          return;
        }

        const message = cls
          ? "Class updated successfully!"
          : "Class created successfully!";
        setSuccess(message);

        showToast({
          title: cls ? "Class Updated" : "Class Created",
          description: response.data.name,
          type: "success",
        });

        if (!cls) form.reset();
      } catch (err) {
        setError(
          `Unexpected error occurred [${String(err)}]. Please try again.`,
        );
      }
    });
  };

  // -------------------------------
  // Render
  // -------------------------------
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex flex-row gap-6">
          {/* ---------- Left Section ---------- */}
          <div className="flex w-1/2 flex-col space-y-4">
            {/* Image Upload */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Profile Image</FormLabel>
                  <FormControl>
                    <UploadImage
                      onChange={field.onChange}
                      value={field.value?.toString() ?? null}
                      disabled={isPending}
                      description="Drop your profile image here"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
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
              control={form.control}
              name="username"
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
          </div>

          {/* ---------- Right Section ---------- */}
          <div className="flex w-1/2 flex-col space-y-4">
            {/* Capacity */}
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={5}
                      max={80}
                      placeholder="Number of students"
                      disabled={isPending}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Trade Selection */}
            {!trade && (
              <FormField
                control={form.control}
                name="trade_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trade</FormLabel>
                    <SelectWithSearch
                      options={trades.map((t) => ({
                        value: String(t.id ?? t._id),
                        label: t.name,
                      }))}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder={
                        loadingTrades ? "Loading trades..." : "Select trade"
                      }
                      disabled={isPending || loadingTrades}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Grade Level */}
            <FormField
              control={form.control}
              name="grade_level"
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

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
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

            {/* Active Checkbox */}
            <FormField
              control={form.control}
              name="is_active"
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

        {/* ---------- Messages ---------- */}
        <FormError message={error} />
        <FormSuccess message={success} />

        {/* ---------- Footer ---------- */}
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
            {cls ? "Update Class" : "Add Class"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ClassForm;
