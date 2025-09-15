import AppFooter from "@/components/page/application/app-fotter";
import {
  adminSidebarGroups,
  schoolStaffSidebarGroups,
  studentSidebarGroups,
  teacherSidebarGroups,
} from "@/components/page/application/aside/app-side-content";
import { AppSidebar } from "@/components/page/application/aside/app-sidebar";
import AppNav from "@/components/page/application/navbard/app-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Locale } from "@/i18n";
import { authUser } from "@/lib/utils/auth-user";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
  children: React.ReactNode;
}

const ApplicationLayout = async (props: props) => {
  const { children } = props;
  const params = await props.params;
  const { lang } = params;
  const currentUser = (await authUser())?.user;
  if (!currentUser) {
    redirect(`/${lang}/auth/login`);
  }
  const role = currentUser.role;
  return (
    <SidebarProvider>
      <AppNav lang={lang} />
      <AppSidebar
        items={
          role === "STUDENT"
            ? studentSidebarGroups
            : role === "SCHOOLSTAFF"
            ? schoolStaffSidebarGroups
            : role === "ADMIN"
            ? adminSidebarGroups
            : teacherSidebarGroups
        }
        lang={lang}
      />
      <div className=" flex flex-col w-full space-y-4 bg-base-200">
        <main className="pt-14 w-full min-h-screen">
          {children}
        </main>
        <AppFooter lang={lang} />
      </div>
    </SidebarProvider>
  );
};

export default ApplicationLayout;
