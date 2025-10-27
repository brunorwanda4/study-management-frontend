"use client";

import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AuthProviders = () => {
  return (
    <div className=" w-full mt-2 space-y-6">
      <div className=" flex flex-col w-full items-center relative  pt-4">
        <p className=" bg-base-100 absolute top-3 px-2">Or continuer with</p>
        <Separator />
      </div>
      <div className=" flex  w-full space-x-2">
        <Button size={"lg"} variant="outline" library="daisy" className=" w-1/2 border">
          <MyImage src="/icons/google.png" className="size-4 " />
          Google
        </Button>
        <Button size={"lg"} variant="outline" library="daisy" className=" w-1/2 border">
          <MyImage src="/icons/facebook.png" className="size-4 " />
          Facebook
        </Button>
      </div>
    </div>
  );
};

export default AuthProviders;
