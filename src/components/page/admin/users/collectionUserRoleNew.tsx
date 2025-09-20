"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { toast } from "@/lib/hooks/use-toast";
import {
  userRoleSchema,
  userRoleSchemeType,
} from "@/lib/schema/admin/user-schema";
import { createUserRole } from "@/service/admin/fetchDataFn";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";

const CollectionUserRoleNew = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<userRoleSchemeType>({
    resolver: zodResolver(userRoleSchema),
    defaultValues: {
      role: "",
    },
  });

  const handleSubmit = (values: userRoleSchemeType) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await createUserRole(values);

      if ("message" in result) {
        setError(result.message);
        toast({
          title: "Uh oh! Something went wrong.",
          description: result.message,
          variant: "destructive",
        });
      } else {
        // It's a success
        setSuccess("User role created successfully!");
        toast({
          title: "User role created successfully",
          description: `Role: ${result.role}`,
        });
        form.reset(); // Clear the form after success
      }
    });
  };

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button disabled={isPending} variant="info" size="sm" library="daisy">
          <BsPlus /> Add User Role{" "}
          {isPending && (
            <LoaderCircle
              className="-ms-1 me-2 animate-spin"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}
        </Button>
      </DialogTrigger>
      {/* Dialog Content */}
      <DialogContent className="happy-card">
        <DialogHeader>
          <DialogTitle>Create a New User Role</DialogTitle>
          <DialogDescription>
            Add a new user role where users must choose their roles!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">New role</FormLabel>
                  <FormControl>
                    <Input
                      id="role"
                      {...field}
                      className="w-full"
                      placeholder="User"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2">
              <div>
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <DialogClose disabled={isPending} className="btn btn-sm">
                Cancel
              </DialogClose>
              <Button
                library="daisy"
                disabled={isPending}
                variant="info"
                size="sm"
                type="submit"
              >
                Confirm
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionUserRoleNew;
