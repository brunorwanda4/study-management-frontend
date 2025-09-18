"use client";

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
import { UserRoleModel } from "@/lib/types/userModel";
import { updateUserRole } from "@/service/admin/fetchDataFn";
import { userRoleSchema, userRoleSchemeType } from "@/utils/schema/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";

import { useForm } from "react-hook-form";

interface props {
  userRole: UserRoleModel;
}

const UpdateUserRoleDialog = ({ userRole }: props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<userRoleSchemeType>({
    resolver: zodResolver(userRoleSchema),
    defaultValues: {
      role: userRole.role ? userRole.role : "",
    },
  });

  const handleSubmit = (values: userRoleSchemeType) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await updateUserRole(values, userRole.role);

      if ("message" in result) {
        setError(result.message);
        toast({
          title: "Uh oh! Something went wrong.",
          description: result.message,
          variant: "destructive",
        });
      } else {
        // It's a success
        setSuccess("User role update successfully!");
        toast({
          title: "User role update successfully",
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
        <Button disabled={isPending} variant="warning" size="xs">
          update
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
          <DialogTitle>Update User Role</DialogTitle>
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

export default UpdateUserRoleDialog;
