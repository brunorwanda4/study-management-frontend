"use client";
import {
  updateUserPassword,
  updateUserPasswordType,
} from "@/utils/schema/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/form/formError";
import { Button } from "@/components/ui/button";
import { LockKeyholeIcon, LockKeyholeOpen } from "lucide-react";

const UpdateUserPasswordForm = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [
    isPending,
    //  startTransition
    ] = useTransition();
  const form = useForm<updateUserPasswordType>({
    resolver: zodResolver(updateUserPassword),
    defaultValues: {
      password: "",
      currentPassword: ""
    },
  });
  const handleSubmit = (values: updateUserPasswordType) => {
    setError("");
    setSuccess("");

    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className=" flex flex-col">
        <div className=" flex flex-col space-y-4">
          <FormField
            name="currentPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" w-80">
                <FormLabel>Current password</FormLabel>
                <FormControl>
                  <div className=" flex space-x-2 items-center">
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending}
                        className="peer ps-9 w-80"
                        placeholder="Old password"
                        type="password"
                      />
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3  /80 peer-disabled:opacity-50">
                        <LockKeyholeOpen
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                 Your old password you was using to login
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" w-80">
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <div className=" flex space-x-2 items-center">
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending}
                        className="peer ps-9 w-80"
                        placeholder="new password"
                        type="password"
                      />
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3  /80 peer-disabled:opacity-50">
                        <LockKeyholeIcon
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                 Your new password you will be used to login
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormMessageError message={error} />
            <FormMessageSuccess message={success} />
          </div>
        </div>
        <Button variant="info" size="sm" className=" w-40">
          Change Password
        </Button>
      </form>
    </Form>
  );
};

export default UpdateUserPasswordForm;
