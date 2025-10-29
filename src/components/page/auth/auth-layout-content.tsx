"use client";

import AppFooter from "@/components/page/application/app-footer";
import AuthSetting from "@/components/page/auth/auth-setting";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface AuthLayoutContentProps {
  children: React.ReactNode;
  lang: Locale;
  diction: any;
}

const AuthLayoutContent = ({
  children,
  lang,
  diction,
}: AuthLayoutContentProps) => {
  const pathname = usePathname();

  const isOnboarding = new RegExp(`^/${lang}/auth/onboarding`).test(pathname);

  return (
    <div
      className={cn(
        "right-0 absolute px-16 h-full max-h-screen overflow-y-auto w-1/2",
        isOnboarding && "w-2/3",
      )}
    >
      <div className="flex flex-col justify-between min-h-screen">
        <div>
          <div className="flex justify-end mt-4">
            <AuthSetting lang={lang} diction={diction} />
          </div>
          {children}
        </div>
        <div className="mt-8">
          <AppFooter className="bg-base-200 border-0" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutContent;
