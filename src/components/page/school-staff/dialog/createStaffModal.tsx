// src/components/page/school-staff/dialog/CreateStudentModal.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import {
  SendJoinSchoolRequestDto,
  sendJoinSchoolRequestSchema,
} from "@/lib/schema/school/school-join-school/send-join-school-request.schema";
import { CreateSchoolJoinRequest } from "@/service/school/school-join-request.service";
import { Plus } from "lucide-react";

interface CreateStudentModalProps {
  schoolId: string;
}

export function SendStaffRequestToJoinSchool({
  schoolId,
}: CreateStudentModalProps) {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<SendJoinSchoolRequestDto>({
    resolver: zodResolver(sendJoinSchoolRequestSchema),
    defaultValues: {
      email: "",
      classId: "",
      schoolId: schoolId,
      role: "TEACHER",
    },
  });

  function onSubmit(data: SendJoinSchoolRequestDto) {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const sendRequest = await CreateSchoolJoinRequest(data);
      if (sendRequest.data) {
        setSuccess(
          `Request sent successfully ${
            sendRequest.data.name ? `"for"${sendRequest.data.name}` : " "
          }! ☺️`,
        );
        form.reset(); // Reset the entire form on success
      } else {
        setError(
          sendRequest.message || "An error occurred while sending the request.",
        );
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button library="daisy" variant={"info"} size={"sm"}>
          <Plus /> New Staff
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Staff</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="teacher@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className=" ">
              <FormError message={error} />
              <FormSuccess message={success} />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button library="daisy" type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                library="daisy"
                variant={"info"}
                type="submit"
                disabled={isPending}
              >
                {!isPending ? "Add new teacher" : "Sending request..."}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
