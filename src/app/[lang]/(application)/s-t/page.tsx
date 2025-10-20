import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import NotFoundPage from "@/components/page/not-found";
import JoinSchoolDialog from "@/components/page/school-staff/dialog/join-school-dialog";
import { Locale } from "@/i18n";
import { School } from "@/lib/schema/school/school-schema";
import { Student } from "@/lib/schema/school/student-schema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
}

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

const SchoolStaffPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const auth = await authContext();

  if (!auth) {
    redirect(`/${lang}/auth/login`);
  }

  if (!auth.school) {
    return (
      <div className="grid h-full w-full place-content-center space-y-4 px-4 py-2">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex h-full w-full flex-row-reverse items-center justify-center gap-2">
            <MyLink
              loading
              href={`/${lang}/s-t/new`}
              button={{ library: "daisy", variant: "info" }}
              type="button"
            >
              <MyImage src="/icons/memo.png" role="ICON" />
              Register your school
            </MyLink>
            <JoinSchoolDialog />
          </div>
        </div>
        {/* {getSchoolJoinRequest.data && (
          <JoinSchoolRequestBody
            lang={lang}
            currentUser={currentUser.user}
            requests={getSchoolJoinRequest.data}
          />
        )} */}
      </div>
    );
  }

  // page which shown base on user
  if (auth.school) {
    const [school, classes, students, teachers] = await Promise.all([
      apiRequest<void, School>("get", `/school/${auth.school.id}`, undefined, {
        token: auth.token,
      }),
      apiRequest<void, School>(
        "get",
        `/school/teachers/with-details`,
        undefined,
        { token: auth.token, schoolToken: auth.schoolToken },
      ),
      apiRequest<void, Student>(
        "get",
        `/school/students/with-details`,
        undefined,
        { token: auth.token, schoolToken: auth.schoolToken },
      ),
      apiRequest<void, Student>(
        "get",
        `/school/students/with-details`,
        undefined,
        { token: auth.token, schoolToken: auth.schoolToken },
      ),
    ]);
    if (!school.data) return <NotFoundPage />;
    return (
      <div className="w-full space-y-4 p-4">
        {/* <SchoolHeader auth={auth} school={school.data} onThePage lang={lang} /> */}
        {/* <StaffDashboardDetails
          schoolStaffs={school.data.SchoolStaff}
          teachers={school.data.Teacher}
          students={school.data.Student}
          lang={lang}
        />
        <div className="flex w-full space-x-4">
          <SchoolEducationChart />
          <SchoolStudentAndClassChart classes={classes.data || []} />
        </div>
        <div className="flex w-full space-x-4">
          <JoinSchoolTableWrapper currentSchool={currentSchool} lang={lang} />
          <ClassActivitiesTable lang={lang} />
        </div>
        <div className="flex w-full space-x-4">
          <StudentDashboardTable students={students.data || []} lang={lang} />
          <TeachersDashboardTable teachers={teachers.data || []} lang={lang} />
        </div> */}
      </div>
    );
  }
};

export default SchoolStaffPage;
