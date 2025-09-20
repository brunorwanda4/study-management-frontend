"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/lib/hooks/use-toast";
import {
  classRoomTypeSchema,
  classRoomTypeSchemaType,
} from "@/lib/schema/admin/classRoomTypeSchema";
import { createClassRoomTypeAPI } from "@/service/admin/fetchDataFn";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";

const CreateClassRoomTypeDialog = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<classRoomTypeSchemaType>({
    resolver: zodResolver(classRoomTypeSchema),
    defaultValues: {
      name: "",
      username: "",
      description: "",
    },
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleSubmit = (values: classRoomTypeSchemaType) => {
    setError("");
    setSuccess("");

    const validation = classRoomTypeSchema.safeParse(values);

    if (!validation.success) {
      return setError("Invalid values Validation");
    }

    startTransition(async () => {
      try {
        const result = await createClassRoomTypeAPI(validation.data);
        if ("message" in result) {
          setError(result.message);
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          });
        } else {
          setSuccess("Class Room type entry created successfully!");
          toast({
            title: "Success",
            description: `Created: ${result.name}`,
          });
          form.reset();
        }
      } catch (err) {
        setError(`Unexpected error occurred [${err}]. Please try again.`);
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="info" size="sm" library="daisy">
          <BsPlus /> Add class room type
          {isPending && (
            <LoaderCircle
              className="-ms-1 me-2 animate-spin"
              size={12}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Class Room type</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-3"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Education name"
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
                      placeholder="Username"
                      disabled={isPending}
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
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <div>
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>
            </div>
            <DialogFooter className="px-6 pb-6 sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  library="daisy"
                  type="submit"
                  variant="info"
                  size="md"
                  className="w-full sm:w-auto"
                  disabled={isPending}
                >
                  Add create class room type
                  {isPending && (
                    <LoaderCircle
                      className="-ms-1 me-2 animate-spin"
                      size={12}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  )}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassRoomTypeDialog;
