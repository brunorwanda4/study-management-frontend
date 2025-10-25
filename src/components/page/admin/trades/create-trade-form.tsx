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
import SelectWithSearch from "@/components/common/select-with-search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/lib/context/toast/ToastContext";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { TradeModule, tradeSchema } from "@/lib/schema/admin/tradeSchema";
import { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

interface Props {
  auth: AuthContext;
  sector?: SectorModel;
}

const CreateTradeForm = ({ auth, sector }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  // Local state for sectors & trades
  const [sectors, setSectors] = useState<SectorModel[]>([]);
  const [trades, setTrades] = useState<TradeModule[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  // Fetch options when component mounts
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [sectorsRes, tradesRes] = await Promise.all([
          sector
            ? { data: [] }
            : apiRequest<any, SectorModel[]>("get", "/sectors", undefined, {
                token: auth.token,
              }),
          apiRequest<any, TradeModule[]>("get", "/trades", undefined, {
            token: auth.token,
          }),
        ]);

        if (sectorsRes.data) {
          const activeSectors = sectorsRes.data.filter((s) => !s.disable);
          setSectors(activeSectors);
        }

        if (tradesRes.data) {
          const activeTrades = tradesRes.data.filter((t) => !t.disable);
          setTrades(activeTrades);
        }
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [auth.token, sector]);

  const form = useForm<TradeModule>({
    resolver: zodResolver(tradeSchema),
    defaultValues: {
      name: "",
      username: "",
      description: "",
      class_min: 0,
      class_max: 0,
      type: undefined,
      disable: false,
      sector_id: sector ? sector._id || sector.id : undefined,
      trade_id: undefined,
    },
    mode: "onChange",
  });

  const handleSubmit = (values: TradeModule) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const request = await apiRequest<TradeModule, any>(
          "post",
          "/trades",
          values,
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
          setSuccess("Trade created successfully!");
          showToast({
            title: "Trade created",
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
        {/* Left Side */}
        <div className="flex flex-row gap-4">
          <div className="flex w-1/2 flex-col space-y-4">
            {/* Name */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trade Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Trade name"
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
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
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

          {/* Right Side */}
          <div className="flex w-1/2 flex-col space-y-4">
            {/* Sector Select */}
            {!sector && (
              <FormField
                name="sector_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sector</FormLabel>
                    <SelectWithSearch
                      options={sectors
                        .filter((s) => s.id || s._id)
                        .map((s) => ({
                          value: String(s.id ?? s._id),
                          label: s.name,
                        }))}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder={
                        loadingOptions ? "Loading sectors..." : "Select sector"
                      }
                      disabled={isPending || loadingOptions}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Parent Trade Select */}
            <FormField
              name="trade_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Trade</FormLabel>
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
                      loadingOptions
                        ? "Loading trades..."
                        : "Select parent trade"
                    }
                    disabled={isPending || loadingOptions}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Class Min/Max */}
            <div className="grid grid-cols-2 gap-2">
              <FormField
                name="class_min"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Min</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="class_max"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Max</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Type */}

            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trade Type</FormLabel>
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Primary">Primary</SelectItem>
                      <SelectItem value="Level">Level</SelectItem>
                      <SelectItem value="Nursing">Nursing</SelectItem>
                    </SelectContent>
                  </Select>
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
            <Button library="daisy" type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              variant="primary"
              disabled={isPending}
              className="w-full sm:w-auto"
              library="daisy"
              role={isPending ? "loading" : undefined}
            >
              Add Trade
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateTradeForm;
