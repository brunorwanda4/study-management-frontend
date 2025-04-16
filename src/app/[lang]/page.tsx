import AuthLang from "@/components/lang/auth-lang";
import MyImage from "@/components/myComponents/myImage";
import MyLink from "@/components/myComponents/myLink";
import AuthButton from "@/components/page/welcome/auth-button";
import WelcomeImage from "@/components/page/welcome/welcome-images";
import AuthTheme from "@/components/theme/auth-theme";
import { Locale } from "@/i18n";

interface props {
  params : Promise<{lang : Locale}>;
}

const WelcomePage = async (props: props ) => {
  const params = await props.params;
  const {lang} = params;
  return (
    <section className=" flex justify-between w-full h-screen bg-base-100">
      <div className=" w-1/2 p-8">
        <div className=" flex justify-end">
          <AuthTheme />
        </div>
        <div className="  flex flex-col space-y-6 justify-center items-center">
          <MyImage className=" size-16" src="/logo.png" />
        </div>
        <div className=" mt-10 flex flex-col justify-center items-center space-y-1">
          <h1 className=" text-2xl">
            Welcome to {" "}
            <span className=" font-medium font-mono leading-1">
              space-together
            </span>
          </h1>
          <p className="">
            Study smarter, collaborate better, manage easier — start now!
          </p>
        </div>
        <div className=" mt-8 justify-center items-center flex">
          <AuthButton lang={lang}/>
        </div>
        <div className="mt-8  space-y-2">
          <div className=" text-center">
            <p>
              By continuing you agree to <span>space together</span>{" "}
              <MyLink href="/">Terms and Conditions</MyLink>
            </p>
          </div>
          <div className=" text-center flex justify-center">
            <AuthLang />
          </div>
        </div>
      </div>
      <div className=" justify-start flex w-1/2 p-4 h-full">
        <WelcomeImage />
      </div>
    </section>
  );
};

export default WelcomePage;
