"use client";

import { CreateUserSchema, CreateUserDto } from "@/lib/schema/user.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useMemo, useState, useTransition } from "react";
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { registerUserService } from "@/service/auth/auth-service";
import { FormError, FormSuccess } from "@/components/myComponents/form-message";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n";

interface props {
  lang : Locale
}

const RegisterForm = ({lang} : props) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  const form = useForm<CreateUserDto>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //   password
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

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

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

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
  const handlePasswordChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    const newPassword = e.target.value;
    setPassword(newPassword); // Update local state for strength checking
    fieldChange(newPassword); // Update react-hook-form's state for validation
  };

  function onSubmit(values: CreateUserDto) {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const create = await registerUserService(values);
      if (create.data) {
        setSuccess("Account created successful! ☺️");
        router.push(`/${lang}/auth/onboarding`)
      } else if (create.error) {
        setError(create.error);
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-96">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="group relative">
                  <label
                    htmlFor={"name"}
                    className="origin-start  group-focus-within:  has-[+input:not(:placeholder-shown)]:  absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-base group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-base has-[+input:not(:placeholder-shown)]:font-medium "
                  >
                    <span className="bg-base-100 inline-flex px-2">
                      Full name
                    </span>
                  </label>
                  <Input
                    disabled={isPending}
                    autoFocus
                    className=" h-12 base text-lg"
                    {...field}
                    id="name"
                    placeholder=" "
                  />
                </div>
              </FormControl>
              {/* <FormDescription>Your full name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="group relative">
                  <label
                    htmlFor={"email"}
                    className="origin-start  group-focus-within:  has-[+input:not(:placeholder-shown)]:  absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-base group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-base has-[+input:not(:placeholder-shown)]:font-medium "
                  >
                    <span className="bg-base-100 inline-flex px-2">
                      Email Address*
                    </span>
                  </label>
                  <Input
                    disabled={isPending}
                    className=" h-12 base text-lg"
                    {...field}
                    id="email"
                    placeholder=" "
                  />
                </div>
              </FormControl>
              {/* <FormDescription>Your email use and which we will send verification code.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className=" relative group">
                  <label
                    htmlFor={"password"}
                    className="group-focus-within:  has-[+input:not(:placeholder-shown)]:  absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0  group-focus-within:cursor-default group-focus-within:text-base group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-base has-[+input:not(:placeholder-shown)]:font-medium "
                  >
                    <span className="bg-base-100 inline-flex px-2">
                      Password*
                    </span>
                  </label>
                  <Input
                    className=" h-12 base text-lg"
                    type={isVisible ? "text" : "password"}
                    placeholder=" "
                    disabled={isPending}
                    {...field}
                    onChange={(e) => handlePasswordChange(e, field.onChange)}
                  />
                  <button
                    className=" /80 hover:  focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    aria-pressed={isVisible}
                    aria-controls="password"
                  >
                    {isVisible ? (
                      <EyeOffIcon size={16} aria-hidden="true" />
                    ) : (
                      <EyeIcon size={16} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </FormControl>
              {/* <FormDescription>Your secret password which you will to login.</FormDescription> */}
              <FormMessage />
              {/* Password strength indicator */}
              <div
                className="bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full"
                role="progressbar"
                aria-valuenow={strengthScore}
                aria-valuemin={0}
                aria-valuemax={4}
                aria-label="Password strength"
              >
                <div
                  className={`h-full ${getStrengthColor(
                    strengthScore
                  )} transition-all duration-500 ease-out`}
                  style={{ width: `${(strengthScore / 4) * 100}%` }}
                ></div>
              </div>

              {/* Password strength description */}
              <p
                id={`password-description`}
                className="mb-2 text-sm font-medium"
              >
                {getStrengthText(strengthScore)}. Must contain:
              </p>

              {/* Password requirements list */}
              <ul
                className=" grid grid-cols-2"
                aria-label="Password requirements"
              >
                {strength.map((req, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {req.met ? (
                      <CheckIcon
                        size={16}
                        className="text-emerald-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <XIcon
                        size={16}
                        className=" /80"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`text-xs ${
                        req.met ? "text-emerald-600" : " "
                      }`}
                    >
                      {req.text}
                      <span className="sr-only">
                        {req.met
                          ? " - Requirement met"
                          : " - Requirement not met"}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </FormItem>
          )}
        />
        <div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          library="daisy"
          variant={"info"}
          size={"lg"}
          className=" w-full"
        >
          Create an account{" "}
          {isPending && (
            <div
              role="status"
              aria-label="Loading"
              className={"loading loading-spinner"}
            />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
