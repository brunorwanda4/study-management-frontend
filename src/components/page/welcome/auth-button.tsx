import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n";

interface props {
  lang: Locale;
}

const AuthButton = ({ lang }: props) => {
  return (
    <div className="flex w-96 flex-col space-y-4">
      <Button library="daisy" size={"lg"} variant={"default"}>
        <MyImage src="/icons/google.png" role="ICON" className="size-6" />
        Continue with Google
      </Button>
      <p className="flex justify-center text-center">Or user your email</p>
      <MyLink
        loading
        button={{ library: "daisy", variant: "info", size: "lg" }}
        href={`/${lang}/auth/login`}
        type="button"
        className="w-full"
        classname=" w-full"
      >
        Sign in
      </MyLink>

      <MyLink
        loading
        button={{ library: "daisy", variant: "default", size: "lg" }}
        href={`/${lang}/auth/register`}
        type="button"
        className="w-full"
        classname=" w-full"
      >
        Create account
      </MyLink>
    </div>
  );
};

export default AuthButton;
