"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormError, FormSuccess } from "@/components/common/form-message";
import MyImage from "@/components/common/myImage";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/lib/hooks/use-toast";
import { classSchema, classSchemaType } from "@/lib/schema/admin/classSchema";
import { ClassModelGet, ClassModelPut } from "@/lib/types/classModel";
import { ClassRoomModelGet } from "@/lib/types/classRoomModel";
import { ClassTypeModelGet } from "@/lib/types/classTypeModel";
import { EducationModelGet } from "@/lib/types/educationModel";
import { SectorModelGet } from "@/lib/types/sectorModel";
import { TradeModelGet } from "@/lib/types/tradeModel";
import {
  fetchAllClassRoomBySectorAPI,
  fetchAllClassRoomByTradeAPI,
  fetchAllSectorByEducation,
  getAllTradeABySectorPI,
  updateClassAPI,
} from "@/service/admin/fetchDataFn";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface props {
  educations: EducationModelGet[];
  classTypes: ClassTypeModelGet[];
  classModel: ClassModelGet;
}

const UpdateClassForm = ({ educations, classTypes, classModel }: props) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const [education, setEducation] = useState<string | null>(null);
  const [sectors, setSectors] = useState<SectorModelGet[] | null>(null);
  const [trades, setTrades] = useState<TradeModelGet[] | null>(null);
  const [classRoom, setClassRoom] = useState<ClassRoomModelGet[] | null>(null);

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

  const form = useForm<classSchemaType>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: classModel.name ? classModel.name : "",
      username: classModel.username ? classModel.username : "",
      description: classModel.description ? classModel.description : "",
      education: "",
      is_public: "",
      sector: classModel.sector ? classModel.sector : "",
      trade: classModel.trade ? classModel.trade : "",
      class_room: classModel.class_room ? classModel.class_room : "",
      class_teacher: classModel.class_teacher ? classModel.class_teacher : "",
      image: classModel.image ? classModel.image : "",
      class_type: classModel.class_type ? classModel.class_type : "",
    },
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleSectors = async (id: string) => {
    setSectors(null);
    setTrades(null);
    setClassRoom(null);
    const get = await fetchAllSectorByEducation(id);
    if ("message" in get) {
      setSectors(null);
      return;
    }
    if (get.length == 0) {
      setSectors(null);
    }
    setSectors(get);
    return;
  };

  const handleTrades = async (id: string) => {
    setTrades(null);
    setClassRoom(null);
    const get = await getAllTradeABySectorPI(id);
    if ("message" in get) {
      setTrades(null);
      return handleClassRoomBySector(id);
    }
    if (get.length == 0) {
      setTrades(null);
      return handleClassRoomBySector(id);
    }
    return setTrades(get);
  };

  const handleClassRoomBySector = async (id: string) => {
    setClassRoom(null);
    const get = await fetchAllClassRoomBySectorAPI(id);
    if ("message" in get) return setClassRoom(null);
    if (get.length == 0) return setClassRoom(null);
    return setClassRoom(get);
  };

  const handleClassRoom = async (id: string) => {
    setClassRoom(null);
    const get = await fetchAllClassRoomByTradeAPI(id);
    if ("message" in get) {
      return setClassRoom(null);
    }
    if (get.length == 0) return setClassRoom(null);
    return setClassRoom(get);
  };

  const handleSubmit = (values: classSchemaType) => {
    setError("");
    setSuccess("");

    const validation = classSchema.safeParse(values);

    if (!validation.success) {
      return setError("Invalid Register Validation");
    }

    const {
      name,
      username,
      sector,
      trade,
      description,
      is_public,
      image,
      class_room,
      class_teacher,
      class_type,
    } = validation.data;

    const data: ClassModelPut = {
      name,
      username,
      sector,
      trade,
      description,
      is_public: is_public ? true : false,
      image,
      class_room,
      class_type,
      class_teacher,
    };

    startTransition(async () => {
      try {
        const result = await updateClassAPI(data, classModel.id);
        if ("message" in result) {
          setError(result.message);
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          });
        } else {
          setSuccess("Class type entry created successfully!");
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="happy-card space-y-3 p-8"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel htmlFor="image" className="flex items-center gap-3">
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
        <div className="flex space-x-2 sm:flex-row">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Education name"
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>Class name which for class</FormDescription>
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
                  />
                </FormControl>
                <FormDescription>Class username</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* teacher and class type */}
        <div className="flex space-x-2 sm:flex-row">
          <FormField
            name="class_teacher"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Class teacher</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Education name"
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>Class teacher for class</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="class_type"
            render={({ field }) => (
              <FormItem className="w-full space-y-3">
                <FormLabel>Class type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-2"
                  >
                    {classTypes.map((item) => (
                      <FormItem
                        key={item.id}
                        className="items-center space-x-3"
                      >
                        <FormControl>
                          <RadioGroupItem value={item.id} />
                        </FormControl>
                        <FormLabel className="font-normal capitalize">
                          {item.username ? item.username : item.name}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormDescription>choose class type</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* education and sector*/}
        <div className="sm:flex sm:gap-2">
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Education <span className="text-myGray">(Option)</span>
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setEducation(value);
                    handleSectors(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="education" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {educations.map((item) => {
                      return (
                        <SelectItem key={item.id} value={item.id}>
                          {item.username ? item.username : item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  select education which of class
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Sector <span className="text-myGray">(Option)</span>
                </FormLabel>
                <Select
                  disabled={!education}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setEducation(value);
                    handleTrades(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sector" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sectors &&
                      sectors.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id}>
                            {item.username ? item.username : item.name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* trades and class room */}
        <div className="sm:flex sm:gap-2">
          <FormField
            control={form.control}
            name="trade"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Trades <span className="text-myGray">(Option)</span>
                </FormLabel>
                <Select
                  disabled={!trades}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setEducation(value);
                    handleClassRoom(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="education" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {trades &&
                      trades.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id}>
                            {item.username ? item.username : item.name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  select education which of class
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="class_room"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Class room <span className="text-myGray">(Option)</span>
                </FormLabel>
                <Select
                  disabled={!classRoom}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class room" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {classRoom &&
                      classRoom.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id}>
                            {item.username ? item.username : item.name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your{" "}
                </FormDescription>
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
              <FormDescription>Description of your class</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="is_public"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-x-3">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormLabel>Is public</FormLabel>
              <FormDescription>Class is public </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <div className="">
          <Button
            library="daisy"
            type="submit"
            variant="info"
            size="md"
            className="w-full"
            disabled={isPending}
          >
            Update class
            {isPending && (
              <LoaderCircle
                className="-ms-1 me-2 animate-spin"
                size={12}
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateClassForm;
