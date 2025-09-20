"use client";

import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/lib/hooks/use-toast";
import { tradeSchema, tradeSchemaType } from "@/lib/schema/admin/tradeSchema";
import { SectorModelGet } from "@/lib/types/sectorModel";
// import { cn } from "@/lib/utils";
import { TradeModelGet, TradeModelPut } from "@/lib/types/tradeModel";
import { updateTradeAPI } from "@/service/admin/fetchDataFn";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface props {
  sectors: SectorModelGet[];
  trade: TradeModelGet;
}

const UpdateTradeDialog = ({ sectors, trade }: props) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    setError("");
    e.preventDefault();

    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      if (!file.type.includes("image")) {
        return setError("Please select an image file.");
      }

      if (file.size > 2 * 1024 * 1024) {
        return setError("Image size exceeds 2MB.");
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataUrl = event.target?.result as string;
        fieldChange(imageDataUrl);
      };
      reader.onerror = () => setError("Failed to read image file.");
      reader.readAsDataURL(file);
    }
  };

  const form = useForm<tradeSchemaType>({
    resolver: zodResolver(tradeSchema),
    defaultValues: {
      name: trade.name ? trade.name : "",
      username: trade.username ? trade.username : "",
      sector: trade.sector ? trade.sector : "",
      description: trade.description ? trade.description : "",
      logo: "",
      class_rooms: trade.class_rooms ? trade.class_rooms.toString() : undefined,
    },
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleSubmit = (values: tradeSchemaType) => {
    setError("");
    setSuccess("");

    const validation = tradeSchema.safeParse(values);

    if (!validation.success) {
      return setError("Invalid Register Validation");
    }

    const { name, username, description, class_rooms, sector } =
      validation.data;

    const data: TradeModelPut = {
      name,
      username,
      class_rooms: Number(class_rooms),
      sector,
      description,
    };

    startTransition(async () => {
      try {
        const result = await updateTradeAPI(data, trade.id);
        if ("message" in result) {
          setError(result.message);
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          });
        } else {
          setSuccess("Trade entry update successfully!");
          toast({
            title: "Success",
            description: `update: ${result.name}`,
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
        <Button variant="warning" size="xs" library="daisy">
          update
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
          <DialogTitle>Add New Sector</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel
                    htmlFor="image"
                    className="flex items-center gap-3"
                  >
                    <MyImage
                      src={field.value || "/default.jpg"}
                      className="size-24 min-h-24 min-w-24 rounded-full"
                      alt="Profile"
                    />
                    <span className="cursor-pointer">Sector Symbol</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      id="image"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="class_rooms"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class rooms</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="number of class rooms"
                      disabled={isPending}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sector"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Sector</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {sectors.map((item) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex items-center space-y-0 space-x-3"
                          >
                            <FormControl>
                              <RadioGroupItem value={item.id} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.username ? item.username : item.name}
                            </FormLabel>
                          </FormItem>
                        );
                      })}
                    </RadioGroup>
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
            <DialogFooter className="">
              <Button
                type="submit"
                variant="info"
                size="sm"
                className="w-full sm:w-auto"
                disabled={isPending}
              >
                Update Trade{" "}
                {isPending && (
                  <LoaderCircle
                    className="-ms-1 me-2 animate-spin"
                    size={12}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTradeDialog;
