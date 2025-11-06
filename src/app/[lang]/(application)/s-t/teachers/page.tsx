import DisplaySwitcher from "@/components/display/display-switcher";
import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import AllTeachersCards from "@/components/page/school-staff/school-teachers/all-teachers-card";
import SchoolStaffTeacherFilter from "@/components/page/school-staff/school-teachers/school-staff-teacher-fiter";
import SchoolTeacherTable from "@/components/page/school-staff/table/teacher-table/table-teacher";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { TeacherWithRelations } from "@/lib/schema/school/teacher-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
}

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Teachers Management",
    description: "Manage your classes and their roles",
  };
};

const SchoolStaffTeacherPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }
  if (!auth.school)
    return <NotFoundPage message="You need to have school to view this page" />;

  const [teachers] = await Promise.all([
    apiRequest<void, TeacherWithRelations[]>(
      "get",
      `/school/teachers/with-relations?limit=9`,
      undefined,
      { token: auth.token, schoolToken: auth.schoolToken, realtime: "teacher" },
    ),
  ]);

  return (
    <RealtimeProvider<TeacherWithRelations>
      channels={[
        {
          name: "teacher",
          initialData: teachers.data ?? [],
        },
      ]}
    >
      <div className="space-y-4 p-4">
        <AppPageHeader
          title="Teachers"
          description="Manage school teachers, classes, and subjects."
        />
        <SchoolStaffTeacherFilter auth={auth} />
        <DisplaySwitcher
          table={
            <SchoolTeacherTable
              auth={auth}
              lang={lang}
              teachers={teachers.data ?? []}
              realtimeEnabled
            />
          }
          cards={
            <AllTeachersCards
              lang={lang}
              auth={auth}
              teachers={teachers.data ?? []}
            />
          }
        />
      </div>
    </RealtimeProvider>
  );
};
export default SchoolStaffTeacherPage;
