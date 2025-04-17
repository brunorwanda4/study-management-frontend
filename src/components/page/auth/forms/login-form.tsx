"use client";

import { LoginUserDto, LoginUserSchema } from "@/lib/schema/user.dto";
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
import { useState, useTransition } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { loginService } from "@/service/auth/auth-service";
import { redirectContents } from "@/lib/hooks/redirect";
import { Locale } from "@/i18n";
import { useRouter } from "next/navigation";
import { FormError, FormSuccess } from "@/components/myComponents/form-message";

interface props {
  lang: Locale;
}

const LoginForm = ({ lang }: props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const router = useRouter();
  const form = useForm<LoginUserDto>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  function onSubmit(values: LoginUserDto) {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const login = await loginService(values);
      if (login.data) {
        setSuccess(`Welcome back ${login.data.name} ☺️`);
        if (login.data.role) {
          router.push(redirectContents({ lang, role: login.data.role }));
        }
      } else if (login.error) {
        setError(login.error);
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-96">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="group relative">
                  <label
                    htmlFor={"email"}
                    className="origin-start  group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-base group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-base has-[+input:not(:placeholder-shown)]:font-medium "
                  >
                    <span className="bg-base-100 inline-flex px-2">
                      Email Address*
                    </span>
                  </label>
                  <Input
                    autoFocus
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
                    className="group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0  group-focus-within:cursor-default group-focus-within:text-base group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-base has-[+input:not(:placeholder-shown)]:font-medium "
                  >
                    <span className="bg-base-100 inline-flex px-2">
                      Password*
                    </span>
                  </label>
                  <Input
                    className=" h-12 base text-lg"
                    type={isVisible ? "text" : "password"}
                    disabled={isPending}
                    placeholder=" "
                    {...field}
                  />
                  <button
                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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
            </FormItem>
          )}
        />
        <div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <Button
          type="submit"
          library="daisy"
          variant={"info"}
          size={"lg"}
          className=" w-full"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
