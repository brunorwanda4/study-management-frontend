"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { useState, useTransition } from "react";
import { FormError, FormSuccess } from "@/components/myComponents/form-message";
import {
  SendJoinSchoolRequestDto,
  sendJoinSchoolRequestSchema,
} from "@/lib/schema/school/send-join-school-request.schema";
import { UserSchool } from "@/lib/utils/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface props {
  currentSchool: UserSchool;
}

export default function SendJoinSchoolRequestForm({ currentSchool }: props) {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<SendJoinSchoolRequestDto>({
    resolver: zodResolver(sendJoinSchoolRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      schoolId: currentSchool.schoolId,
    },
  });

  function onSubmit(data: SendJoinSchoolRequestDto) {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      // const join = await JoinSchoolByUsernameAndCode(data);
      // if (join.data) {
      //   setSuccess(`To join school successfully! ☺️`);
      // } else {
      //   setError(join.message);
      // }
    });
    console.log(data);
  }

  return (
    <Form {...form}>
      <form className=" space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" bg-base-200">email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  disabled={isPending}
                  placeholder="example@email.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" bg-base-200">Name (Option)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  disabled={isPending}
                  placeholder="Bruno Happy"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" bg-base-200">
                Phone number (Option)
              </FormLabel>
              <FormControl>
                <Input
                  type="phone"
                  disabled={isPending}
                  placeholder="+251 911 234 567"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" bg-base-200">Joiner role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Joiner role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="TEACHER">Teacher</SelectItem>
                  <SelectItem value="SCHOOLSTAFF">Student staff</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <Button
          disabled={isPending}
          className=" w-full"
          variant={"info"}
          library="daisy"
          type="submit"
        >
          Send request
        </Button>
      </form>
    </Form>
  );
}
