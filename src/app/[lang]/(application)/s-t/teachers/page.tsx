import NotFoundPage from "@/components/page/not-found";
import StaffPeople from "@/components/page/school-staff/dashboard/staff-people";
import SchoolTeacherTable from "@/components/page/school-staff/table/teacher-table/table-teacher";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import { TeacherWithRelations } from "@/lib/schema/school/teacher-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
}

export const generateMetadata = async (): Promise<Metadata> => {
  const auth = await authContext();
  return {
    title: auth?.school?.name
      ? `Teachers in ${auth?.school?.name}`
      : "School not found",
    description: auth?.school?.name
      ? `Teachers in ${auth?.school?.name}`
      : "school not found",
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
      `/school/teachers/with-details?limit=10`,
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
        <h2 className="title-page">Teachers</h2>
        <div className="flex space-x-4">
          <StaffPeople
            icon="/icons/teacher.png"
            link=""
            total={762}
            title="Teacher"
            Ftotal={60}
            Mtotal={37}
            role="Total Teacher"
          />
          <StaffPeople
            icon="/icons/primary.png"
            link=""
            total={345}
            title="Primary"
            Ftotal={100}
            Mtotal={233}
            role="Total Primary Teacher"
          />
          <StaffPeople
            icon="/icons/OLevel.png"
            link=""
            total={345}
            title="Ordinary_level"
            Ftotal={100}
            Mtotal={233}
            role="Total Ordinary_level Teacher"
          />
        </div>
        <div>
          <SchoolTeacherTable
            auth={auth}
            lang={lang}
            teachers={teachers.data ?? []}
            realtimeEnabled
          />
        </div>
      </div>
    </RealtimeProvider>
  );
};
export default SchoolStaffTeacherPage;
