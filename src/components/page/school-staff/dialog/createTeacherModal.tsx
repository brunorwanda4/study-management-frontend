// src/components/page/school-staff/dialog/CreateStudentModal.tsx
"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ViewDataClassDto } from "@/lib/schema/class/view-data-class.dto"; // Needed for class dropdown
import {
  SendJoinSchoolRequestDto,
  sendJoinSchoolRequestSchema,
} from "@/lib/schema/school/school-join-school/send-join-school-request.schema";
import {
  ClassCombobox,
  ComboboxItem,
} from "@/components/table/school/class-combobox";
import { CreateSchoolJoinRequest } from "@/service/school/school-join-request.service";
import { Plus, UsersIcon } from "lucide-react";
import { FormError, FormSuccess } from "@/components/myComponents/form-message";

interface CreateStudentModalProps {
  schoolId: string;
  Classes: ViewDataClassDto[];
}

export function SendTeacherRequestToJoinSchool({
  Classes,
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
          }! ☺️`
        );
        form.reset(); // Reset the entire form on success
      } else {
        setError(
          sendRequest.message || "An error occurred while sending the request."
        );
      }
    });
  }

  const classItems: ComboboxItem[] = Classes.map((classItem) => ({
    value: classItem.id,
    label: classItem.name,
    icon: UsersIcon,
    number: classItem._count.students,
  }));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button library="daisy" variant={"info"} size={"sm"}>
          <Plus /> New Teacher
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Teacher</DialogTitle>
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
