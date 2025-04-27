import MyImage from "@/components/myComponents/myImage";
import MyLink from "@/components/myComponents/myLink";
import { Button, } from "@/components/ui/button";
import { Locale } from "@/i18n";
import React from "react";

interface props {
  lang: Locale;
}

const AuthButton = ({ lang }: props) => {
  return (
    <div className=" flex flex-col space-y-4 w-96">
      <Button library="daisy" size={"lg"} variant={"default"}>
        <MyImage
          src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
          role="ICON"
          className=" size-6"
        />
        Continue with Google
      </Button>
      <p className=" flex text-center justify-center">Or user your email</p>
      <MyLink
        loading
        button={{library : "daisy",variant: "info" , size: "lg"}}
        href={`/${lang}/auth/login`}
        type="button"
        className=" w-full"
        classname=" w-full"
      >
        Sign in
      </MyLink>

      <MyLink
        loading
        button={{library : "daisy",variant: "default" , size: "lg"}}
        href={`/${lang}/auth/register`}
        type="button"
        className=" w-full"
        classname=" w-full"
        >
        Create account
      </MyLink>
    </div>
  );
};

export default AuthButton;
