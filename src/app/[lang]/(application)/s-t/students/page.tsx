import NotFoundPage from "@/components/page/not-found";
import StaffPeople from "@/components/page/school-staff/dashboard/staff-people";
import SchoolStudentTable from "@/components/page/school-staff/table/student-table/table-student-list";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import { Class } from "@/lib/schema/class/class-schema";
import { StudentWithRelations } from "@/lib/schema/school/student-schema";
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
      ? `Students in ${auth?.school?.name}`
      : "School not found",
    description: auth?.school?.name
      ? `Students in ${auth?.school?.name}`
      : "school not found",
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

  const [
    students_res,
    classes_res,
    count_students,
    count_students_female,
    count_students_male,
  ] = await Promise.all([
    apiRequest<void, StudentWithRelations[]>(
      "get",
      "/school/students/with-details?limit=10",
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "student",
      },
    ),
    apiRequest<void, Class[]>("get", "/school/classes", undefined, {
      token: auth.token,
      schoolToken: auth.schoolToken,
      realtime: "class",
    }),
    apiRequest<void, { count: number }>(
      "get",
      "/school/students/stats/count",
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "student",
      },
    ),
    apiRequest<void, { count: number }>(
      "get",
      "/school/students/stats/count?gender=FEMALE",
      undefined,
      {
        token: auth.token,
        schoolToken: auth.schoolToken,
        realtime: "student",
      },
    ),
    apiRequest<void, { count: number }>(
      "get",
      "/school/students/stats/count?gender=MALE",
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
        {
          name: "class",
          initialData: classes_res.data ?? [],
        },
      ]}
    >
      <div className="space-y-4 p-4">
        <h2 className="title-page">Students</h2>
        <div className="flex space-x-4">
          <StaffPeople
            icon="/icons/student.png"
            link={`/${lang}/s-t/students`}
            total={count_students.data?.count ?? 0}
            title="Students"
            Ftotal={count_students_female.data?.count ?? 0}
            Mtotal={count_students_male.data?.count ?? 0}
            role="Total students"
          />
          <StaffPeople
            icon="/icons/primary.png"
            link={`/${lang}/s-t/students?educationLevel=primary`} // TODO add search params for get student in primary in this school
            total={345}
            title="Primary"
            Ftotal={100}
            Mtotal={233}
            role="Total Primary Students"
          />
          <StaffPeople
            icon="/icons/OLevel.png"
            link={`/${lang}/s-t/students?educationLevel=OLevel`}
            total={345}
            title="Ordinary_level"
            Ftotal={100}
            Mtotal={233}
            role="Total Ordinary_level Students"
          />
        </div>
        <div>
          <SchoolStudentTable
            auth={auth}
            classes={classes_res.data || []}
            lang={lang}
            students={students_res.data ?? []}
            realtimeEnabled
          />
        </div>
      </div>
    </RealtimeProvider>
  );
};
export default SchoolStaffStudentPage;
