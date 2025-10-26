"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import SelectWithSearch from "@/components/common/select-with-search";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/context/toast/ToastContext";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import {
  type TradeModule,
  type UpdateTradeModule,
  updateTradeSchema,
} from "@/lib/schema/admin/tradeSchema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface Props {
  auth: AuthContext;
  trade: TradeModule;
}

const UpdateTradeForm = ({ auth, trade }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const [sectors, setSectors] = useState<SectorModel[]>([]);
  const [trades, setTrades] = useState<TradeModule[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [sectorsRes, tradesRes] = await Promise.all([
          apiRequest<any, SectorModel[]>("get", "/sectors", undefined, {
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
  }, [auth.token]);

  const form = useForm<UpdateTradeModule>({
    resolver: zodResolver(updateTradeSchema),
    defaultValues: {
      name: trade.name,
      username: trade.username,
      description: trade.description ?? "",
      class_min: trade.class_min,
      class_max: trade.class_max,
      type: trade.type,
      disable: trade.disable ?? false,
      sector_id: trade.sector_id ?? undefined,
      trade_id: trade.trade_id ?? undefined,
    },
    mode: "onChange",
  });

  const handleSubmit = (values: UpdateTradeModule) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const request = await apiRequest<UpdateTradeModule, any>(
        "put",
        `/trades/${trade.id || trade._id}`,
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
        setSuccess("Trade updated successfully!");
        showToast({
          title: "Trade updated",
          description: `Updated: ${request.data.name}`,
          type: "success",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="flex flex-row gap-4">
          <div className="flex w-1/2 flex-col space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trade Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
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
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => {
                const { name, onChange, onBlur, ref, value } = field;
                return (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
                        value={value ?? ""}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
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

          {/* Sector */}
          <div className="flex w-1/2 flex-col space-y-4">
            <FormField
              name="sector_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sector</FormLabel>
                  <SelectWithSearch
                    options={sectors.map((s) => ({
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

            {/* Parent Trade */}
            <FormField
              name="trade_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Trade</FormLabel>
                  <SelectWithSearch
                    options={trades.map((t) => ({
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
                      <SelectTrigger>
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

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isPending}>
            Update Trade{" "}
            {isPending && (
              <LoaderCircle className="ms-2 animate-spin" size={12} />
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpdateTradeForm;
