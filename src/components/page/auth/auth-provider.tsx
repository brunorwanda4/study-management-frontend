import MyImage from "@/components/common/myImage";
import MyLink from "@/components/comon/myLink";
import AuthLogo from "./auth-logo";

const AuthProvider = () => {
  return (
    <div className="flex flex-col space-y-3">
      <AuthLogo />
      <p className="text-center">Welcome to your space-together account! ☺️</p>

      <div className="flex flex-col space-y-2">
        <MyLink
          className="flex justify-start space-x-2"
          type="button"
          href="/"
          classname=" w-full"
          button={{ library: "daisy", size: "lg", variant: "default" }}
        >
          <MyImage
            src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
            role="ICON"
            className="size-6"
          />
          Google
        </MyLink>
        <MyLink
          className="flex justify-start space-x-2"
          type="button"
          href="/"
          classname=" w-full"
          button={{ library: "daisy", size: "lg", variant: "default" }}
        >
          <MyImage
            src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
            role="ICON"
            className="size-6"
            classname=" w-full"
          />
          facebook
        </MyLink>
        <MyLink
          className="flex justify-start space-x-2"
          type="button"
          href="/"
          classname=" w-full"
          button={{ library: "daisy", size: "lg", variant: "default" }}
        >
          <MyImage
            src="https://cdn-icons-png.flaticon.com/512/1051/1051326.png"
            role="ICON"
            className="size-6"
          />
          Github
        </MyLink>
      </div>
    </div>
  );
};

export default AuthProvider;
