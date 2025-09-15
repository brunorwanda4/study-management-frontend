import MyImage from '@/components/myComponents/myImage';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Locale } from '@/i18n';
import { authUser } from '@/lib/utils/auth-user';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import AppLogo from './app-logo';
import NavMessageDropDown from './nav-message-drop-down';
import NavProfileDropDown from './nav-profile-drop-down';

interface props {
  lang: Locale;
}

const AppNav = async ({ lang }: props) => {
  const auth = await authUser();
  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }
  const currentUser = auth.user;

  return (
    <nav className=" w-full h-14 max-h-14 fixed border-b border-base-300 p-2 flex justify-between z-50 bg-base-100 shadow-sm">
      <div className=" flex space-x-2  items-center">
        <SidebarTrigger className=" size-12 btn btn-circle rounded-full btn-ghost" />
        <AppLogo />
      </div>
      <div className=" flex gap-2 items-center mr-4">
        {/* <NavMessageDropDown lang={lang}/> */}
        <div role="button" className=" btn btn-circle btn-ghost">
          <MyImage className=" size-8" src="/icons/bell.png" />
        </div>
        <NavMessageDropDown lang={lang} />
        <Suspense fallback={<div className=" size-8 skeleton" />}>
          <NavProfileDropDown user={currentUser} lang={lang} />
        </Suspense>
      </div>
    </nav>
  );
};

export default AppNav;
