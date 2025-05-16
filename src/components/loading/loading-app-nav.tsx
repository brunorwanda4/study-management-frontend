import React from "react";
import AppLogo from "../page/application/navbard/app-logo";
import MyImage from "../myComponents/myImage";
import { Button } from "../ui/button";

const LoadingAppNav = () => {
  return (
    <nav className=" w-full h-14 max-h-14 fixed border-b border-base-300 p-2 flex justify-between z-50 bg-base-100 shadow-sm">
      <div className=" flex space-x-2  items-center">
        <button className=" size-10 skeleton rounded-md" />
        <AppLogo />
      </div>
      <div className=" flex gap-2 items-center mr-4">
        {/* <NavMessageDropDown lang={lang}/> */}
        <div role="button" className=" btn btn-circle btn-ghost">
          <MyImage
            className=" size-8"
            src="https://cdn-icons-png.flaticon.com/512/1827/1827312.png"
          />
        </div>
        <Button library="daisy" variant="ghost" shape="circle">
          <MyImage className=" size-8" src="/icons/chat.png" />
        </Button>
        <div className=" size-12 skeleton mask mask-squircle" />
      </div>
    </nav>
  );
};

export default LoadingAppNav;
