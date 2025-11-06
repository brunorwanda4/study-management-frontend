"use client";

import type { Locale } from "@/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as RPNInput from "react-phone-number-input";

// Import Shadcn UI Components
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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Import Custom Components
import UploadImage from "@/components/common/cards/form/upload-image";
import { FormError, FormSuccess } from "@/components/common/form-message";
import AddressInput from "@/components/common/form/address-input";
import {
  CountrySelect,
  FlagComponent,
  PhoneInput,
} from "@/components/common/form/phone-input";
import MyImage from "@/components/common/myImage";
import {
  AffiliationTypes,
  AttendanceSystems,
  schoolMembers,
  schoolTypes,
} from "@/lib/const/common-details-const";
import {
  schoolLabs,
  SchoolSportsExtracurricular,
} from "@/lib/context/school.context";
import { useToast } from "@/lib/context/toast/ToastContext";
import {
  type CreateSchool,
  CreateSchoolSchema,
} from "@/lib/schema/school/create-school-schema";
import { type AuthContext, setAuthCookies } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useRouter } from "next/navigation";
import MultipleSelector from "../../../ui/multiselect";

interface Props {
  lang: Locale;
  auth: AuthContext;
}

const CreateSchoolForm = ({ lang, auth }: Props) => {
  const [error, setError] = useState<string | null | undefined>("");
  const [success, setSuccess] = useState<string | null | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { theme } = useTheme();
  const router = useRouter();
  const { showToast } = useToast();

  // Local state for sectors & trades
  // const [sectors, setSectors] = useState<SectorModel[]>([]);
  // const [trades, setTrades] = useState<TradeModule[]>([]);
  // const [loadingOptions, setLoadingOptions] = useState(true);

  // useEffect(() => {
  //   const fetchOptions = async () => {
  //     try {
  //       const [sectorsRes, tradesRes] = await Promise.all([
  //         apiRequest<void, SectorModel[]>("get", "/sectors", undefined, {
  //           token: auth.token,
  //         }),
  //         apiRequest<void, TradeModule[]>("get", "/trades", undefined, {
  //           token: auth.token,
  //         }),
  //       ]);

  //       if (sectorsRes.data) {
  //         const activeSectors = sectorsRes.data.filter((s) => !s.disable);
  //         setSectors(activeSectors);
  //       }

  //       if (tradesRes.data) {
  //         const filteredTrades = tradesRes.data.filter(
  //           (t) => !t.disable && !t.trade_id,
  //         );
  //         setTrades(filteredTrades);
  //       }
  //     } finally {
  //       setLoadingOptions(false);
  //     }
  //   };

  //   fetchOptions();
  // }, [auth.token]);

  const form = useForm<CreateSchool>({
    resolver: zodResolver(CreateSchoolSchema),
    defaultValues: {
      // Core
      username: "",
      name: "",

      // Optional visuals and metadata
      logo: undefined,
      description: "",

      // Categorical fields
      school_type: undefined,
      // curriculum: undefined,
      // education_level: undefined,
      accreditation_number: "",
      affiliation: undefined,
      school_members: "Mixed",

      // Location and contact
      address: {
        street: "",
        city: "",
        state: "",
        postal_code: "",
        country: "Rwanda",
        google_map_url: undefined,
      },
      contact: {
        phone: "",
        email: "",
      },
      website: undefined,
      social_media: [],

      // Academic and administrative characteristics
      student_capacity: undefined,
      uniform_required: true,
      attendance_system: "Online",
      scholarship_available: false,

      // Facilities
      classrooms: undefined,
      library: true,
      labs: [],
      sports_extracurricular: [],
      online_classes: true,
    },
    mode: "onChange",
  });

  const onSubmit = (values: CreateSchool) => {
    setSuccess(null);
    setError(null);
    startTransition(async () => {
      const apiData = {
        ...values,
        sports_extracurricular:
          values.sports_extracurricular?.map((sport) => sport.value) ?? [],
        labs: values.labs?.map((lab) => lab.value) ?? [],
        creator_id: auth.user.id,
      };
      const create = await apiRequest<typeof apiData, any>(
        "post",
        "/schools",
        apiData,
        { token: auth.token },
      );

      if (!create?.data) {
        create?.message;
        showToast({
          type: "error",
          title: "Something went wrong to create school",
          description: create.message,
        });
        setError(`message : ${create.message}`);
      } else {
        setSuccess("School is registered successful ☺️");
        showToast({
          type: "success",
          title: (
            <div className="flex space-x-2">
              <MyImage src={"/logo.png"} className="size-10" priority />
              <h3>space-together</h3>
            </div>
          ),
          description: (
            <div className="flex flex-col">
              <div className="flex gap-2">
                {create.data.logo && (
                  <MyImage
                    src={create.data.logo}
                    role="ICON"
                    priority
                    loading="lazy"
                  />
                )}
                <h3 className="text-lg">{create.data.name}</h3>
              </div>
              <p> Has been created successful 🌻</p>
            </div>
          ),
        });
        setAuthCookies(auth.token, auth.user.id, create.data.token);
        router.push(`/${lang}/s-t/new/${create.data.username}/academic`);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="basic-card space-y-6 shadow-sm"
      >
        {/* Section: Basic Info */}
        <div className="">
          <h3 className="mb-4 text-lg font-medium">Basic Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* School Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="h-fit">
                  <FormLabel>School Name *</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      placeholder="e.g., Green Hills Academy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* School Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Username *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., greenhills" {...field} />
                  </FormControl>
                  <FormDescription>
                    Unique identifier for the school.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* School Type */}
            <FormField
              control={form.control}
              name="school_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select school type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme}>
                      {schoolTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>School type of your school</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* School Members */}
            <FormField
              control={form.control}
              name="school_members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme}>
                      {schoolMembers.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Student gender school receive
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Logo Upload */}
          <FormField
            name="logo"
            control={form.control}
            render={({ field }) => (
              <FormItem className="row-span-3 mt-2 flex flex-col space-y-2">
                <FormLabel>School Logo</FormLabel>
                <FormControl>
                  <UploadImage
                    onChange={field.onChange}
                    disabled={isPending}
                    value={field.value?.toString() ?? null}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about the school"
                    className="min-h-[100px] resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section: Academic Details */}
        <div className="">
          <h3 className="mb-4 text-lg font-medium">Academic Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Curriculum */}
            {/* <FormField
              control={form.control}
              name="curriculum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curriculum</FormLabel>
                  {loadingOptions ? (
                    <div className="skeleton h-12 rounded-md" />
                  ) : (
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={sectors.map((sector) => ({
                          value: sector.id || sector._id || "",
                          label: sector.name,
                          disable: sector.disable || false,
                        }))}
                        placeholder={
                          loadingOptions
                            ? "loading curriculum..."
                            : "e.g., REB, TVET"
                        }
                        hidePlaceholderWhenSelected
                        disabled={isPending || loadingOptions}
                      />
                    </FormControl>
                  )}
                  <FormDescription>
                    Enter one or more curricula, separated by commas.{" "}
                    {sectors.length}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* Education Level */}
            {/* <FormField
              control={form.control}
              name="education_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Levels Offered</FormLabel>
                  {loadingOptions ? (
                    <div className="skeleton h-12 rounded-md" />
                  ) : (
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={trades.map((trade) => ({
                          value: trade.id || trade._id || "",
                          label: trade.name,
                          disable: trade.disable || false,
                        }))}
                        placeholder={
                          loadingOptions
                            ? "Loading educationLevel"
                            : "e.g., Primary, Ordinary Level"
                        }
                        hidePlaceholderWhenSelected
                        disabled={isPending || loadingOptions}
                      />
                    </FormControl>
                  )}
                  <FormDescription>
                    Enter levels, separated by commas. {trades.length}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* Accreditation Number */}
            <FormField
              control={form.control}
              name="accreditation_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accreditation Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Optional accreditation number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Affiliation */}
            <FormField
              control={form.control}
              name="affiliation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Affiliation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select school affiliation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme}>
                      {AffiliationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section: Contact & Location */}
        <div className="">
          <h3 className="mb-4 text-lg font-medium">Contact & Location</h3>
          {/* Address Fields */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Address details</FormLabel>
                <FormControl>
                  <AddressInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Fields */}
          <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="contact.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Controller
                      name={field.name}
                      control={form.control}
                      render={({ field }) => (
                        <RPNInput.default
                          {...field}
                          className="flex rounded-lg border-l-0"
                          international
                          flagComponent={FlagComponent}
                          countrySelectComponent={CountrySelect}
                          inputComponent={PhoneInput}
                          defaultCountry="RW"
                          placeholder="Enter phone number"
                          onChange={(value) => field.onChange(value ?? "")}
                          disabled={isPending}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Official school email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Website */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://www.schoolwebsite.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section: Facilities & Operations */}
        <div className="">
          <h3 className="mb-4 text-lg font-medium">Facilities & Operations</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Student Capacity */}
            <FormField
              control={form.control}
              name="student_capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="Total student capacity"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          parseInt(e.target.value, 10) || undefined,
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Classrooms */}
            <FormField
              control={form.control}
              name="classrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Classrooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="Number of classrooms"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          parseInt(e.target.value, 10) || undefined,
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Attendance System */}
            <FormField
              control={form.control}
              name="attendance_system"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attendance System</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select attendance system" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme}>
                      {AttendanceSystems.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Uniform Required */}
            <FormField
              control={form.control}
              name="uniform_required"
              render={({ field }) => (
                <FormItem className="space-y-2 pt-2">
                  <FormLabel>Uniform Required?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      defaultValue={
                        field.value === undefined
                          ? undefined
                          : String(field.value)
                      }
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Scholarship Available */}
            <FormField
              control={form.control}
              name="scholarship_available"
              render={({ field }) => (
                <FormItem className="space-y-2 pt-2">
                  <FormLabel>Scholarships Available?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      defaultValue={
                        field.value === undefined
                          ? undefined
                          : String(field.value)
                      }
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Library Available */}
            <FormField
              control={form.control}
              name="library"
              render={({ field }) => (
                <FormItem className="space-y-2 pt-2">
                  <FormLabel>Library Available?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      defaultValue={
                        field.value === undefined
                          ? undefined
                          : String(field.value)
                      }
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Online Classes */}
            <FormField
              control={form.control}
              name="online_classes"
              render={({ field }) => (
                <FormItem className="h-fit space-y-2 pt-2">
                  <FormLabel>Online Classes Offered?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      defaultValue={
                        field.value === undefined
                          ? undefined
                          : String(field.value)
                      }
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Labs */}
            <FormField
              control={form.control}
              name="labs"
              render={({ field }) => (
                <FormItem className="h-fit">
                  <FormLabel>Labs Available</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      defaultOptions={schoolLabs}
                      placeholder="e.g., Science Lab, Computer Lab"
                      hidePlaceholderWhenSelected
                    />
                  </FormControl>
                  <FormDescription>
                    Enter lab types, separated by commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sports & Extracurricular */}
            <FormField
              control={form.control}
              name="sports_extracurricular"
              render={({ field }) => (
                <FormItem className="h-fit">
                  <FormLabel>Sports & Extracurricular</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      defaultOptions={SchoolSportsExtracurricular}
                      placeholder="e.g., Football, Debate Club, Music"
                      hidePlaceholderWhenSelected
                    />
                  </FormControl>
                  <FormDescription>
                    Enter activities, separated by commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submission Area */}
        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        <Button
          disabled={isPending}
          type="submit"
          library="daisy"
          variant={"info"}
          className="w-full"
        >
          {isPending ? (
            <>
              <div
                role="status"
                aria-label="Loading"
                className="loading loading-spinner mr-2 h-4 w-4"
              />
              Creating School...
            </>
          ) : (
            "Create School"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateSchoolForm;
