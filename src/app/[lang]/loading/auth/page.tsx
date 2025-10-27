import AuthLang from "@/components/lang/auth-lang";
import AppLogo from "@/components/page/application/navbar/app-logo";
import { Card } from "@/components/ui/card";



const AuthLoadingPage = async () => {

  return (
    <div className=" grid min-h-screen place-content-center space-y-4">
      <Card className=" p-4 h-96 min-w-3xl flex flex-row space-x-2">
        <div className=" w-1/2 h-full space-y-4">
          <AppLogo notShowName lang={"en"} />
          <p className=" text-center">
            Welcome to your space-together account! ☺️
          </p>
          <div className=" skeleton h-12" />
          <div className=" skeleton h-12" />
          <div className=" skeleton h-12" />
        </div>
        <div className=" skeleton w-1/2 h-full" />
      </Card>
      <AuthLang />
    </div>
  );
};

export default AuthLoadingPage;
