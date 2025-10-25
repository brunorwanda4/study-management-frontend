"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
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
import { SchoolStaffTypes } from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import {
  BulkCreateJoinSchoolRequest,
  BulkCreateJoinSchoolRequestSchema,
} from "@/lib/schema/school/school-join-school/create-join-school-request-schema";
import { JoinSchoolRequest } from "@/lib/schema/school/school-join-school/join-school-request-schema";
import { School } from "@/lib/schema/school/school-schema";
import { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface Props {
  auth: AuthContext;
  school: School;
}

export default function JoinSchoolRequestsForm({ auth, school }: Props) {
  const [staffTypes, setStaffTypes] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const router = useRouter();

  const form = useForm<BulkCreateJoinSchoolRequest>({
    resolver: zodResolver(BulkCreateJoinSchoolRequestSchema),
    defaultValues: {
      requests: [
        {
          sent_by: auth.user.id ?? "",
          email: auth.user.email ?? "",
          role: "Staff",
          school_id: school?.id ?? school?._id ?? "",
          message: "",
          type: "Director",
        },
      ],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "requests",
  });

  const countType = (type: string) =>
    staffTypes.filter((t) => t === type).length;

  const handleAdd = () => {
    append({
      sent_by: auth.user.id ?? "",
      email: "",
      role: "Staff",
      school_id: school?.id ?? school?._id ?? "",
      message: "",
      type: "",
    });
  };

  const handleTypeChange = (index: number, newType: string) => {
    const currentType = form.getValues(`requests.${index}.type`);

    // Adjust current counts when changing/removing a type
    setStaffTypes((prev) => {
      const updated = [...prev];
      if (currentType) {
        const idx = updated.indexOf(currentType);
        if (idx !== -1) updated.splice(idx, 1);
      }

      // Check limits
      if (newType === "Director" && countType("Director") >= 1) {
        showToast({
          title: "Only one Director is allowed!",
          type: "warning",
        });
        return updated; // Don't add new type
      }

      if (newType === "HeadOfStudies" && countType("HeadOfStudies") >= 5) {
        showToast({
          title: "Maximum of 5 HeadOfStudies allowed!",
          type: "warning",
        });
        return updated; // Don't add new type
      }

      // Add new type
      if (newType) updated.push(newType);
      return updated;
    });

    // Update form field
    form.setValue(`requests.${index}.type`, newType);
  };

  const handleRemove = (index: number) => {
    const removedType = form.getValues(`requests.${index}.type`);
    remove(index);

    // Decrease the count when removing
    if (removedType) {
      setStaffTypes((prev) => {
        const updated = [...prev];
        const idx = updated.indexOf(removedType);
        if (idx !== -1) updated.splice(idx, 1);
        return updated;
      });
    }
  };

  const onSubmit = (values: BulkCreateJoinSchoolRequest) => {
    setError("");
    setSuccess("");
    console.log("😥😥", values);
    startTransition(async () => {
      try {
        const request = await apiRequest<
          BulkCreateJoinSchoolRequest,
          JoinSchoolRequest[]
        >("post", "/join-school-requests/bulk", values, {
          token: auth.token,
          schoolToken: auth.schoolToken,
        });

        if (!request.data) {
          setError(request.message);
          showToast({
            title: "Error",
            description: request.message,
            type: "error",
          });
        } else {
          setSuccess("Join school request sended successfully!");
          showToast({
            title: "Join school request sended",
            description: `Send  ${request.data.length}`,
            type: "success",
          });
          form.reset();
          router.push("/s-t");
        }
      } catch (err) {
        setError(`Unexpected error occurred [${err}]. Please try again.`);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field, index) => {
          const role = form.watch(`requests.${index}.role`);

          return (
            <div
              key={field.id}
              className="relative space-y-4 rounded-xl border p-4 shadow-sm"
            >
              {/* Remove button */}
              <div className="absolute top-0 right-3">
                {fields.length > 1 && (
                  <Button
                    type="button"
                    library="daisy"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(index)}
                    disabled={isPending}
                  >
                    <Trash className="text-error h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* email */}
              <FormField
                control={form.control}
                name={`requests.${index}.email`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="email"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* staff sub-type (only if Staff) */}
              {role === "Staff" && (
                <FormField
                  control={form.control}
                  name={`requests.${index}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Staff Type</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={(val) => handleTypeChange(index, val)}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose staff type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SchoolStaffTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* optional message */}
              <FormField
                control={form.control}
                name={`requests.${index}.message`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder="Optional message"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        })}

        {/* Add new request */}
        <div className="flex flex-col gap-2">
          <Button
            disabled={isPending}
            type="button"
            variant="outline"
            onClick={handleAdd}
            role="create"
            library="daisy"
            className="w-fit"
          >
            Add Another Request
          </Button>

          {error ||
            (success && (
              <div>
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>
            ))}
        </div>

        <Button
          library="daisy"
          disabled={isPending}
          type="submit"
          className="w-full"
          variant="primary"
          role={isPending ? "loading" : undefined}
        >
          Submit All Join Requests
        </Button>
      </form>
    </Form>
  );
}
