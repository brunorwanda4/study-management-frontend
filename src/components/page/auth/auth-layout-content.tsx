"use client";

import AuthSetting from "@/components/page/auth/auth-setting";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface AuthLayoutContentProps {
  children: React.ReactNode;
  lang: Locale;
  diction: any;
}

const AuthLayoutContent = ({ children, lang, diction }: AuthLayoutContentProps) => {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        " w-1/2 right-0 absolute px-16",
        pathname === `/${lang}/auth/onboarding` && " w-2/3",
      )}
    >
        <div className=" flex justify-end  mt-4">
          <AuthSetting lang={lang } diction={diction}/>
        </div>
      {children}
    </div>
  );
};

export default AuthLayoutContent;
