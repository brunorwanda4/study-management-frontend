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
import { authContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";
import type React from "react";

interface Props {
  children: React.ReactNode;
}

export default async function ApplicationLayout({ children }: Props) {
  const auth = await authContext();

  if (!auth) {
    redirect(`/auth/login`);
  }

  const role = auth.user.role;

  return (
    <SidebarProvider>
      <AppNav /> {/* cast to Locale when needed */}
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
      />
      <div className="bg-base-200 flex w-full flex-col space-y-4">
        <main className="min-h-screen w-full pt-14">{children}</main>
        <AppFooter />
      </div>
    </SidebarProvider>
  );
}
