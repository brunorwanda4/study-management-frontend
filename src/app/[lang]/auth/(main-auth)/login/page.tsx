import MyLink from "@/components/common/myLink";
import LoginForm from "@/components/page/auth/forms/login-form";
import { Locale } from "@/i18n";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Login in an account on space together",
};
interface props {
  params: Promise<{ lang: Locale }>;
}

const LoginPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  return (
    <div className="space-y-4">
      <div className="mt-4 flex w-full flex-col-reverse space-y-4 space-x-4 lg:flex-row lg:space-y-0">
        <div className="space-y-2">
          {/* <h4 className=" basic-title">Use your email:</h4> */}
          <LoginForm lang={lang} />
        </div>
      </div>
      <div>
        <div className="flex items-center space-x-2">
          I don&apos;t have an account{" "}
          <MyLink
            href={`/${lang}/auth/register`}
            type="link"
            loading
            className="link text-info ml-1"
          >
            Register
          </MyLink>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
