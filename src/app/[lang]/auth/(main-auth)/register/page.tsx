import MyLink from "@/components/common/myLink";
import AuthProviders from "@/components/page/auth/auth-provider";
import RegisterForm from "@/components/page/auth/forms/register-form";
import { getDictionary, type Locale } from "@/i18n";
import type { Metadata } from "next";

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
  const diction = await getDictionary(lang);
  return (
    <div className=" h-screen flex flex-col items-start pt-4  gap-2">
      <div className=" space-y-2">
        <h1 className=" happy-title-head">
          {diction.auth.register.page.title}
        </h1>
      </div>
      <div className=" mt-4 w-full space-y-3">
        <RegisterForm lang={lang} />
        <div>
          <p>{diction.auth.register.page.paragraph}</p>
          <MyLink href={`/${lang}/auth/login`} className=" link link-info">
            {diction.auth.register.page.login}
          </MyLink>
        </div>
        <AuthProviders />
      </div>
    </div>
  );
};

export default RegisterPage;
