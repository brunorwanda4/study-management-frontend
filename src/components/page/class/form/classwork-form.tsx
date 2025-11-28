"use client";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import SignToInput from "@/components/common/form/sign-to-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ClassworkTypes } from "@/lib/const/common-details-const";
import {
  type ClassWork,
  ClassWorkSchema,
} from "@/lib/schema/class/classwork-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { IoIosLink } from "react-icons/io";
import { LuUpload } from "react-icons/lu";

function ClassWorkForm() {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ClassWork>({
    resolver: zodResolver(ClassWorkSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "Exercise",
      points: 50,
      mention: [],
      allow_close_submissions: true,
    },
    mode: "onChange",
  });

  const onSubmit = (data: ClassWork) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      // submit logic here
      console.log(data);
    });
  };

  const fakeUses = () => {
    return [...Array(10).keys()].map((i) => ({
      id: `user${i}`,
      name: `User ${i}`,
      image: "/images/3.jpg",
      email: `user${i}@example.com`,
      gender: "MALE",
      username: `user${i}`,
    }));
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className=" flex flex-row gap-4">
          <div className=" flex flex-col gap-4 w-1/2">
            <CommonFormField
              label="Title"
              name="title"
              type="text"
              fieldType="input"
              placeholder="Title..."
              required
              control={form.control}
            />
            <CommonFormField
              label="Description"
              name="description"
              type="text"
              fieldType="textarea"
              placeholder="Description..."
              control={form.control}
            />
            <CommonFormField
              label="Class work Type"
              name="type"
              type="text"
              fieldType="select"
              required
              placeholder="Select type"
              control={form.control}
              selectOptions={ClassworkTypes.map((t) => ({
                label: t,
                value: t,
              }))}
            />
            <div className=" card w-full space-y-2">
              <Label>Attachment</Label>
              <div className=" flex items-center flex-row gap-2 ">
                <Button
                  title="Upload file"
                  library="daisy"
                  variant={"outline"}
                  type="button"
                >
                  <LuUpload />
                </Button>
                <Button
                  title="Add Link"
                  library="daisy"
                  variant={"outline"}
                  type="button"
                >
                  <IoIosLink />
                </Button>
              </div>
            </div>
          </div>
          <div className=" w-1/2 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="mention"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Assign to</FormLabel>
                  <FormControl>
                    <SignToInput
                      title="Assign to"
                      disabled={isPending}
                      name="All students"
                      onChange={field.onChange}
                      users={fakeUses()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CommonFormField
              label="Points"
              name="points"
              type="number"
              fieldType="input"
              placeholder="eg: 50"
              inputProps={{
                numberMode: "percent",
              }}
              required
              control={form.control}
            />
            <CommonFormField
              label="Due"
              name="due_date"
              type="number"
              fieldType="date"
              placeholder="eg: 50"
              inputProps={{
                numberMode: "percent",
              }}
              required
              control={form.control}
              dateProps={{ inputType: "date-time" }}
            />
            <CommonFormField
              label="All student can submit after due date"
              name="allow_close_submissions"
              fieldType="checkbox"
              placeholder="Description..."
              control={form.control}
            />
            <CommonFormField
              label="Topic"
              name="topic_id"
              fieldType="select"
              required
              placeholder="Select topic"
              control={form.control}
              selectOptions={ClassworkTypes.map((t) => ({
                label: t,
                value: t,
              }))}
            />
          </div>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
      </form>
    </Form>
  );
}

export default ClassWorkForm;
