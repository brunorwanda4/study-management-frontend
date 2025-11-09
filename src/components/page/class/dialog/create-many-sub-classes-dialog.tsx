"use client";
import { FormError, FormSuccess } from "@/components/common/form-message";
import SelectWithSearch from "@/components/common/select-with-search";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/lib/context/toast/ToastContext";
import {
  CreateManSubClassesSchema,
  type Class,
  type CreateManSubClasses,
} from "@/lib/schema/class/class-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface Props {
  auth: AuthContext;
  cls?: Class;
  name?: string;
  title?: string;
}

const CreateManySubClasses = ({ auth, cls, name, title }: Props) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loadingclass, setLoadingclass] = useState(true);

  const { showToast } = useToast();

  useEffect(() => {
    const loadTrades = async () => {
      try {
        if (cls) {
          setClasses([]);
          return;
        }

        const res = await apiRequest<void, Class[]>(
          "get",
          "/school/classes",
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
          },
        );

        if (res.data) {
          setClasses(res.data);
        }
      } finally {
        setLoadingclass(false);
      }
    };

    loadTrades();
  }, [auth.token, cls]);

  const form = useForm<CreateManSubClasses>({
    resolver: zodResolver(CreateManSubClassesSchema),
    defaultValues: {
      class_id: cls ? cls._id || cls.id || "" : "",
      count: "2",
    },
    mode: "onChange",
  });

  const handleSubmit = (values: CreateManSubClasses) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(async () => {
      try {
        const response = await apiRequest<typeof values, Class[]>(
          "post",
          `/school/classes/${values.class_id}/subclasses/count/${values.count}`,
          undefined,
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

        const message = `${response.data.length} sub classes created`;
        setSuccess(message);

        showToast({
          title: "Sub classes created",
          description: message,
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={name ? "ghost" : "secondary"}
          role={name ? undefined : "create"}
          size={"xs"}
          library="daisy"
        >
          {name ?? "Add sub class"}
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title ?? "Create sub classes"}</DialogTitle>
        </DialogHeader>
        <main>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {!cls && (
                <FormField
                  control={form.control}
                  name="class_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Classes </FormLabel>
                      <FormControl>
                        <SelectWithSearch
                          options={classes.map((t) => ({
                            value: String(t.id ?? t._id),
                            label: t.name,
                            disable: t.is_active,
                          }))}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          placeholder={
                            loadingclass ? "Loading trades..." : "Select class"
                          }
                          disabled={isPending || loadingclass}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>number of sub classes </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="number of sub classes"
                        type="number"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ---------- Messages ---------- */}
              <FormError message={error} />
              <FormSuccess message={success} />

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
        </main>
      </DialogContent>
    </Dialog>
  );
};

export default CreateManySubClasses;
