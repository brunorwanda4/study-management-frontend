import JoinSchoolPage from "@/components/page/join-school-page";
import NotFoundPage from "@/components/page/not-found";
import SchoolStaff from "@/components/page/school/school-staff";
import SchoolStudents from "@/components/page/school/school-student";
import SchoolTeachers from "@/components/page/school/school-teachers";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import { PaginatedStudents } from "@/lib/schema/relations-schema";
import type { School } from "@/lib/schema/school/school-schema";
import type { SchoolStaff as SchoolStaffModel } from "@/lib/schema/school/school-staff-schema";
import type { Student } from "@/lib/schema/school/student-schema";
import type { Teacher } from "@/lib/schema/school/teacher-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  const auth = await authContext();
  if (!auth?.school)
    return {
      title: "School not found",
      description: "It school not login",
    };
  return {
    title: `Member of ${auth.school?.name}` || "School not found",
  };
};

interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolPeoplePage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }
  if (!auth.school) return <JoinSchoolPage />;

  const [schoolRes, school_staff_res, teachers_res, students_res] =
    await Promise.all([
      apiRequest<void, School>("get", `/schools/${auth.school.id}`, undefined, {
        token: auth.token,
        schoolToken: auth.schoolToken,
      }),
      apiRequest<void, SchoolStaffModel[]>(
        "get",
        "/school/staff?limit=5",
        undefined,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
        },
      ),
      apiRequest<void, Teacher[]>(
        "get",
        "/school/teachers?limit=5",
        undefined,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
        },
      ),
      apiRequest<void, PaginatedStudents>(
        "get",
        "/school/students?limit=5",
        undefined,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
        },
      ),
    ]);

  if (!schoolRes.data) {
    return <NotFoundPage />;
  }

  return (
    <RealtimeProvider<School | Student | Teacher | SchoolStaffModel>
      channels={[
        { name: "school", initialData: [schoolRes.data] },
        {
          name: "student",
          initialData: students_res.data?.students ?? [],
        },
        {
          name: "teacher",
          initialData: teachers_res.data ? teachers_res.data : [],
        },
        {
          name: "school_staff",
          initialData: school_staff_res.data ? school_staff_res.data : [],
        },
      ]}
    >
      <div className="flex min-h-screen space-x-4 px-4">
        <div className="w-1/2 space-y-4">
          <SchoolStaff schoolStaff={school_staff_res.data ?? []} lang={lang} />
          <SchoolStudents
            auth={auth}
            students={students_res.data?.students ?? []}
            onThePage
            lang={lang}
          />
        </div>
        <div className="w-1/2 space-y-4">
          <SchoolTeachers
            teachers={teachers_res.data ?? []}
            auth={auth}
            onThePage
            lang={lang}
          />
        </div>
        <div className="h-screen"></div>
      </div>
    </RealtimeProvider>
  );
};

export default SchoolPeoplePage;
