"use client";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Alert, AlertTitle } from "@/components/ui/alert";
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
import { Form } from "@/components/ui/form";
import { ClassSchema, type Class } from "@/lib/schema/class/class-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

interface ChangeClassUsernameDialogProps {
  cls?: Pick<Class, "_id" | "username">;
}

const changeClassUsernameSchema = ClassSchema.pick({
  username: true,
}).partial();

type ChangeClassUsername = z.infer<typeof changeClassUsernameSchema>;

const ChangeClassUsernameDialog = ({ cls }: ChangeClassUsernameDialogProps) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ChangeClassUsername>({
    resolver: zodResolver(changeClassUsernameSchema),
    defaultValues: {
      username: cls?.username || "",
    },
    mode: "onChange",
  });

  const onSubmit = (value: ChangeClassUsername) => {
    setError("");
    setSuccess("");
    console.log(value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} library="daisy" className="w-fit">
          Change Class Username
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Class Username</DialogTitle>
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle className=" line-clamp-none font-normal">
              When you change the class username, all people which and in class
              will get error to rich class username also link which was have
              that url of that class not work again.
            </AlertTitle>
          </Alert>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CommonFormField
              name="username"
              control={form.control}
              label="New class username"
              description="Enter a new username for your class."
              placeholder="Enter a new username"
              disabled={isPending}
            />
            <div className=" flex flex-col">
              <FormError message={error} />
              <FormSuccess message={success} />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"} library="daisy" className="w-fit">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                role={isPending ? "loading" : undefined}
                library="daisy"
                className="w-fit"
                variant="info"
              >
                Change Username
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeClassUsernameDialog;
