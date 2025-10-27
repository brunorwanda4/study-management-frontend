import AuthLayoutImage from "@/components/page/auth/auth-layout-images";
import AuthSetting from "@/components/page/auth/auth-setting";
import { getDictionary, type Locale } from "@/i18n";

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}
const AuthLayout = async (props: Props) => {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const diction = await getDictionary(lang as Locale);
  return (
    <main className="">
      <div className=" pr-4">
          <nav className=" relative">
          <AuthSetting lang={lang as Locale} diction={diction.auth.setting}/>
        </nav>
      </div>
       <div className=" items-center justify-between flex min-h-screen w-full">
        <AuthLayoutImage diction={diction.auth.leftSide} lang={lang as Locale} />
        <section className=" w-1/2 right-0 absolute px-16">
          {children}
        </section>
      </div>
    </main>
  );
};

export default AuthLayout;
