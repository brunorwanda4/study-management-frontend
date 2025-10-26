"use client";

import UploadImage from "@/components/common/cards/form/upload-image";
import { FormError, FormSuccess } from "@/components/common/form-message";
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
import {
  type SectorModel,
  type UpdateSectorModel,
  updateSectorSchema,
} from "@/lib/schema/admin/sectorSchema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface Props {
  auth: AuthContext;
  sector: SectorModel;
}

const UpdateSectorForm = ({ auth, sector }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const form = useForm<UpdateSectorModel>({
    resolver: zodResolver(updateSectorSchema),
    defaultValues: {
      name: sector.name,
      username: sector.username,
      description: sector.description,
      logo: sector.logo,
      country: sector.country,
      type: sector.type,
      curriculum: sector.curriculum,
      disable: sector.disable,
    },
    shouldFocusError: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleSubmit = (values: UpdateSectorModel) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const request = await apiRequest<UpdateSectorModel, SectorModel>(
          "put",
          `/sectors/${sector.id || sector._id}`,
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
          setSuccess("Sector updated successfully!");
          showToast({
            title: "Sector updated",
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
          <div className="flex w-1/2 flex-col space-y-4">
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem className="row-span-3 flex flex-col space-y-2">
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <UploadImage
                      onChange={field.onChange}
                      disabled={isPending}
                      className="size-40 w-full md:mb-4"
                      Classname=" w-full min-h-44 "
                      value={field.value?.toString() ?? null}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Description"
                      disabled={isPending}
                      className="min-h-24 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="disable"
              render={({ field }) => (
                <FormItem className="flex flex-row-reverse justify-start gap-2">
                  <FormLabel>Disable</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                      placeholder="Sector name"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              name="country"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Country name"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sector Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sector type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="global">Global</SelectItem>
                      <SelectItem value="international">
                        International
                      </SelectItem>
                      <SelectItem value="local">Local</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                name="curriculum.0"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2020"
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          )
                        }
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="curriculum.1"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2025"
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          )
                        }
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

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
          >
            Update Sector{" "}
            {isPending && (
              <LoaderCircle
                className="-ms-1 me-2 animate-spin"
                size={12}
                strokeWidth={2}
              />
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpdateSectorForm;
