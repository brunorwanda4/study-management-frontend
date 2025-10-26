import ErrorPage from "@/components/page/error-page";
import JoinSchoolPage from "@/components/page/join-school-page";
import SchoolHomeBody from "@/components/page/school/school-home-body";
import type { Locale } from "@/i18n";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { School } from "@/lib/schema/school/school-schema";
import type { SchoolStaff } from "@/lib/schema/school/school-staff-schema";
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
      title: "User not found",
      description: "It user not login",
    };
  return {
    title: auth.school?.name || "School not found",
  };
};

interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolPage = async (props: props) => {
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
      apiRequest<void, SchoolStaff[]>(
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
      apiRequest<void, Student[]>(
        "get",
        "/school/students?limit=5",
        undefined,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
        },
      ),
    ]);

  if (
    !schoolRes.data ||
    !school_staff_res.data ||
    !teachers_res.data ||
    !students_res.data
  ) {
    return (
      <ErrorPage
        message={
          schoolRes.message ||
          school_staff_res.message ||
          teachers_res.message ||
          students_res.message
        }
        error={
          schoolRes.error ||
          school_staff_res.error ||
          teachers_res.error ||
          students_res.error
        }
      />
    );
  }

  return (
    <RealtimeProvider<School | Student | Teacher | SchoolStaff>
      channels={[
        { name: "school", initialData: [schoolRes.data] },
        { name: "student", initialData: students_res.data },
        { name: "teacher", initialData: teachers_res.data },
        { name: "school_staff", initialData: school_staff_res.data },
      ]}
    >
      <div className="space-y-4 px-4">
        <SchoolHomeBody
          students={students_res.data}
          teachers={teachers_res.data}
          school_staffs={school_staff_res.data}
          auth={auth}
          school={schoolRes.data}
          lang={lang}
        />
      </div>
    </RealtimeProvider>
  );
};

export default SchoolPage;
