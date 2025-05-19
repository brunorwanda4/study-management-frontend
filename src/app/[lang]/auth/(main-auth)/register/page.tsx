import MyLink from "@/components/myComponents/myLink";
import RegisterForm from "@/components/page/auth/forms/register-form";
import { Locale } from "@/i18n";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "create an account",
  description: "Create an account on space-together",
};

interface props {
  params: Promise<{ lang: Locale }>;
}

const RegisterPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  return (
    <main className=" flex flex-col">
      <div className=" space-y-4">
        <div className=" space-y-1 text-center">
        </div>
        <div className=" mt-4 flex w-full space-x-4 lg:flex-row flex-col-reverse space-y-4 lg:space-y-0">
          <div className=" space-y-2">
            <h4 className=" basic-title">Use your email:</h4>
            <RegisterForm lang={lang} />
          </div>
        </div>
        <div>
          <div className=" flex space-x-2 items-center">
            I have an account{" "}
            <MyLink
              href={`/${lang}/auth/login`}
              type="link"
              loading
              className=" link text-info ml-1"
            >
              Login
            </MyLink>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
