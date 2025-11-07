import DisplaySwitcher from "@/components/display/display-switcher";
import AppPageHeader from "@/components/page/common/app-page-header";
import NotFoundPage from "@/components/page/not-found";
import AllStudentsCards from "@/components/page/school-staff/students-components/all-students-card";
import StudentFilter from "@/components/page/school-staff/students-components/students-fiter";
import SchoolStudentTable from "@/components/page/school-staff/table/student-table/table-student-list";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { Class } from "@/lib/schema/class/class-schema";
import type { StudentWithRelations } from "@/lib/schema/relations-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
}

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Student Management",
    description: "Manage your classes and their roles",
  };
};

const SchoolStaffStudentPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }
  if (!auth.school)
    return <NotFoundPage message="You need to have school to view this page" />;

  const [students_res] = await Promise.all([
    apiRequest<void, StudentWithRelations[]>(
      "get",
      "/school/students/with-details?limit=9",
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "student",
      },
    ),
  ]);

  return (
    <RealtimeProvider<StudentWithRelations | Class>
      channels={[
        {
          name: "student",
          initialData: students_res.data ?? [],
        },
      ]}
    >
      <div className="space-y-4 p-4">
        <AppPageHeader title="Students" description="Manage school students." />
        <StudentFilter auth={auth} />
        <DisplaySwitcher
          table={
            <SchoolStudentTable
              auth={auth}
              lang={lang}
              students={students_res.data ?? []}
              realtimeEnabled
            />
          }
          cards={
            <AllStudentsCards
              lang={lang}
              auth={auth}
              students={students_res.data ?? []}
            />
          }
        />
      </div>
    </RealtimeProvider>
  );
};
export default SchoolStaffStudentPage;
