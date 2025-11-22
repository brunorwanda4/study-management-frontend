"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  type Announcement,
  announcementSchema,
} from "@/lib/schema/announcement-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import MessageInput from "./message-input/message-input";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import SignToInput from "./sign-to-input";

const AnnouncementForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<Announcement>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      content: "",
      mention: [],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const onSubmit = (data: Announcement) => {
    startTransition(() => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
        <FormField
          control={form.control}
          name="mention"
          render={({ field }) => (
            <FormItem className=" space-y-2">
              <FormLabel>Announcement</FormLabel>
              <FormControl>
                <SignToInput
                  title="Announce to"
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
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className=" space-y-2">
              <FormLabel>Announcement</FormLabel>
              <FormControl>
                <MessageInput
                  disabled={isPending}
                  enabledTools={["emoji", "files", "metion", "toolbar"]}
                  onChange={field.onChange}
                  value={field.value}
                  placeholder=" Add announcement..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant={"outline"}
              size={"sm"}
              library="daisy"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant="info"
              disabled={isPending}
              className="w-full sm:w-auto"
              role={isPending ? "loading" : undefined}
              size={"sm"}
              library="daisy"
            >
              Add announcement
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AnnouncementForm;
