import MyLink from "@/components/common/myLink";
import RegisterForm from "@/components/page/auth/forms/register-form";
import { Locale } from "@/i18n";
import { Metadata } from "next";

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
    <main className="flex flex-col">
      <div className="space-y-4">
        <div className="space-y-1 text-center"></div>
        <div className="mt-4 flex w-full flex-col-reverse space-y-4 space-x-4 lg:flex-row lg:space-y-0">
          <div className="space-y-2">
            <h4 className="basic-title">Use your email:</h4>
            <RegisterForm lang={lang} />
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            I have an account{" "}
            <MyLink
              href={`/${lang}/auth/login`}
              type="link"
              loading
              className="link text-info ml-1"
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
