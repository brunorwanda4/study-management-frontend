"use client";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/lib/hooks/use-toast";
import { createClassRoomAPI } from "@/service/admin/fetchDataFn";

import {
  classRoomSchema,
  classRoomSchemaType,
} from "@/utils/schema/classRoomSchema";

import MyImage from "@/components/common/myImage";
import { ClassRoomModelNew } from "@/lib/types/classRoomModel";
import { TradeModelGet } from "@/lib/types/tradeModel";
import { ClassRoomTypeModelGet } from "@/types/classRoomTypeModel";
import { SectorModelGet } from "@/types/sectorModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";

interface props {
  classRoomTypes: ClassRoomTypeModelGet[];
  sectors: SectorModelGet[];
  trades: TradeModelGet[];
}

const CreateClassRoomDialog = ({ classRoomTypes, sectors, trades }: props) => {
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

  const form = useForm<classRoomSchemaType>({
    resolver: zodResolver(classRoomSchema),
    defaultValues: {
      name: "",
      username: "",
      description: "",
      trade: "",
      sector: "",
      class_room_type: "",
      symbol: "",
    },
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleSubmit = (values: classRoomSchemaType) => {
    setError("");
    setSuccess("");

    const validation = classRoomSchema.safeParse(values);

    if (!validation.success) {
      return setError("Invalid values Validation");
    }

    const {
      name,
      username,
      trade,
      sector,
      class_room_type,
      description,
      symbol,
    } = validation.data;

    const data: ClassRoomModelNew = {
      name,
      username,
      trade,
      sector,
      class_room_type,
      description,
      symbol,
    };

    startTransition(async () => {
      try {
        const result = await createClassRoomAPI(data);
        if ("message" in result) {
          setError(result.message);
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          });
        } else {
          setSuccess("Class Room  entry created successfully!");
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
          <BsPlus /> Add class room
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
      <DialogContent className="w-full sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Class Room </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full space-y-3"
          >
            <FormField
              control={form.control}
              name="symbol"
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
                    <span className="cursor-pointer">Education Symbol</span>
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
            <div className="w-full sm:flex sm:gap-2">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="class room name"
                        disabled={isPending}
                        type="text"
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
                  <FormItem className="w-full">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Username"
                        disabled={isPending}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* class room types */}
            <div>
              <FormField
                control={form.control}
                name="class_room_type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Class room types</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-y-1"
                      >
                        {classRoomTypes.map((item) => (
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
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex space-x-8">
              {/* class room sector */}
              <FormField
                control={form.control}
                name="sector"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Setors</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {sectors.map((item) => (
                          <FormItem
                            key={item.id}
                            className="space-y- flex items-center space-x-3"
                          >
                            <FormControl>
                              <RadioGroupItem value={item.id} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.username ? item.username : item.name}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trade"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Trades</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-3"
                      >
                        {trades.map((item) => (
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
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                  type="submit"
                  variant="info"
                  size="md"
                  className="w-full sm:w-auto"
                  disabled={isPending}
                >
                  Add Create create class
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

export default CreateClassRoomDialog;
