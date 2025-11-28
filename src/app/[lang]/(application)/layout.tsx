import AppBreadcrumb from "@/components/common/app-breadcrumb";
import AppFooter from "@/components/page/application/app-footer";
import {
  adminSidebarGroups,
  schoolStaffSidebarGroups,
  studentSidebarGroups,
  teacherSidebarGroups,
} from "@/components/page/application/aside/app-side-content";
import { AppSidebar } from "@/components/page/application/aside/app-sidebar";
import AppNav from "@/components/page/application/navbar/app-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";
import type React from "react";

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function ApplicationLayout(props: Props) {
  const params = await props.params;
  const { lang } = params;
  const { children } = props;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  const role = auth.user.role;

  return (
    <SidebarProvider>
      <AppNav auth={auth} lang={lang as Locale} />
      <AppSidebar
        lang={lang as Locale}
        items={
          role === "STUDENT"
            ? studentSidebarGroups
            : role === "SCHOOLSTAFF"
              ? schoolStaffSidebarGroups
              : role === "ADMIN"
                ? adminSidebarGroups
                : teacherSidebarGroups
        }
      />
      <div className="bg-base-200 flex w-full flex-col gap-0">
        <main className="min-h-screen w-full pt-14">
          <div className=" relative px-4">
            <AppBreadcrumb />
          </div>
          {children}
        </main>
        <AppFooter />
      </div>
    </SidebarProvider>
  );
}
