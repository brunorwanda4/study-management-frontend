import MyLink from "@/components/myComponents/myLink";
import AuthProvider from "@/components/page/auth/auth-provider";
import RegisterForm from "@/components/page/auth/forms/register-form";
import { Locale } from "@/i18n";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title : "create an account",
  description : "Create an account on space-together"
}

interface props {
  params : Promise<{lang : Locale}>
}

const RegisterPage = async (props : props) => {
  const params = await props.params;
  const {lang} = params;
  return (
    <div className="">
      <div className=" space-y-1 text-center">
        <h1 className="title-page">Welcome</h1>
        <h3 className="">
          Sign up to your
          <span className="font-medium font-mono leading-1 text-sm">
            space-together
          </span>{" "}
          account! ☺️
        </h3>
      </div>
      <div className=" mt-4 flex w-full space-x-4 lg:flex-row flex-col-reverse space-y-4 lg:space-y-0">
        <div className=" space-y-2">
          <h4 className=" basic-title">Use providers:</h4>
          <AuthProvider />
        </div>
        <div className=" space-y-2">
          <h4 className=" basic-title">User your email:</h4>
          <RegisterForm lang={lang}/>
        </div>
      </div>
      <div>
        <div className=" flex space-x-2 items-center">I have an account <MyLink href={`/${lang}/auth/login`} type="link" className=" link text-info ml-1">Login</MyLink></div>
      </div>
    </div>
  );
};

export default RegisterPage;
