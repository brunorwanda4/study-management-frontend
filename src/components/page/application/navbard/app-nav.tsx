import AppBreadcrumb from "@/components/common/app-breadcrumb";
import MyImage from "@/components/common/myImage";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AppLogo from "./app-logo";
import NavMessageDropDown from "./nav-message-drop-down";
import NavProfileDropDown from "./nav-profile-drop-down";

interface props {
  lang: Locale;
}

const AppNav = async ({ lang }: props) => {
  const auth = await authContext();
  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  return (
    <nav className="border-base-300 bg-base-100 fixed z-50 flex h-14 max-h-14 w-full justify-between border-b p-2 shadow-sm">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <SidebarTrigger className="btn btn-circle btn-ghost size-12 rounded-full" />
          <AppLogo />
        </div>
        <AppBreadcrumb />
      </div>
      <div className="mr-4 flex items-center gap-2">
        {/* <NavMessageDropDown lang={lang}/> */}
        <div role="button" className="btn btn-circle btn-ghost">
          <MyImage className="size-8" src="/icons/bell.png" />
        </div>
        <NavMessageDropDown lang={lang} />
        <Suspense fallback={<div className="skeleton size-8" />}>
          <NavProfileDropDown auth={auth} lang={lang} />
        </Suspense>
      </div>
    </nav>
  );
};

export default AppNav;
