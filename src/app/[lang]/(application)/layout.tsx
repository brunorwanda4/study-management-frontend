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
import { UserRoleDto } from "@/lib/schema/user.dto";

interface props {
  params: Promise<{ lang: Locale }>;
  children: React.ReactNode;
}
const ApplicationLayout = async (props: props) => {
  const { children } = props;
  const params = await props.params;
  const { lang } = params;
  const role: UserRoleDto = "SCHOOLSTAFF" as UserRoleDto;
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
      <main className="pt-14 bg-base-200 w-full">{children}</main>
    </SidebarProvider>
  );
};

export default ApplicationLayout;
