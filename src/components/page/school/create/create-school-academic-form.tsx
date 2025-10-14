"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MultipleSelector from "@/components/ui/multiselect";
import { useToast } from "@/lib/context/toast/ToastContext";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { TradeModule } from "@/lib/schema/admin/tradeSchema";
import {
  createSchoolAcademic,
  createSchoolAcademicSchema,
} from "@/lib/schema/school/create-school-schema";
import {
  School,
  schoolAcademicResponse,
} from "@/lib/schema/school/school-schema";
import { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface Props {
  auth: AuthContext;
  school: School;
  isDialog?: boolean;
}

const CreateSchoolAcademicForm = ({ auth, school, isDialog }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const [sectors, setSectors] = useState<SectorModel[]>([]); // help me after user choose sectors to fetcher all trades which have connection of sectors he choose
  const [trades, setTrades] = useState<TradeModule[]>([]); // help me after he choose trades it feature add trades which have connection of trades
  const [loadingOptions, setLoadingOptions] = useState(true);

  const router = useRouter();
  // Fetch available sectors and trades
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [sectorRes, tradeRes] = await Promise.all([
          apiRequest<any, SectorModel[]>("get", "/sectors", undefined, {
            token: auth.token,
          }),
          apiRequest<any, TradeModule[]>("get", "/trades", undefined, {
            token: auth.token,
          }),
        ]);

        if (sectorRes.data)
          setSectors(sectorRes.data.filter((s) => !s.disable));
        if (tradeRes.data) setTrades(tradeRes.data.filter((t) => !t.disable));
      } finally {
        setLoadingOptions(false);
      }
    };
    fetchOptions();
  }, []);

  const form = useForm<createSchoolAcademic>({
    resolver: zodResolver(createSchoolAcademicSchema),
    defaultValues: {
      sector_ids: [],
      trade_ids: [],
    },
    mode: "onChange",
  });

  const handleSubmit = (values: createSchoolAcademic) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const apiData = {
          sector_ids: values.sector_ids?.map((item) => item.value) ?? [],
          trade_ids: values.trade_ids?.map((item) => item.value) ?? [],
        };
        const response = await apiRequest<
          typeof apiData,
          schoolAcademicResponse
        >("post", `/schools/${school._id || school.id}/academics`, apiData, {
          token: auth.token,
        });

        if (!response.data) {
          setError(response.message);
          showToast({
            title: "Error",
            description: response.message,
            type: "error",
          });
        } else {
          setSuccess("School academic created successfully!");
          showToast({
            title: "School academic has been created. 🌻",
            description: (
              <main className="flex gap-2">
                <div>
                  <span>Classes:</span>{" "}
                  <span className="font-medium">
                    {response.data.created_classes}
                  </span>
                </div>
                <div>
                  <span>Subject:</span>{" "}
                  <span className="font-medium">
                    {response.data.created_subjects}
                  </span>
                </div>
              </main>
            ),
            type: "success",
          });
          form.reset();
          router.push(`/s-t/new/${school.username}/administration`);
        }
      } catch (err) {
        setError(`Unexpected error occurred [${err}]. Please try again.`);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Select multiple sectors */}
        <FormField
          name="sector_ids"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curriculum Sectors</FormLabel>
              {loadingOptions ? (
                <div className="skeleton h-12 rounded-md" />
              ) : (
                <FormControl>
                  <MultipleSelector
                    value={field.value}
                    onChange={field.onChange}
                    defaultOptions={sectors.map((item) => ({
                      value: item.id || item._id || "",
                      label: item.name,
                      disable: item.disable || false,
                    }))}
                    placeholder="e.g REB, TVET"
                    hidePlaceholderWhenSelected
                  />
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Select multiple trades */}
        <FormField
          name="trade_ids"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Education Level / Trades</FormLabel>
              {loadingOptions ? (
                <div className="skeleton h-12 rounded-md" />
              ) : (
                <FormControl>
                  <MultipleSelector
                    value={field.value}
                    onChange={field.onChange}
                    defaultOptions={trades.map((item) => ({
                      value: item.id || item._id || "",
                      label: item.name,
                      disable: item.disable || false,
                    }))}
                    placeholder="e.g Advance Level, Primary, Software development (TVET)"
                    hidePlaceholderWhenSelected
                  />
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />
        <FormSuccess message={success} />

        {isDialog ? (
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
                Add Academic
              </Button>
            </DialogClose>
          </DialogFooter>
        ) : (
          <div>
            <Button
              type="submit"
              variant="primary"
              disabled={isPending}
              className="w-full sm:w-auto"
              library="daisy"
              role={isPending ? "loading" : undefined}
            >
              Add Academic
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default CreateSchoolAcademicForm;
