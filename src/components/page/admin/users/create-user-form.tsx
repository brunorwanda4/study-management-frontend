"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { ChangeEvent, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import UploadImage from "@/components/common/cards/form/upload-image";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { genders, userRoles } from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import {
  CreateUser,
  CreateUserSchema,
} from "@/lib/schema/user/create-user-schema";
import { UserModel } from "@/lib/schema/user/user-schema";
import { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

interface props {
  auth: AuthContext;
}

const CreateUserForm = ({ auth }: props) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const toggleSeePassword = () => setSeePassword((prev) => !prev);

  // password strength checker
  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];
    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);
  const strengthScore = useMemo(
    () => strength.filter((req) => req.met).length,
    [strength],
  );

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  const form = useForm<CreateUser>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password_hash: "",
      phone: "",
      bio: "",
      role: undefined,
      gender: undefined,
      address: {
        country: "",
        province: "",
        district: "",
        sector: "",
        cell: "",
        village: "",
        state: "",
        postal_code: "",
        google_map_url: "",
      },
      age: { year: undefined, month: undefined, day: undefined },
    },
    mode: "onChange",
  });

  const handlePasswordChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    fieldChange(newPassword);
  };

  const handleSubmit = (values: CreateUser) => {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const result = await apiRequest<CreateUser, UserModel>(
        "post",
        "/users",
        values,
        { token: auth.token },
      );

      if (!result.data) {
        showToast({
          title: "Uh oh! Something went wrong.",
          description: result.message,
          type: "error",
        });
        setError(result.message || "Failed to create user");
      } else {
        setSuccess("User created successfully!");
        showToast({
          title: "User created successfully 😁",
          description: <div>user: {result.data.name}</div>,
          type: "success",
        });
        form.reset();
      }
    });
  };

  // Generate years, months, and days for age selection
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex w-full justify-between space-x-4">
          {/* Left Column */}
          <div className="flex w-full flex-col justify-start space-y-4">
            {/* Full name */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Full Name*</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      className="h-12 text-base"
                      {...field}
                      placeholder="Enter full name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username */}
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      className="h-12 text-base"
                      {...field}
                      placeholder="Enter username (optional)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email Address*</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      className="h-12 text-base"
                      {...field}
                      placeholder="email@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      className="h-12 text-base"
                      {...field}
                      placeholder="+250 7..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              name="password_hash"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="h-12 pr-10 text-base"
                        type={seePassword ? "text" : "password"}
                        placeholder="Enter password"
                        disabled={isPending}
                        {...field}
                        onChange={(e) =>
                          handlePasswordChange(e, field.onChange)
                        }
                      />
                      <button
                        className="absolute inset-y-0 right-0 flex h-full w-10 items-center justify-center rounded-r-md"
                        type="button"
                        onClick={toggleSeePassword}
                        aria-label={
                          seePassword ? "Hide password" : "Show password"
                        }
                      >
                        {seePassword ? (
                          <EyeOffIcon size={18} />
                        ) : (
                          <EyeIcon size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />

                  {/* Password strength indicator */}
                  <div
                    className="bg-border mt-3 mb-2 h-1 w-full overflow-hidden rounded-full"
                    role="progressbar"
                    aria-valuenow={strengthScore}
                    aria-valuemin={0}
                    aria-valuemax={4}
                    aria-label="Password strength"
                  >
                    <div
                      className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                      style={{ width: `${(strengthScore / 4) * 100}%` }}
                    ></div>
                  </div>

                  {/* Password strength description */}
                  <p className="mb-2 text-sm font-medium">
                    {getStrengthText(strengthScore)}. Must contain:
                  </p>

                  {/* Password requirements list */}
                  <ul className="grid grid-cols-2 gap-1 text-sm">
                    {strength.map((req, index) => (
                      <li key={index} className="flex items-center gap-2">
                        {req.met ? (
                          <CheckIcon size={16} className="text-emerald-500" />
                        ) : (
                          <XIcon size={16} className="text-muted-foreground" />
                        )}
                        <span
                          className={
                            req.met
                              ? "text-emerald-600"
                              : "text-muted-foreground"
                          }
                        >
                          {req.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </FormItem>
              )}
            />
            {/* Role */}
            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">User Role*</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-2"
                    >
                      {userRoles.map((role) => (
                        <FormItem
                          key={role}
                          className="flex items-center space-x-2"
                        >
                          <FormControl>
                            <RadioGroupItem value={role} className="size-5" />
                          </FormControl>
                          <FormLabel className="cursor-pointer text-base font-normal">
                            {role}
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

          {/* Right Column */}
          <div className="flex w-full flex-col justify-start space-y-4">
            {/* image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="row-span-3 flex flex-col space-y-2">
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <UploadImage
                      onChange={field.onChange}
                      disabled={isPending}
                      className="w-full md:mb-4"
                      Classname=""
                      value={field.value?.toString() ?? null}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Gender */}
            <FormField
              name="gender"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-2"
                    >
                      {genders.map((g) => (
                        <FormItem
                          key={g}
                          className="flex items-center space-x-2"
                        >
                          <FormControl>
                            <RadioGroupItem value={g} className="size-5" />
                          </FormControl>
                          <FormLabel className="cursor-pointer text-base font-normal">
                            {g}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Age */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className=" ">Age</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {/* Year Select */}
                      <div className="flex w-full flex-col space-y-1">
                        <Label>years</Label>
                        <Select
                          onValueChange={(value) =>
                            field.onChange({
                              ...(field.value || {}),
                              year: Number(value),
                            })
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {Array.from(
                              { length: 100 },
                              (_, i) => new Date().getFullYear() - i,
                            ).map((year) => (
                              <SelectItem key={year} value={String(year)}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Month Select */}
                      <div className="flex w-full flex-col space-y-1">
                        <Label>Month</Label>
                        <Select
                          onValueChange={(value) =>
                            field.onChange({
                              ...(field.value || {}),
                              month: Number(value),
                            })
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(
                              (month) => (
                                <SelectItem key={month} value={String(month)}>
                                  {month}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Day Select */}
                      <div className="flex w-full flex-col space-y-1">
                        <Label>Day</Label>
                        <Select
                          onValueChange={(value) =>
                            field.onChange({
                              ...(field.value || {}),
                              day: Number(value),
                            })
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(
                              (day) => (
                                <SelectItem key={day} value={String(day)}>
                                  {day}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bio */}
            <FormField
              name="bio"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      className="min-h-24 resize-none"
                      {...field}
                      placeholder="Enter a short bio (optional)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="space-y-4 rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Address Information</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "address.country", label: "Country" },
              { name: "address.province", label: "Province" },
              { name: "address.district", label: "District" },
              { name: "address.sector", label: "Sector" },
              { name: "address.cell", label: "Cell" },
              { name: "address.village", label: "Village" },
              { name: "address.state", label: "State" },
              { name: "address.postal_code", label: "Postal Code" },
            ].map((field) => (
              <FormField
                key={field.name}
                name={field.name as any}
                control={form.control}
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel className="text-base">{field.label}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...f}
                        placeholder={field.label}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          {/* Google Map URL (full width) */}
          <FormField
            name="address.google_map_url"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Google Map URL</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    placeholder="https://maps.google.com/..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button size="sm" type="button" library="daisy">
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="sm"
            variant="info"
            disabled={isPending}
            type="submit"
            library="daisy"
          >
            Create user{" "}
            {isPending && <span className="loading loading-spinner" />}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateUserForm;
