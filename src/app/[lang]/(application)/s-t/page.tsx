import SchoolEducationChart from "@/components/charts/school-education-chart";
import SchoolStudentAndClassChart from "@/components/charts/school-student-and-classes-chart";
import JoinSchoolDialog from "@/components/page/school-staff/dialog/join-school-dialog";
import MyImage from "@/components/myComponents/myImage";
import MyLink from "@/components/myComponents/myLink";
import JoinSchoolRequestBody from "@/components/page/application/join-school-request/join-school-request-body";
import NotFoundPage from "@/components/page/not-found";
import StaffDashboardDetails from "@/components/page/school-staff/dashboard/staff-dashboard-details";
import SchoolHeader from "@/components/page/school/school-header";
import { Locale } from "@/i18n";
import { getAuthUserServer, getSchoolServer } from "@/lib/utils/auth";
import { GetAllJoinSchoolRequestByCurrentUserEmail } from "@/service/school/school-join-request.service";
import { getSchoolByIdService } from "@/service/school/school.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ClassActivitiesTable from "@/components/page/school-staff/dashboard/table/classes-activities-table";
import StudentDashboardTable from "@/components/page/school-staff/dashboard/table/student-dashboard-table";
import TeachersDashboardTable from "@/components/page/school-staff/dashboard/table/teacher-dashboard-table";
import { getClassesBySchoolIdViewData } from "@/service/class/class.service";
import { getAllStudentBySchoolId } from "@/service/school/student-service";
import JoinSchoolTableWrapper from "@/components/page/school-staff/dashboard/table/join-school-table/join-school-table-wrapper";
import { getAllTeacherBySchoolId } from "@/service/school/teacher-service";

interface props {
  params: Promise<{ lang: Locale }>;
}

export const generateMetadata = async (): Promise<Metadata> => {
  const school = await getSchoolServer();
  return {
    title: school?.schoolName || "School not found",
    description: school?.schoolDescription || "school description",
  };
};

const SchoolStaffPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const [currentUser, currentSchool] = await Promise.all([
    getAuthUserServer(),
    getSchoolServer(),
  ]);

  if (!currentUser) {
    redirect(`/${lang}/auth/login`);
  }

  // page which shown base on user
  if (currentSchool) {
    const [school, classes, students, teachers] = await Promise.all([
      getSchoolByIdService(currentSchool.schoolId),
      getClassesBySchoolIdViewData(currentSchool.schoolId),
      getAllStudentBySchoolId(currentSchool.schoolId),
      getAllTeacherBySchoolId(currentSchool.schoolId)
    ]);
    if (!school.data) return <NotFoundPage />;
    return (
      <div className=" p-4 space-y-4 w-full">
        <SchoolHeader
          currentUser={currentUser}
          currentSchool={currentSchool}
          school={school.data}
          onThePage
          lang={lang}
        />
        <StaffDashboardDetails
          schoolStaffs={school.data.SchoolStaff}
          teachers={school.data.Teacher}
          students={school.data.Student}
          lang={lang}
        />
        {/* school basic info */}
        <div className=" flex space-x-4 w-full">
          <SchoolEducationChart />
          <SchoolStudentAndClassChart classes={classes.data || []} />
        </div>
        <div className=" flex space-x-4 w-full">
          <JoinSchoolTableWrapper currentSchool={currentSchool} lang={lang} />
          <ClassActivitiesTable lang={lang} />
        </div>
        <div className=" flex space-x-4 w-full">
          <StudentDashboardTable students={students.data || []} lang={lang} />
          <TeachersDashboardTable teachers={teachers.data || []} lang={lang} />
        </div>
      </div>
    );
  }

  const getSchoolJoinRequest = await GetAllJoinSchoolRequestByCurrentUserEmail(
    currentUser.email
  );
  return (
    <div className=" w-full px-4 py-2 space-y-4 grid place-content-center h-full">
      <div className=" flex flex-col justify-center items-center space-y-2">
        <div className=" flex justify-center items-center w-full h-full gap-2 flex-row-reverse">
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
      {getSchoolJoinRequest.data && (
        <JoinSchoolRequestBody
          lang={lang}
          currentUser={currentUser}
          requests={getSchoolJoinRequest.data}
        />
      )}
    </div>
  );
};

export default SchoolStaffPage;
