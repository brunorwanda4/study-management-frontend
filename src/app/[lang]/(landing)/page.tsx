import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import AuthSetting from "@/components/page/auth/auth-setting";
import AuthButton from "@/components/page/welcome/auth-button";
import WelcomeImage from "@/components/page/welcome/welcome-images";
import { Button } from "@/components/ui/button";
import { getDictionary, type Locale } from "@/i18n";
import { toLowerCase } from "@/lib/functions/characters";
import { redirectContents } from "@/lib/hooks/redirect";
import { authContext } from "@/lib/utils/auth-context";
import { ArrowRight } from "lucide-react";

interface props {
  params: Promise<{ lang: Locale }>;
}

const WelcomePage = async (props: props) => {
  const [params, auth] = await Promise.all([props.params, authContext()]);
  const { lang } = params;
  const diction = await getDictionary(lang as Locale);
  return (
    <section className="bg-base-100 flex h-screen w-full justify-between items-center">
      <div className="w-1/2 p-8 relative">
        <div className="flex justify-end">
          <AuthSetting lang={lang as Locale} diction={diction.auth.setting} />
        </div>
        <div className="flex flex-col items-center justify-center space-y-6">
          <MyImage className="size-16" src="/logo.png" />
        </div>
        <div className="mt-10 flex flex-col items-center justify-center space-y-1">
          <h1 className="text-2xl">
            Welcome to{" "}
            <span className="font-mono leading-1 font-medium">
              space-together
            </span>
          </h1>
          <p className="">
            Study smarter, collaborate better, manage easier — start now!
          </p>
        </div>
        <div className="mt-8 flex items-center justify-center">
          {!auth ? (
            <AuthButton lang={lang} />
          ) : !auth.user.role ? (
            <MyLink
              loading
              type="button"
              button={{ variant: "primary", library: "daisy", size: "lg" }}
              href={"/auth/onboarding"}
            >
              Help others to now you better 😁
            </MyLink>
          ) : (
            <div className=" flex flex-col items-center space-y-6">
              <div className=" space-y-4 flex flex-col items-center">
                <div className=" flex space-x-4 items-center">
                  <MyLink
                    href={`${redirectContents({
                      lang,
                      role: auth.user.role,
                    })}`}
                  >
                    <MyImage
                      className=" size-44"
                      role="AVATAR"
                      src={auth.user?.image || "/images/k.jpg"}
                      alt="Picture of the author"
                    />
                  </MyLink>
                  <div className=" flex flex-col space-y-1">
                    <div className=" flex ">
                      <span className=" text-myGray">Name :</span>
                      <h4 className=" font-medium capitalize">
                        {auth.user.name}
                      </h4>
                    </div>
                    <div className=" flex ">
                      <span className=" text-myGray">email :</span>
                      <h4 className=" font-medium">{auth.user.email}</h4>
                    </div>
                    {!!auth.user.username && (
                      <div className=" flex ">
                        <span className=" text-myGray">Username :</span>
                        <h4 className=" font-medium">{auth.user.username}</h4>
                      </div>
                    )}
                    <div className=" flex ">
                      <span className=" text-myGray">User type :</span>
                      <h4 className=" font-medium capitalize">
                        {toLowerCase(auth.user.role)}
                      </h4>
                    </div>
                    <MyLink
                      href={`${redirectContents({
                        lang,
                        role: auth.user.role,
                      })}`}
                      className=" mt-3"
                    >
                      <Button variant="ghost" size="sm" className=" group">
                        Visit site{" "}
                        <ArrowRight
                          size={14}
                          className=" group-hover:scale-x-110 duration-150"
                        />
                      </Button>
                    </MyLink>
                  </div>
                </div>
                {/* <form
                  action={async () => {
                    "use server";
                    await removeUserToken();
                  }}
                >
                  <Button library="daisy" type="submit" variant="error">
                    <LogOutIcon /> Sign out
                  </Button>
                </form> */}
              </div>
              <div className=" mt-8">
                <MyLink
                  loading
                  type="button"
                  button={{ variant: "primary", library: "daisy", size: "lg" }}
                  href={redirectContents({
                    lang,
                    role: auth.user.role || "STUDENT",
                  })}
                  className=" "
                >
                  Use Application 🌼
                </MyLink>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex h-full w-1/2 justify-start p-4">
        <WelcomeImage />
      </div>
    </section>
  );
};

export default WelcomePage;
