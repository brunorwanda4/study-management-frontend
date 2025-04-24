import {
  BarChart3,
  ClipboardList,
  Filter,
  Search,
  UserCog,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Locale } from "@/i18n";
import SchoolHeader from "@/components/page/school/school-header";
import { StaffHeader } from "@/components/page/school-staff/staff-components/staff-head";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StaffOverview } from "@/components/page/school-staff/staff-components/staff-overview";
import { StaffList } from "@/components/page/school-staff/staff-components/staff-list";
import { RoleManagement } from "@/components/page/school-staff/staff-components/role-management";
import { PostsManagement } from "@/components/page/school-staff/staff-components/posts-management";
import { redirect } from "next/navigation";
import { getAuthUserServer, getSchoolServer } from "@/lib/utils/auth";
import { redirectContents } from "@/lib/hooks/redirect";
import { getSchoolByIdService } from "@/service/school/school.service";
import NotFoundPage from "@/components/page/not-found";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Management",
  description: "Manage your staff members and their roles",
};

interface props {
  params: Promise<{ lang: Locale }>;
}
export default async function StaffManagementPage(props: props) {
  const params = await props.params;
  const { lang } = params;
  const [currentUser, currentSchool] = await Promise.all([
    getAuthUserServer(),
    getSchoolServer(),
  ]);

  if (!currentUser) {
    redirect(`/${lang}/auth/login`);
  }
  if (!currentUser.role) {
    redirect(`/${lang}/auth/onboarding`);
  }
  if (!currentSchool) {
    redirect(redirectContents({ lang, role: currentUser.role }));
  }
  const school = await getSchoolByIdService(currentSchool.schoolId);
  if (!school.data) return <NotFoundPage />
  return (
    <div className="flex min-h-screen flex-col p-4">
      <SchoolHeader onThePage lang={lang} />
      <StaffHeader />
      <main className="flex-1 p-6">
        <Tabs
          // value={activeTab}
          // onValueChange={setActiveTab}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="staff-list"
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Staff List
              </TabsTrigger>
              <TabsTrigger value="roles" className="flex items-center gap-2">
                <UserCog className="h-4 w-4" />
                Roles & Permissions
              </TabsTrigger>
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                Posts
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search staff..."
                  className="w-[200px] pl-8 md:w-[260px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <StaffOverview staffMembers={school.data.SchoolStaff} />
          </TabsContent>

          <TabsContent value="staff-list" className="space-y-4">
            <StaffList staffMembers={school.data.SchoolStaff} />
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            <RoleManagement />
          </TabsContent>

          <TabsContent value="posts" className="space-y-4">
            <PostsManagement staffMembers={school.data.SchoolStaff} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
