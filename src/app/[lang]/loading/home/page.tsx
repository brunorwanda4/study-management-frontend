import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";

const LoadingPage = () => {
  return (
    <div className="flex min-h-screen space-x-4 px-4 pt-4">
      <div className="w-1/2 space-y-4">
        <div className="flex justify-end">
          <span className="skeleton h-12 w-20 rounded-full" />
        </div>
        <div className="grid place-content-center">
          <div className="flex flex-col items-center justify-center space-y-6">
            <MyImage className="size-16" src="/logo.png" />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="mt-10 flex flex-col items-center justify-center space-y-1">
            <h1 className="text-2xl">
              Welcome to
              <span className="font-mono leading-1 font-medium">
                space-together
              </span>
            </h1>
            <p className="">
              Study smarter, collaborate better, manage easier — start now!
            </p>
          </div>
          <div className="skeleton h-40 w-full" />
          <div className="text-center">
            <p>
              By continuing you agree to <span>space together</span>{" "}
              <MyLink href="/">Terms and Conditions</MyLink>
            </p>
          </div>
        </div>
      </div>
      <div className="from-base-100 to-base-300 h-screen space-y-4 rounded-3xl bg-gradient-to-tr p-4 px-6 md:w-1/2">
        <div className="flex flex-col space-y-2">
          <span className="skeleton h-10 w-full" />
          <span className="skeleton h-10 w-2/3" />
          <span className="skeleton h-10 w-1/2" />
        </div>
        <div className="skeleton h-2/3 w-full" />
      </div>
    </div>
  );
};

export default LoadingPage;
