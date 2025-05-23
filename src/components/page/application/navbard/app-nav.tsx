import { SidebarTrigger } from "@/components/ui/sidebar";
import React, { Suspense } from "react";
import AppLogo from "./app-logo";
import MyImage from "@/components/myComponents/myImage";
import NavMessageDropDown from "./nav-message-drop-down";
import { Locale } from "@/i18n";
import NavProfileDropDown from "./nav-profile-drop-down";
import { getAuthUserServer } from "@/lib/utils/auth";
import { redirect } from "next/navigation";

interface props {
  lang: Locale;
}

const AppNav = async ({ lang }: props) => {
  const currentUser = await getAuthUserServer();
  if (!currentUser) {
    redirect(`/${lang}/auth/login`);
  }
  return (
    <nav className=" w-full h-14 max-h-14 fixed border-b border-base-300 p-2 flex justify-between z-50 bg-base-100 shadow-sm">
      <div className=" flex space-x-2  items-center">
        <SidebarTrigger className=" size-12 btn btn-circle rounded-full btn-ghost" />
        <AppLogo />
      </div>
      <div className=" flex gap-2 items-center mr-4">
        {/* <NavMessageDropDown lang={lang}/> */}
        <div role="button" className=" btn btn-circle btn-ghost">
          <MyImage
            className=" size-8"
            src="/icons/bell.png"
          />
        </div>
        <NavMessageDropDown lang={lang} />
        <Suspense fallback={<div className=" size-8 skeleton"/>}>
          <NavProfileDropDown user={currentUser} lang={lang} />
        </Suspense>
      </div>
    </nav>
  );
};

export default AppNav;
